////////////////////////////////////////
// 出力クラス
////////////////////////////////////////

var clsOutput = function(outputType, startRow, tlType, userName) {
  this.outputType = outputType;
  this.startRow = startRow;
  this.tlType = tlType
  this.userName = userName;
}


// シートにタイムラインを出力
clsOutput.prototype.outputTimeline = function(sheet, vals) {
  var oVals  = [];
  var valLen = vals.length;
  var type   = "";
  
  for(var i=0; i < valLen; i++) {
    var text   = vals[i]["event"];
    var val = [];
    
    if (vals[i]["type"] == AC_CONBATSTART) {
      type = "戦闘開始";
    } else if(vals[i]["type"] == AC_DIALOG) {
      type = "セリフ";
      text = vals[i]["event"];
    } else if(vals[i]["type"] == AC_MARKER) {
      type = "マーカー";
      text = "";
    } else if(vals[i]["type"] == AC_EFFECT) {
      type = "効果";
      text = vals[i]["event"].replace(/^effect\s/g, "");
    } else if(vals[i]["type"] == AC_LOSE_EFFECT) {
      type = "効果切れ";
      text = vals[i]["event"];
    }  else if(vals[i]["type"] == AC_AOE) {
      type = "AOE";
    } else if(vals[i]["type"] == AC_START_USING) {
      type = "詠唱開始";
    } else if(vals[i]["type"] == AC_ACTION) {
      type = "実行";
    } else if(vals[i]["type"] == AC_COMBATEND) {
      type = "戦闘終了";
    } else if(vals[i]["type"] == AC_FAILED) {
      type = "討伐中断";
    }  else if(vals[i]["type"] == AC_WAIT) {
      type = "";
    }
    
    val.push(vals[i]["time"]); 
    if (this.tlType == OUTPUT_SKILL) {
      val.push(vals[i]["whom"]); 
    } else {
      val.push(vals[i]["who"]); 
    }
    val.push(type); 
    val.push(text); 
    if(this.outputType == OUTPUT_LOG) val.push(vals[i]["log"]);
    
    oVals.push(val);
  }

  // シートに書き込み
  var cntTlCol = CNT_TIMELINE_COL;
  if(this.outputType == OUTPUT_LOG) cntTlCol = cntTlCol + 1;  
  sheet.getRange(this.startRow,1, valLen, cntTlCol).setValues(oVals);
}


// 除外対象のレコードか
clsOutput.prototype.booContinue = function(oValues, val) {
  var oCount = oValues.length;
  
  // logはかぶりも全部出力
  if (this.outputType == OUTPUT_LOG) return false;
  
  // 開始と終了は出力
  if (val["type"] == AC_CONBATSTART ||
      val["type"] == AC_COMBATEND ||
      val["type"] == AC_FAILED
     ) {
    return false;
  }

  // スキル回しの場合は効果系はスキップ
  if(this.tlType == OUTPUT_SKILL && 
     (val["type"] == AC_EFFECT || val["type"] == AC_LOSE_EFFECT)) {
    return true;
  } 

  // 自分以外のスキルはスキップ
  if (this.tlType == OUTPUT_SKILL && val["who"] != this.userName) return　true;
  
  // スキル被りはスキップ
  if (oCount > 0) {
    for (var i = oCount - 1; i >= 0; i--) {
      if (oValues[i]["time"] != val["time"]) break;
      if (oValues[i]["time"] == val["time"] 
          && oValues[i]["type"] == val["type"] 
          && oValues[i]["who"] == val["who"] 
          && oValues[i]["event"] == val["event"]) {
        return true;
      }
    }
  }

  return false;
}


// タイムラインにバフを出力
clsOutput.prototype.outputallbuff = function(sheet, startRow, vals, jobs) {
  var lastRow = sheet.getLastRow();
  var col = this.outputBuffCol(vals, jobs);
  var secTime = time2Sec(vals["time"]);
  
  if (col == null) return startRow;
  
  for(var i = startRow; i <= lastRow; i++){
    var bTime = time2Sec(formatDate(sheet.getRange(i, 1).getValue()));
    var aTime = time2Sec(formatDate(sheet.getRange(i + 1, 1).getValue()));
    
    // 現在の列と次の列の間にtimeが存在すれば出力
    if (bTime <= secTime && aTime >= secTime) {
      var row = i;
      
      if (bTime == secTime) {
        row = i;
        
      } else if(aTime == secTime) {
        row = i + 1;
        
      } else {
        // timeが近い方に設定
        var bDiff = secTime - bTime;
        var aDiff = aTime　 - secTime;
        
        if (this.outputType != OUTPUT_ALLBUFF && bDiff >= OVERSEC && aDiff >= OVERSEC) {
          // 指定秒以上差がある場合は行を追加
          insertRow(sheet, i, vals["time"]);
          row = i + 1;
          
        } else if (bDiff > aDiff){
          row = i + 1;
          
        }
        
      }
      
      // エクセルに出力
      if(vals["type"] == AC_LOSE_EFFECT || vals["event"] == "ステラデトネーション"　|| vals["event"] == "ステラバースト") {
        // バフが消失
        this.outputLoseEffect(sheet, row, col);
        
      } else if(vals["type"] == AC_REFRESH) {
        // バフを上書き
        sheet.getRange(row, col).setValue(1);
        this.outputPadCell(sheet, row, col);
        
      } else {
        var who  = vals["who"].replace(/\s.*$/, "");
        var whom = vals["whom"].replace(/\s.*$/, "");
        var cValue = null;
  

        if (booName2Cell(vals["event"])) {
          // targetを出力
          cValue = whom;
          if (jobs[vals["whom"]] != undefined) cValue = jobs[vals["whom"]];
          
        } else if (this.outputType == OUTPUT_RAIDBUFF && LB_OutputBuffCol(vals["event"], vals["type"]) > 0) {
          // LB系
          cValue = vals["event"];
        
        } else if (this.outputType == OUTPUT_BRDBUFF && BRD_SongValue(vals["event"]) != null) {
          // 詩人歌
          cValue = BRD_SongValue(vals["event"]);
          this.outputPadCell(sheet, row, col);
          
        } else if (vals["event"].match(/^トルバドゥール/)) {
          // トルバ系
          cValue = BRD_SongValue(vals["event"]);
          
        }  else if (this.outputType == OUTPUT_SMNBUFF && SMN_FlowValue(vals["event"]) != null) {
          // 召喚、フロー消化
          cValue = SMN_FlowValue(vals["event"]);
          
        } else {
          cValue = 1;
        }

        if (cValue != null) sheet.getRange(row, col).setValue(cValue);
      }
      
      // 現在のrowの2つ上のrowを返す(何故かlogが順番が前後しているパターンが稀にあるため)
      if(row <= startRow + 1) {
        return startRow;
      } else {
        return row - 2;
      }
    }
  }
}


// Lose Effectを出力
clsOutput.prototype.outputLoseEffect = function(sheet, row, col) {  
  var data = sheet.getRange(row, col).getValue();
  if(data > 0 || data != "") return;  

  sheet.getRange(row, col).setValue(0);
  this.outputPadCell(sheet, row, col);
}


// 上に向かって1以上が出るまでセルを埋める
clsOutput.prototype.outputPadCell = function(sheet, lastRow, col) {
  var value = null;
  var rowLen = lastRow - this.startRow;
  if (rowLen <= 0) return;
    
  var cells = sheet.getRange(this.startRow, col, rowLen, 1).getValues();
  var cntCell = cells.length;
  var cntRows = 0;
  
  for(var i = cntCell - 1; i >= 0; i--){
    var data = cells[i][0];
    
    // 0が出たときは無効
    if (typeof data == "number" && data == 0) {
      cntRows = 0;
      break;
    }
    
    if((typeof data == "number" && data > 0) || (typeof data == "string" && data != "")) {
      value = data;
      break; 
    }
    
    cntRows = cntRows + 1;
  }
  
  if (cntRows == 0) return;
  if (value == null) value = 1;
  
  sheet.getRange(lastRow - cntRows, col, cntRows, 1).setValue(value);
}


// 出力するバフの横軸の値を返す
clsOutput.prototype.outputBuffCol = function(val, jobs) {
  var col     = null;
  var baseCol = CNT_TIMELINE_COL;
  var who     = val["who"];
  var type    = val["type"];
  var event   = val["event"];
  var whom    = val["whom"];
      
  // シナジー系
  if (this.outputType != OUTPUT_ALLBUFF) {
    var raidCol = RAIDBUFF_OutputBuffCol(who, whom, type, event, this.userName);
    if(raidCol != null) col = raidCol;
    
    // LB
    if (this.outputType == OUTPUT_RAIDBUFF) {
      var lbCol = LB_OutputBuffCol(event, type);
      if(lbCol > 0) col = 16;
    }
    
    // ジョブ別
    var objJobBuff = new Job_OutputBuff(this.outputType, who, whom, type, event, this.userName);
    var jobCol = objJobBuff.getCol();
    if(jobCol != null) col = jobCol;
  
  } else {
    // ヒール系
    var objHealBuff = new Heal_OutputBuff(this.outputType, who, whom, type, event, this.userName, jobs);
    var healCol = objHealBuff.getCol();
    if(healCol != null) col = healCol;
  
  }
   
  
  
  return col;
}
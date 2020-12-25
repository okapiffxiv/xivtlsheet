////////////////////////////////////////
// 出力クラス
////////////////////////////////////////

var clsOutput = function(outputType, startRow, tlType, userName) {
  this.outputType = outputType;
  this.lines = [];
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
    } else if(vals[i]["type"] == AC_MARKER) {
      type = "マーカー";
      text = "";
    } else if(vals[i]["type"] == AC_EFFECT) {
      type = "効果";
      text = vals[i]["event"].replace(/^effect\s/g, "");
    } else if(vals[i]["type"] == AC_LOSE_EFFECT) {
      type = "効果切れ";
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
    } else if(vals[i]["type"] == AC_POP) {
      type = "POP";
      
    }
    
    // AOEとマーカーと効果は被り数も表示
    if ((vals[i]["type"] == AC_AOE || vals[i]["type"] == AC_MARKER || vals[i]["type"] == AC_EFFECT)
        && vals[i]["count"] > 1) {
      text += " x" + vals[i]["count"];
    }

    val.push(vals[i]["time"]); 
    if (this.tlType == OUTPUT_SKILL) {
      val.push(vals[i]["whom"]); 
    } else {
      val.push(vals[i]["who"]); 
    }
    val.push(type); 
    val.push(text); 

    if(this.outputType == OUTPUT_LOG) {
      val.push(vals[i]["log"]);      
      val.push(MatchText(vals[i]["log"]));
    }

    oVals.push(val);
  }

  this.lines = oVals;
}


// 除外対象のレコードか
clsOutput.prototype.booContinue = function(val) {  
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
    
  return false;
}


// スキル被り
clsOutput.prototype.duplicateIdx = function(oValues, val) {
  // logはかぶりも全部出力
  if (this.outputType == OUTPUT_LOG) return false;

  var oCount = oValues.length;
  if (oCount > 0) {
    for (var i = oCount - 1; i >= 0; i--) {
      if (oValues[i]["time"] != val["time"]) break;
      if (oValues[i]["time"] == val["time"] 
          && oValues[i]["type"] == val["type"] 
          && oValues[i]["who"] == val["who"] 
          && oValues[i]["event"] == val["event"]) {
        return i;
      }
    }
  }

  return false;
}


// タイムラインにバフを出力
clsOutput.prototype.setAllbuff = function(sheet, vals, jobs)
{
  var maxCol = 0;
  
  for (var i=0; i<vals.length; i++) {
    var val = vals[i];
    var col = this.outputBuffCol(val, jobs);
    var secTime = time2Sec(val["time"]);
    var row = 0;
    
    // タイムラインをループ    
    for (var li=1; li<this.lines.length - 1; li++) {
      var line = this.lines[li];
      var afterLine = this.lines[li + 1];      
      var beforeTime = time2Sec(line[0]);
      var afterTime = time2Sec(afterLine[0]);

      // 現在の列と次の列の間にtimeがあれば出力
      if (beforeTime > secTime || afterTime < secTime) continue;

      // 何列目に出力するか？
      if (beforeTime <= secTime && afterTime >= secTime) {
        row = li;
      } else if (afterTime == secTime) {
        row = li + 1;
      } else {
        // timeが近い方に設定
        var beforeDiffTime = secTime - beforeTime;
        var afterDiffTime = afterTime - secTime;
        
        // 指定秒以上差がある場合は行を追加
        if (this.outputType != OUTPUT_ALLBUFF && beforeDiffTime >= OVERSEC && afterDiffTime >= OVERSEC) {
          row = li + 1;
          this.lines.slice(row, 0, line);
          this.lines[row][0] = val["time"];
        } else {
          if (beforeDiffTime > afterDiffTime) {
            row = li + 1;
          } else {
            row = li;
          }
        }
      }
      
      break;
    }

    // this.linesに設定
    if (row == 0) continue;
    if (col > maxCol) maxCol = col;
    while(this.lines[row].length < maxCol) this.lines[row].push(null);

    if(val["type"] == AC_LOSE_EFFECT || val["event"] == "ステラデトネーション"　|| val["event"] == "ステラバースト") {
      // バフが消失
      this.outputLoseEffect(row, col - 1);
    } else if(val["type"] == AC_REFRESH) {
        // バフを上書き
      this.lines[row][col - 1] = 1;
      this.outputPadCell(row, col - 1);
    } else {
      var who  = val["who"].replace(/\s.*$/, "");
      var whom = val["whom"].replace(/\s.*$/, "");
      var cValue = 1;

      if (booName2Cell(val["event"])) {
        // targetを出力
        cValue = whom;
        if (jobs[val["whom"]] != undefined) cValue = jobs[val["whom"]];
        
      } else if (this.outputType == OUTPUT_RAIDBUFF && LB_OutputBuffCol(val["event"], val["type"]) > 0) {
        // LB系
        cValue = val["event"];
        
      }  else if (this.outputType == OUTPUT_SMNBUFF) {
        // 召喚
        if (SMN_EnagyValue(val["event"]) != null) {
          cValue = SMN_EnagyValue(val["event"]);
          
        } else if (SMN_FlowValue(val["event"]) != null) {
          cValue = SMN_FlowValue(val["event"]);
          
        }
      }
      
      if (cValue != null) this.lines[row][col - 1] = cValue;
    }
  }

  for (var i=0; i < this.lines.length; i++) {
    while(this.lines[i].length < maxCol) this.lines[i].push(null);
  }

  // シートに書き込み
  sheet.getRange(this.startRow,1, this.lines.length, maxCol).setValues(this.lines);
}


// Lose Effectを出力
clsOutput.prototype.outputLoseEffect = function(row, col) {
  var data = this.lines[row][col];
  if(data != null) return;

  this.lines[row][col] = 0;
  this.outputPadCell(row, col);
}


// 上に向かって1以上が出るまでセルを埋める
clsOutput.prototype.outputPadCell = function(lastRow, col) {
  if (lastRow <= 0) return;

  var value = 1;
  var startRow = 0;

  // セル埋めスタート位置
  for(var i=lastRow - 1; i > 0; i--) {
    var data = this.lines[i][col];
    // 0が出たときは無効
    if (data == 0) return;
    
    // 埋める値を取得
    if((typeof data == "number" && data > 0) || (typeof data == "string" && data != "")) {
      value = data;
      break; 
    }
  }
  
  for(var row=i; row<lastRow; row++) {
    while(this.lines[row].length < col + 1) this.lines[row].push(null);
    this.lines[row][col] = value;
  }
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
    if(raidCol != null) return raidCol;
    
    // LB
    if (this.outputType == OUTPUT_RAIDBUFF) {
      var lbCol = LB_OutputBuffCol(event, type);
      if(lbCol > 0) return 18;
    }
    
    // ジョブ別
    var objJobBuff = new Job_OutputBuff(this.outputType, who, whom, type, event, this.userName);
    var jobCol = objJobBuff.getCol();
    if(jobCol != null) return jobCol;
  
  } else {
    // ヒール系
    var objHealBuff = new Heal_OutputBuff(this.outputType, who, whom, type, event, this.userName, jobs);
    var healCol = objHealBuff.getCol();
    if(healCol != null) return healCol;
  
  }
  
  return col;
}
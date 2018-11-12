//////////////////////////////////////////
//// FriendのCastCSVからシナジーバフを抽出
//// Friendries > Casts > CSV
//////////////////////////////////////////
//Convert2Friends = function() {
//  this.clsOutput = new clsOutput(OUTPUT_ALLBUFF);
//  
//  // シートの存在チェック
//  if(!booSheet(SHEET_TIMELINE) || !booSheet(SHEET_IMPORT)) {
//    Browser.msgBox(ERR_NO_TEMP);
//    return;
//  }
//  
//  this.data2FriendsCast();
//  
//  return true;
//}
//
//// 味方側攻撃を分析
//Convert2Friends.prototype.data2FriendsCast = function() {
//  var iSheet = 'friendries';
//  var objSheet = SpreadsheetApp.getActive().getSheetByName(iSheet);
//  var iValues = objSheet.getDataRange().getValues();
//  var iLastRow = objSheet.getLastRow();
//  
//  var oValues=[];
//  for(var rowNum=1;rowNum<iLastRow;rowNum++) {
//    // FFLogsのデータをパース
//    var time  = new Date(iValues[rowNum][0]);
//    time = formatDate(time, timezone, 'HH:mm:ss.SSS');
//    var data  = this.clsOutput.parseCSV(iValues[rowNum][1]);
//    
//    if (data["type"] == "Unknown" || data["time"] == "Time") continue;
//    var val = {"time": time, "type": data["type"], "event": data["event"], "whom":data["whom"]};
//    oValues.push(val);
//  }
//
//  // シートに書き込み
//  objSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_TIMELINE);
//  var oLastRow = oValues.length;
//  var startRow = 2;
//  for(var rowNum=0;rowNum<oLastRow;rowNum++) {    
//    startRow = this.outputTimeline(objSheet, oValues[rowNum], startRow);
//  }
//}
//
//
//Convert2Friends.prototype.outputTimeline = function(sheet, vals, startRow) {
//  var col = this.outputBuffCol(vals);
//  if (col == null) return startRow;
//
//  var text = vals["event"];
//  var lastRow = sheet.getLastRow();
//  
//  for(var i = startRow; i <= sheet.getLastRow(); i++){
//    var bTime = formatDate(sheet.getRange(i, 1).getValue(), timezone, 'HH:mm:ss.SSS');
//    var aTime = formatDate(sheet.getRange(i + 1, 1).getValue(), timezone, 'HH:mm:ss.SSS');
//
//    if (bTime <= vals["time"] && aTime >= vals["time"]) {
//      var bDiff = vals["time"] - bTime;
//      var aDiff = aTime - vals["time"];
//      var row;
//      
//      // timeが近い方に設定
//      if (bDiff <= aDiff){
//        row = i;
//      } else {
//        row = i + 1;
//      }
//      
//      if(vals["event"] == "かばう" || vals["event"] == "インターベンション") {
//        sheet.getRange(row, col).setValue(vals["whom"]);
//      } else {
//        sheet.getRange(row, col).setValue(1);
//      }
//      
//      // 現在のROWの一つ上を返す
//      return row - 1;
//    }
//  }
//}
//
//Convert2Friends.prototype.outputBuffCol = function(vals) {
//  col = null;
//  if (vals["event"] == "だまし討ち") {
//    col = 5;
//  } else if(vals["event"] == "連環計") {
//    col = 6;
//    //      } else if(vals["type"] == "加護") {
//    //        sheet.getRange(row, 7).setValue(1);
//  } else if(vals["event"] == "魔人のレクイエム") {
//    col = 8;
//  } else if(vals["event"] == "バトルリタニー") {
//    col = 9;
//  } else if(vals["event"] == "バトルボイス") {
//    col = 10;
//  } else if(vals["event"] == "リフレッシュ") {
//    col = 11;
//  }
//  
//  // 単体バリア系
//  if(vals["event"] == "挑発") {
//    col = 13;
//  } else if(vals["event"] == "ランパート") {
//    col = 14;
//  } else if(vals["event"] == "ヴェンジェンス") {
//    col = 15;
//  } else if(vals["event"] == "ホルムギャング") {
//    col = 16;
//  } else if(vals["event"] == "センチネル") {
//    col = 17;
//  } else if(vals["event"] == "かばう") {
//    col = 18;
//  } else if(vals["event"] == "シェルトロン") {
//    col = 19;
//  } else if(vals["event"] == "インビンシブル") {
//    col = 20;
//  } else if(vals["event"] == "インターベンション") {
//    col = 21;
//  } else if(vals["event"] == "鼓舞") {
//    col = 22;
//  } else if(vals["event"] == "展開戦術") {
//    col = 23;
//  } else if(vals["event"] == "アポカタシス") {
//    col = 24;
//  }
//  
//  // 軽減系
//  if(vals["event"] == "牽制") {
//    col = 25;
//  } else if(vals["event"] == "パリセード") {
//    col = 26;
//  } else if(vals["event"] == "リプライザル") {
//    col = 27;
//  } else if(vals["event"] == "アドル") {
//    col = 28;
//  } else if(vals["event"] == "ウェポンブレイク") {
//    col = 29;
//  }
//  
//  // 全体バリア系
//  if(vals["event"] == "運命の輪") {
//    col = 30;
//  } else if(vals["event"] == "士気高揚の策") {
//    col = 31;
//  } else if(vals["event"] == "ディヴァインヴェール") {
//    col = 32;
//  } else if(vals["event"] == "シェイクオフ") {
//    col = 33;
//  }
//  
//  return col;
//}
//
//// イベントが被って切る場合はtrue
//Convert2Friends.prototype.booContinue = function(oValues, val) {
//  var oCount = oValues.length;
//  if (oCount > 0 ) {
//    if (oValues[oCount - 1]["time"] == val["time"] 
//      && oValues[oCount - 1]["type"] == val["type"]) {
//      return true;
//    }
//  }
//  
//  return false;
//}

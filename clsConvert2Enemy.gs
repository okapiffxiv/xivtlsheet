//////////////////////////////////////////
//// EnemyのCastCSVからタイムラインとバトルログを抽出
//// Enemies > Casts > CSV
//////////////////////////////////////////
//Convert2Enemy = function() {
//  this.clsOutput = new clsOutput(OUTPUT_TIMELINE);
//  
//  // シートの存在チェック
//  if(!booSheet(SHEET_TIMELINE)) {
//    Browser.msgBox(ERR_NO_TEMP);
//    return;
//  }
//
//  this.data2EnemyCast();
//  Browser.msgBox(ERR_OK); 
//}
//
//// 敵側攻撃を分析
//Convert2Enemy.prototype.data2EnemyCast = function() {
//  var iSheet = 'enemies';
//  var objSheet = SpreadsheetApp.getActive().getSheetByName(iSheet);
//  var iValues = objSheet.getDataRange().getValues();
//  var iLastRow = objSheet.getLastRow();
//  
//  var oValues=[];
//  oValues.push({"time":"00:00:00", "type": AC_CONBATSTART, "enemy": "", "event": "", "whom": ""});
//
//  for(var rowNum=1;rowNum<iLastRow;rowNum++) {
//    // FFLogsのデータをパース
//    var time  = new Date(iValues[rowNum][0]);
//    time = formatDate(time, timezone, 'HH:mm:ss.SSS');
//    var data  = this.parseLogs(iValues[rowNum][1]);
//    
//    // Unknownはスキップ
//    if (data["event"].match(/^Unknown/)) continue;
//    var val = {"time": time, "type": data["type"], "enemy": data["enemy"], "event": data["event"], "sync": data["sync"]};
//    
//    if (!this.booContinue(oValues, val)) oValues.push(val);
//  }
//
//  // シートに書き込み
//  objSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_TIMELINE);
//  var oLastRow = oValues.length;
//  for(var rowNum=0;rowNum<oLastRow;rowNum++) {    
//    this.outputTimeline(objSheet, rowNum + oStartRow, oValues[rowNum]);
//  }
//}
//
//
//Convert2Enemy.prototype.outputTimeline = function(sheet, row, vals) {
//  var text = vals["event"];
//  if (vals["type"] == AC_CONBATSTART) {
//    vals["type"] = "";
//    text = "戦闘開始";
//  } else if(vals["type"] == AC_DIALOG) {
//    vals["type"] = "セリフ";
//    text = vals["event"];
//  } else if(vals["type"] == AC_MARKER) {
//    vals["type"] = "マーカー";
//    text = "";
//  } else if(vals["type"] == AC_EFFECT) {
//    vals["type"] = "効果";
//    text = vals["event"].replace(/^effect\s/g, "");
//  } else if(vals["type"] == AC_START_USING) {
//    vals["type"] = "詠唱開始";
//  } else if(vals["type"] == AC_ACTION) {
//    vals["type"] = "実行";
//  } else if(vals["type"] == AC_COMBATEND) {
//    vals["type"] = "時間切れ";
//  }
//
//  // シートに書き込み
//  sheet.getRange(row, 1).setValue(vals["time"]);
//  sheet.getRange(row, 2).setValue(vals["enemy"]);
//  sheet.getRange(row, 3).setValue(vals["type"]);
//  sheet.getRange(row, 4).setValue(text);  
//}
//
////// ログをパース
//Convert2Enemy.prototype.parseLogs = function(data) {
//  var vals = {};
//  vals["enemy"] = data.replace(/^(.*)\s[0-9]*\s(begins casting|casts).*$/g, "$1");
//  vals["sync"] = "";
//  
//  if (data.match(/begins casting/)) {
//    vals["type"] = AC_START_USING;
//    vals["event"] = data.replace(/^.*casting  /g, "");
//  
//  } else if(data.match(/casts/)){
//    vals["type"] = AC_ACTION;
//    vals["event"] = data.replace(/^.*casts  /g, "");
//    
//  } else {
//    vals["event"] = "Unknown";
//  }
//
//  vals["event"] = vals["event"].replace(/ on .*$/g, "");
//  
//  return vals;
//}
//
//
//// イベントが被って切る場合はtrue
//Convert2Enemy.prototype.booContinue = function(oValues, val) {
//  var oCount = oValues.length;
//  if (oCount > 0 ) {
//    if (oValues[oCount - 1]["time"] == val["time"] 
//      && oValues[oCount - 1]["type"] == AC_EFFECT ) {
//      return true;
//    }
//
//    if (oValues[oCount - 1]["time"] == val["time"] 
//      && oValues[oCount - 1]["type"] == val["type"] 
//      && oValues[oCount - 1]["enemy"] == val["enemy"] 
//      && oValues[oCount - 1]["event"] == val["event"]) {
//      return true;
//    }
//  }
//  
//  return false;
//}

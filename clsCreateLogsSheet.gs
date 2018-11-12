// Logシート作り直し
var CreateLogsSheet = function() {
  // 現在のスプレッドシートの取得
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  var sheetName = SHEET_IMPORT;

  // 前のシートは削除
  var sheet = sheets.getSheetByName(sheetName);
  if (sheet != null) {
    sheet.clear();
  } else {
    // シート作成
    sheets.insertSheet(sheetName);
  }
  
  return true;
}
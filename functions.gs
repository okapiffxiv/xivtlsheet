////////////////////////////////////////
// 共通関数
////////////////////////////////////////

// outputtypeをみて出力先を判断
function getOutputTo(tmpName) {
  if(OUTPUT_TIMELINE == tmpName || OUTPUT_SKILL == tmpName || OUTPUT_LOG == tmpName) {
    return OUTPUTTO_TIMELINE;
  } else {
    return OUTPUTTO_BUFF;
  }
}

// タイムライン式のデータを返す
function　getTlValue(datas) {
  var data = {
    "time" : null, 
    "type" : null,
    "who": "", 
    "whom" : "",
    "event": "",
    "log"  : ""
  };
  
  for(var key in datas) {
    if (datas[key] != undefined) data[key] = datas[key];
  }

  return data;
}

// ジョブ別バフを返すのか
function booOutputTypeJob(outputType) {
  var obj = new Job_OutputBuff(outputType, "", "", "", "");
  return obj.getoutputTypeJob();
}

// エギかどうか
function booEgi(who) {
  if (typeof who != "string" || who == null || who == "") return false;
  return who.match(/(カーバンクル|タレット|エギ|フェアリー|デミ・バハムート)/);
}

// 敵かどうか
function booEnemy(who) {
  if (typeof who != "string" || who == null || who == "") return false;
  return !who.match(/\s/) && !booEgi(who) && !who.match(/アーサリースター/);
}

// オートアタックか
function booAA(event) {
  if(event == "攻撃" || event == "ショット" || event == "ウィルムウェーブ" || event == "光の癒し") return true;
  return false;
}

// 歌別のセル値を出力
function BRD_SongValue(event) {
  var value = null;
  
  if(event.match(new RegExp(BRD_Menuett))) {
    value = 1;
  } else if(event.match(new RegExp(BRD_Ballade))) {
    value = 2;
  } else if(event.match(new RegExp(BRD_Pion))) {
    value = 3;
  }
  
  return value;
}

// フローのセル値を出力
function SMN_FlowValue(event) {
  var value = null;
  
  if(event.match(/ミアズマバースト/)) {
    value = 1;
  } else if(event.match(/ペインフレア/)) {
    value = 2;
  } else if(event.match(/ベイン/)) {
    value = 3;
  } else if(event.match(/エナジードレイン/)) {
    value = 4;
  }
  
  return value;
}

// 秒に変換
function time2Sec(time, startTime) {
  time = time.split(".");
  time = time[0].split(":");
  
  if (startTime != null 　&& startTime > 82800 && time[0] == 0) {
    // 23:00 - 0:00 をまたがる場合は０時を２４時として計算
    time[0] = 24;
  }
  
  return (Number(time[0]) * 60 * 60) + (Number(time[1]) * 60) + Number(time[2]);
}


// 時間に変換
function sec2Time(time) {
  var minute = Math.floor(time/ 60);
  var second = time % 60;
  
  if(minute < 10) minute = "0" + minute;
  if(second < 10) second = "0" + second;
    
  return "00:" + minute + ":" + second;
}

// Date型をフォーマット
function formatDate(time) {
    return Utilities.formatDate(time, timezone, 'HH:mm:ss.SSS');
}


// シート検索
function booSheet(sheetName) {
  var sheets = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sheets.getSheetByName(sheetName);
  if (sheet == null) {
    return false;
  }
  return true;
}


// ユーザ名取得
function getUserName() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_SETTING);
  var userName = sheet.getRange(COL_USER_NAME).getValue();
  
  return userName
}


// セルに名前をセットするか
function booName2Cell(event) {
  if (event == "インターベンション" || 
      event == "かばう" || 
      event == "ブラックナイト" || 
      event == "アポカタスタシス"|| 
      event == "ベネディクション"|| 
      event == "テトラグラマトン"|| 
      event == "ディヴァインベニゾン"|| 
      event == "生命活性法"||
      event == "ディグニティ"||
      event == "フェイユニオン［被］"||
      event == "深謀遠慮の策") {
  
    return true;
  }
  
  return false;
}


// 無視するデバフ
function booSkipDebuff(event) {
  if(event == "衰弱" || event == "衰弱［強］") return true;
  return false;
}

// 出力するタイムラインタイプはスキル回しか
function booOutputTlSkill() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_SETTING);
  var val = sheet.getRange(COL_OUTPUT_SKILL).getValue();
  
  if(val == 1) {
    return true;
  } else {
    return false;
  }
}

// 行を削除
function deleteRows(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if(sheet == null) return;
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  
  if (lastRow > 1) {
    sheet.deleteRows(oStartRow + 1, lastRow - oStartRow);
    sheet.getRange(oStartRow, 1, 1, lastCol).clearContent();
  }
}

// バフ欄をクリア
function clearBuffs(sheetName) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheetName);
  if(sheet == null) return;
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  var startCol = CNT_TIMELINE_COL + 1;
  
  if (lastRow <= oStartRow) return;
  sheet.getRange(oStartRow, startCol, lastRow - oStartRow, lastCol - startCol).clearContent();
}

// タイムラインか
function booTL(outputType) {
  if(outputType == OUTPUT_TIMELINE || outputType == OUTPUT_LOG ) {
    return true;
  }
  
  return false;
}

// 出力先はタイムライン欄か
function booOutputToTL(outputType) {
  if(booTL(outputType) || outputType == OUTPUT_SKILL) {
    return true;
  }
  
  return false;
}

// 行を追加
function insertRow(sheet, row, time) {
  var lastCol = sheet.getLastColumn();
  var startCol = CNT_TIMELINE_COL + 1;
  sheet.insertRowAfter(row);
  row = row + 1;
  sheet.getRange(row, 1).setValue(time);
  
  for(var i = startCol; i <= lastCol; i++) {
    var bbVal = sheet.getRange(row - 2, i).getValue();
    var bVal  = sheet.getRange(row - 1, i).getValue();
    var aVal  = sheet.getRange(row + 1, i).getValue();
    
    if(bVal >= 1 && (aVal != "" || bbVal >= 1)) sheet.getRange(row, i).setValue(bVal);
  }
}


// テンプレートシートをコピー
function copyTempSheets_ (sheetName, toName) {
  // ID からスプレッドシートを取得
  var bookFrom   = SpreadsheetApp.openById(TMP_SHEET_ID);
  var fromSheets = bookFrom.getSheets();
  var bookTo     = SpreadsheetApp.getActiveSpreadsheet();
  var toSheets   = bookTo.getSheets();
  var logSheet　　　　　　= bookTo.getSheetByName(SHEET_IMPORT);
  
  if (toName == undefined) toName = SHEET_TIMELINE;
  
  // bookに１枚もシートがないとエラーになるためlogsシートの確認
  if (!booSheet(SHEET_IMPORT)) logSheet　= bookTo.insertSheet(SHEET_IMPORT);
  bookTo.setActiveSheet(logSheet);

  // 前のシートは削除
  var oldSheet = bookTo.getSheetByName(toName);
  if (oldSheet != null) bookTo.deleteSheet(oldSheet);
  
  // テンプレートシートをコピー
  if (fromSheets.length >= 1) {  
    for(var i = 0;i < fromSheets.length; i++)
    {
      if (sheetName == fromSheets[i].getName()) {
        var copySheet = fromSheets[i].copyTo(bookTo);
        copySheet.setName(toName);
        bookTo.setActiveSheet(copySheet);
        copySheet.showSheet();
        break;
      }
    }
  }
}


// Logsパラメータ設定ダイアログ
function dialogFflogs() {
  var message = "https://www.fflogs.com/reports/【???????/#fight=数字】\nの【】の部分を入力";
  var dialog = Browser.inputBox(message, Browser.Buttons.OK_CANCEL);
  if (dialog != "cancel") return dialog;

  return false;
}


// ジョブ選択ダイアログ
function dialogJob(friendries) {
  var message = "出力対象のジョブを以下から選択\\n\\n";
  var job = "";
  
  for (var i in friendries) {
    var type = friendries[i]["type"];
    if (type == "LimitBreak") continue;
    
    job += type + "\\n";
  }
  message = message + job + "\\n";
  
  var dialog = Browser.inputBox(message, Browser.Buttons.OK_CANCEL);
  if (dialog != "cancel") return getFriendryName(dialog, friendries);
  
  return false;
}


// logsのfriendriesから名前を返す
function getFriendryName(job, friendries) {
  for (var i in friendries) {
    if (friendries[i]["type"] == job) {
      return friendries[i]["name"];
    }
  }
  
  return false;
}
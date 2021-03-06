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

// outputtypeをみてstartrowを判断
function getStartRow(tmpName) {
  if(OUTPUT_ALLBUFF == tmpName) {
    return allStartRow;

  } else if ([OUTPUT_TIMELINE, OUTPUT_LOG].indexOf(tmpName) >= 0) {
    return oStartRow;

  } else {
    return jStartRow;

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
    "count": 1,
    "damage": null,
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
  obj.getoutputTypeJob();
  return obj.jobName;
}

// Petかどうか
function booPet(who) {
  if (typeof who != "string" || who == null || who == "") return false;
  return who.match(/(カーバンクル・|オートタレット・|・エギ|フェアリー|デミ・|セラフィム|英雄の影身|オートマトン・クイーン|分身)/);
}

// 敵かどうか
function booEnemy(who) {
  if (typeof who != "string" || who == null || who == "") return false;
  return !who.match(/\s/) && !booPet(who) && !who.match(/アーサリースター/);
}

// オートアタックか
function booAA(event) {
  if(event == "攻撃" || event == "ショット" || event == "光の癒し") return true;
  return false;
}

// 召喚を出力
function SMN_EnagyValue(event) {
  var value = null;
  
  if(event == "エナジードレイン") {
    value = 1;
  } else if(event == "エナジーサイフォン") {
    value = 2;
  }
  
  return value;
}

function SMN_FlowValue(event) {
  var value = null;
  
  if(event == "ミアズマバースト") {
    value = 1;
  } else if(event == "ペインフレア") {
    value = 2;
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
  if (time < 0) time = 0;
  var minute = Math.floor(time/ 60);
  var second = time % 60;
  
  if(minute < 10) minute = "0" + minute;
  if(second < 10) second = "0" + second;
  
  return ("00:" + minute + ":" + second);
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


// セルに名前をセットするか
function booName2Cell(event) {
  return SET_TARGET_SKILLS.indexOf(event) >= 0 ? true: false;
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
  
  return val == 1 ? true : false;
}

// FFLogsのAPIキー
function getLogsKey() {
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_SETTING);
  return sheet.getRange(COL_API_KEY).getValue();
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


// LogsAPI設定ダイアログ
function dialogApiKey() {
  var message = "FFlogsのWeb API V1クライアントキーを入力";
  var dialog = Browser.inputBox(message, Browser.Buttons.OK_CANCEL);
  if (dialog != "cancel") return dialog;  
  
  return false;
}


// ジョブ選択ダイアログ
function dialogJob(friendries) {
  var message = "出力対象のジョブを以下から選択\\n\\n";
  var job = "";
  
  for (var i in friendries) {
    if (friendries[i]["type"] == "LimitBreak") continue;
    var type = friendries[i]["type"];
    
    job += type + "\\n";
  }
  message = message + job + "\\n";
  message = message + "選択しない場合は【" + type + "】で出力"
  
  var dialog = Browser.inputBox(message, Browser.Buttons.OK_CANCEL);
  if (dialog != "cancel") return getFriendryName(dialog, friendries, type);
  
  return false;
}


// logsのfriendriesから名前を返す
function getFriendryName(job, friendries, jobDef) {
  if (job == "") job = jobDef;
  
  for (var i in friendries) {
    if (friendries[i]["type"] == job) {
      return friendries[i]["name"];
    }
  }
  
  return false;
}

// FFLogsAPIへアクセス
function getResponse(path, key) {
  if (path.match(/\?/)) {
    path = path + "&api_key=" + key;
  } else {
    path = path + "?api_key=" + key;
  }
  
  try {
    var response = UrlFetchApp.fetch(LOGS_HOST　+ path);
    var responseCode = response.getResponseCode();
  } catch(e) {
    var responseCode = -1;
  }
  
  if (responseCode != 200) {
    Browser.msgBox(ERR_NO_URL);
    return false;
  }
  
  return response;
}
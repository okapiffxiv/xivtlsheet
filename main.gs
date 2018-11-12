// メニュー作成
function onOpen(){
  Menu();
}


function ユーザ名設定() {
  var userName = getUserName();
  if(userName == undefined || userName == "") userName = ERR_NO_SETTING;
  var message = "出力対象のユーザ名を入力(半角)\\n現在の設定: 「" + userName + "」\\n";
  
  var dialog = Browser.inputBox(message, Browser.Buttons.OK_CANCEL);
  
  if (dialog != "cancel"){
    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_SETTING);
    sheet.getRange(COL_USER_NAME).setValue(dialog);
    Menu();
  }
}

function スキル回しに切り替え() {
  var oldVal = booOutputTlSkill();
  var sheet = SpreadsheetApp.getActive().getSheetByName(SHEET_SETTING);
  var val = 1;
  
  if (oldVal == true) val = 0;
  
  sheet.getRange(COL_OUTPUT_SKILL).setValue(val);
  Menu();
}

// logsからインポート
function FFLogsからEnemiesをインポート() {
  new Convert2Enemy();
}

function FFLogsからFriendriesをインポート() {
  new Convert2Friends();
}


// pluginからインポート
function タイムラインをインポート() {
  copyTempSheets_(TMP_ONLY);
  new Convert2FfxivPlugin(OUTPUT_TIMELINE);
}

function シナジーバフをインポート() {
  copyTempSheets_(TMP_RAIDBUFF);
  new Convert2FfxivPlugin(OUTPUT_RAIDBUFF);
}

function バフをインポート() {
  copyTempSheets_(TMP_BUFF);
  new Convert2FfxivPlugin(OUTPUT_ALLBUFF);
}

function 詩人情報をインポート() {
  copyTempSheets_(TMP_BRD);
  new Convert2FfxivPlugin(OUTPUT_BRDBUFF);
}

function モンク情報をインポート() {
  copyTempSheets_(TMP_MNK);
  new Convert2FfxivPlugin(OUTPUT_MNKBUFF);
}

function 竜情報をインポート() {
  copyTempSheets_(TMP_DRG);
  new Convert2FfxivPlugin(OUTPUT_DRGBUFF);
}

function 召喚情報をインポート() {
  copyTempSheets_(TMP_SMN);
  new Convert2FfxivPlugin(OUTPUT_SMNBUFF);
}

function 戦士情報をインポート() {
  copyTempSheets_(TMP_WAR);
  new Convert2FfxivPlugin(OUTPUT_WARBUFF);
}

function ナイト情報をインポート() {
  copyTempSheets_(TMP_PLD);
  new Convert2FfxivPlugin(OUTPUT_PLDBUFF);
}

function ViewLogをインポート() {
  copyTempSheets_(TMP_VIEWLOG, SHEET_LOG);
  new Convert2FfxivPlugin(OUTPUT_LOG);
}

function Logsシートをリセット() {
  new CreateLogsSheet();
}
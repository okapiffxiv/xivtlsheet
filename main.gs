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
function Logsからタイムラインをインポート() {
  copyTempSheets_(TMP_ONLY);
  new Convert2Fflogs(OUTPUT_TIMELINE);
}

function Logsからバフをインポート() {
  copyTempSheets_(TMP_BUFF);
  new Convert2Fflogs(OUTPUT_ALLBUFF);
}

function Logsからシナジーバフをインポート() {
  copyTempSheets_(TMP_RAIDBUFF);
  new Convert2Fflogs(OUTPUT_RAIDBUFF);
}

function Logsから詩人情報をインポート() {
  copyTempSheets_(TMP_BRD);
  new Convert2Fflogs(OUTPUT_BRDBUFF, "Bard");
}

function Logsから機工士情報をインポート() {
  copyTempSheets_(TMP_MCH);
  new Convert2Fflogs(OUTPUT_MCHBUFF, "Machinist");
}

function Logsからモンク情報をインポート() {
  copyTempSheets_(TMP_MNK);
  new Convert2Fflogs(OUTPUT_MNKBUFF, "Monk");
}

function Logsから竜情報をインポート() {
  copyTempSheets_(TMP_DRG);
  new Convert2Fflogs(OUTPUT_DRGBUFF, "Dragoon");
}

function Logsから召喚情報をインポート() {
  copyTempSheets_(TMP_SMN);
  new Convert2Fflogs(OUTPUT_SMNBUFF, "Summoner");
}

function Logsから戦士情報をインポート() {
  copyTempSheets_(TMP_WAR);
  new Convert2Fflogs(OUTPUT_WARBUFF, "Warrior");
}

function Logsからナイト情報をインポート() {
  copyTempSheets_(TMP_PLD);
  new Convert2Fflogs(OUTPUT_PLDBUFF, "Paladin");
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

function 機工士情報をインポート() {
  copyTempSheets_(TMP_BRD);
  new Convert2FfxivPlugin(OUTPUT_MCHBUFF);
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

function githubへ移動() {
  Browser.msgBox(ERR_LINK_GITHUB, Browser.Buttons.OK);
}
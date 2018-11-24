////////////////////////////////////////
// ヘッダーメニュー生成
////////////////////////////////////////

var Menu = function () {
  var ui = SpreadsheetApp.getUi();
  var menuTitle = "タイムライン";
  var menu = ui.createMenu(menuTitle);
  var booTlSkill = "✓";
  if(!booOutputTlSkill()) booTlSkill = "";
  
  menu.addSubMenu(
    ui.createMenu("ACTのLogから作成")
    .addItem("タイムラインのみ", "タイムラインをインポート")
    .addItem("ヒール＆軽減", "バフをインポート")
    .addItem("シナジーバフ", "シナジーバフをインポート")
    .addItem("詩人", "詩人情報をインポート")
    .addItem("モンク", "モンク情報をインポート")
    .addItem("竜", "竜情報をインポート")
    .addItem("召喚", "召喚情報をインポート")
    .addItem("戦士", "戦士情報をインポート")
    .addItem("ナイト", "ナイト情報をインポート")
  );
  menu.addSubMenu(
    ui.createMenu("FFLogsから作成")
    .addItem("タイムラインのみ", "Logsからタイムラインをインポート")
    .addItem("ヒール＆軽減", "Logsからバフをインポート")
    .addItem("シナジーバフ", "Logsからシナジーバフをインポート")
    .addItem("詩人", "Logsから詩人情報をインポート")
    .addItem("モンク", "Logsからモンク情報をインポート")
    .addItem("竜", "Logsから竜情報をインポート")
    .addItem("召喚", "Logsから召喚情報をインポート")
    .addItem("戦士", "Logsから戦士情報をインポート")
    .addItem("ナイト", "Logsからナイト情報をインポート")
  );
  menu.addSeparator();  
  menu.addItem("スキル回しに切り替え " + booTlSkill, "スキル回しに切り替え");
  menu.addSeparator();  
  menu.addItem("ユーザ設定（"+ getUserName() +"）", "ユーザ名設定");
  menu.addItem("ViewLogを出力", "ViewLogをインポート")
  menu.addItem("logsシートをリセット", "Logsシートをリセット")
  menu.addItem("最新のシート情報（ver."+ VERSION +"）", "githubへ移動")

  menu.addToUi(); 

}

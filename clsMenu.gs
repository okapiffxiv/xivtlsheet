////////////////////////////////////////
// ヘッダーメニュー生成
////////////////////////////////////////

var Menu = function () {
  var ui = SpreadsheetApp.getUi();
  var menu = ui.createMenu('タイムライン');
  var booTlSkill = "✓";
  a = booOutputTlSkill();
  if(!booOutputTlSkill()) booTlSkill = "";
  
  menu.addSubMenu(
    ui.createMenu("タイムライン作成")
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
  menu.addSeparator();  
  menu.addItem("ユーザ設定（"+ getUserName() +"）", "ユーザ名設定");
  menu.addItem("スキル回しに切り替え " + booTlSkill, "スキル回しに切り替え");
  menu.addSeparator();  
  menu.addItem("ViewLogを出力", "ViewLogをインポート")
  menu.addItem("logsシートをリセット", "Logsシートをリセット")

  menu.addToUi(); 

}

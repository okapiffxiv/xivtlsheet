////////////////////////////////////////
// シナジー出力セル定義
////////////////////////////////////////

function RAIDBUFF_OutputBuffCol(who, whom, type, event, userName) {
  var col = null;
  var baseCol = CNT_TIMELINE_COL;
  var skills = [
    "テクニカルフィニッシュ",
    "スタンダードフィニッシュ",
    "だまし討ち",
    "連環計",
    "竜の",
    "攻めのタンゴ",
    "エンボルデン",
    "桃園結義：闘気",
    "エギの加護",
    "バトルリタニー",
    "バトルボイス",
    "ディヴィネーション",
    "強化薬"
  ];

  if(
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "テクニカルフィニッシュ") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "スタンダードフィニッシュ") ||
    (event == "だまし討ち" || (type == AC_LOSE_EFFECT && event == "被ダメージ上昇" && !booPet(who) && booEnemy(whom))) ||
    ((type == AC_LOSE_EFFECT || type == AC_ACTION) && event == "連環計") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && (event == "竜の右眼" || event == "竜の左眼")) ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "攻めのタンゴ") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "エンボルデン") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "桃園結義：闘気") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_AOE || type == AC_EFFECT) && event == "エギの加護") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "バトルリタニー") ||
    ((who == userName || whom == userName) && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "バトルボイス") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "ディヴィネーション") ||
    (whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "強化薬")
  ) {
    return baseCol + skills.indexOf(event) + 1;
  }
  
  return col;
}
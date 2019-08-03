////////////////////////////////////////
// シナジー出力セル定義
////////////////////////////////////////

function RAIDBUFF_OutputBuffCol(who, whom, type, event, userName) {
  var col = null;
  var baseCol = CNT_TIMELINE_COL;
  
  if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "テクニカルフィニッシュ") {
    col = baseCol + 1;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "スタンダードフィニッシュ") {
    col = baseCol + 2;
  } else if (event == "だまし討ち" || 
      (type == AC_LOSE_EFFECT && event == "被ダメージ上昇" && !booPet(who) && booEnemy(whom))) {
    col = baseCol + 3;
  } else if((type == AC_LOSE_EFFECT || type == AC_ACTION) && event == "連環計") {
    col = baseCol + 4;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && (event == "竜の右眼" || event == "竜の左眼")) {
    col = baseCol + 5;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "攻めのタンゴ") {
    col = baseCol + 6;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "エンボルデン") {
    col = baseCol + 7;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "桃園結義：闘気") {
    col = baseCol + 8;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_AOE || type == AC_EFFECT) && event == "エギの加護") {
    col = baseCol + 9;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "バトルリタニー") {
    col = baseCol + 10;
  } else if((who == userName || whom == userName) && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "バトルボイス") {
    col = baseCol + 11;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "ディヴィネーション") {
    col = baseCol + 12;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "強化薬") {
    col = baseCol + 13;
  }
  
  return col;
}
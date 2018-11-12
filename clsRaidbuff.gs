////////////////////////////////////////
// シナジー出力セル定義
////////////////////////////////////////

function RAIDBUFF_OutputBuffCol(who, whom, type, event, userName) {
  var col = null;
  var baseCol = CNT_TIMELINE_COL;
  
  if (event == "だまし討ち" || 
      (type == AC_LOSE_EFFECT && event == "被ダメージ上昇" && !booEgi(who) && booEnemy(whom))) {
    col = baseCol + 1;
  } else if((type == AC_LOSE_EFFECT || type == AC_ACTION) && event == "連環計") {
    col = baseCol + 2;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_AOE) && event == "エギの加護") {
    col = baseCol + 3;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && (event == "竜の右眼" || event == "竜の左眼")) {
    col = baseCol + 4;
//  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "ハイパーチャージ") {
//    col = baseCol + 4;
  } else if((type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "魔人のレクイエム") {
    col = baseCol + 5;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "桃園結義：闘気") {
    col = baseCol + 6;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "バトルリタニー") {
    col = baseCol + 7;
  } else if((who == userName || whom == userName) && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "バトルボイス") {
    col = baseCol + 8;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_AOE) && event == "アーゼマの均衡") {
    col = baseCol + 9;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "強化薬") {
    col = baseCol + 10;
  } else if(whom == userName && (type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "リフレッシュ") {
    col = baseCol + 11;
  }
  
  return col;
}
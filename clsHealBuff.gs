////////////////////////////////////////
// ヒール系出力セル定義
////////////////////////////////////////
Heal_OutputBuff = function(outputType, who, whom, type, event, userName) {
  this.outputType = outputType;
  this.who   = who;
  this.whom  = whom;
  this.type  = type;
  this.event = event;
  this.userName = userName;
  this.baseCol = CNT_TIMELINE_COL;
}

Heal_OutputBuff.prototype.getCol = function() {
  var col = null;
  
  if(this.outputType == OUTPUT_ALLBUFF) {
    var col = this.Barrier(this.who, this.type, this.event, this.whom);
    if (col != null) return col;
    
    var col = this.BarrierAll(this.who, this.type, this.event, this.whom);
    if (col != null) return col;
    
    var col = this.Down(this.who, this.type, this.event, this.whom);
    if (col != null) return col;
    
    var col = this.WHM(this.who, this.type, this.event, this.whom);
    if (col != null) return col;
    
    var col = this.AST(this.who, this.type, this.event, this.whom);
    if (col != null) return col;
    
    var col = this.SCH(this.who, this.type, this.event, this.whom);
    if (col != null) return col;
  }
  
  return col;
}

// 単体バリア系
Heal_OutputBuff.prototype.Barrier = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol;
  
  if((type == AC_ACTION && event == "挑発") || (type == AC_AOE && event == "アルティメイタム")) {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ランパート") {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ヴェンジェンス") {
    col = 3;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ホルムギャング") {
    col = 4;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "センチネル") {
    col = 5;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "かばう") {
    col = 6;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シェルトロン") {
    col = 7;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "インビンシブル") {
    col = 8;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "インターベンション") {
    col = 9;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シャドウウォール") {
    col = 10;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ブラックナイト") {
    col = 11;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "リビングデッド") {
    col = 12;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アポカタスタシス") {
    col = 13;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}


// 全体バリア系
Heal_OutputBuff.prototype.BarrierAll = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_BARRIER_COL;

  if(type == AC_ACTION && event == "ディヴァインヴェール") {
    col = 1;
  } else if(whom == this.userName && type == AC_AOE && event == "シェイクオフ") {
    col = 2;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event.match(/^トルバドゥール：/) ) {
    col = 3;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}

// 軽減系
Heal_OutputBuff.prototype.Down = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_BARRIER_COL + CNT_BARRIERALL_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "牽制") {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "パリセード") {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "リプライザル") {
    col = 3;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アドル") {
    col = 4;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ウェポンブレイク") {
    col = 5;
  }

  if (col != null) col = baseCol + col;
  return col;
}


Heal_OutputBuff.prototype.WHM = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_BARRIER_COL + CNT_BARRIERALL_COL + CNT_DOWN_COL;

  if (whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "メディカラ") {
    col = 1;
  } else if(type == AC_ACTION && event == "ケアルラ") {
    col = 2;
  } else if(type == AC_ACTION && event == "ベネディクション") {
    col = 3;
  } else if(type == AC_ACTION && event == "テトラグラマトン") {
    col = 4;
  } else if((type == AC_AOE || type == AC_LOSE_EFFECT) && event == "アサイラム") {
    col = 5;
  } else if(whom == this.userName && type == AC_AOE && event == "アサイズ") {
    col = 6;
  } else if(whom == this.userName && type == AC_AOE && event == "ケアルガ") {
    col = 7;
  } else if(whom == this.userName && type == AC_AOE && event == "メディカ") {
    col = 8;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "インドゥルゲンティア") {
    col = 9;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}


Heal_OutputBuff.prototype.AST = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_BARRIER_COL + CNT_BARRIERALL_COL + CNT_DOWN_COL + CNT_WHM_COL;

  if(whom == this.userName && type == AC_AOE && event == "ヘリオス") {
    col = 1;
  } else if(type == AC_ACTION && event == "ディグニティ") {
    col = 2;
  } else if(type == AC_ACTION && event == "ベネフィラ") {
    col = 3;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アスペクト・ヘリオス") {
    col = 4;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シナストリー［被］") {
    col = 5;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "運命の輪") {
    col = 6;
  } else if(type == AC_AOE && (event == "アーサリースター" || event == "ステラデトネーション")) {
    col = 7;
  } else if(type == AC_ACTION && event == "クラウンレディ") {
    col = 8;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}

Heal_OutputBuff.prototype.SCH = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_BARRIER_COL + CNT_BARRIERALL_COL + CNT_DOWN_COL + CNT_WHM_COL + CNT_AST_COL;

  if((type == AC_AOE || type == AC_LOSE_EFFECT) && event == "野戦治療の陣") {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "フェイユニオン［被］") {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "深謀遠慮の策") {
    col = 3;
  } else if(whom == this.userName && type == AC_AOE && event == "士気高揚の策") {
    col = 4;
  } else if(type == AC_ACTION && event == "鼓舞激励の策") {
    col = 5;
  } else if(type == AC_AOE && event == "展開戦術") {
    col = 6;
  } else if(type == AC_ACTION && event == "生命活性法") {
    col = 7;
  } else if (whom == this.userName && type == AC_AOE && event == "不撓不屈の策") {
    col = 8;
  } else if (whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "光の囁き") {
    col = 9;
  } else if (type == AC_ACTION && event == "転化") {
    col = 10;
  }

  if (col != null) col = baseCol + col;
  return col;
}

////////////////////////////////////////
// ジョブ別出力セル定義
////////////////////////////////////////
Job_OutputBuff = function(outputType, who, whom, type, event, userName) {
  this.outputType = outputType;
  this.who   = who;
  this.whom  = whom;
  this.type  = type;
  this.event = event;
  this.userName = userName;
  this.baseCol = CNT_TIMELINE_COL + CNT_RAIDBUFF_COL;
}

// Colを返す
Job_OutputBuff.prototype.getCol = function() {
  var col = null;
  
  if (this.outputType == OUTPUT_BRDBUFF) {
    return this.BRD(this.type, this.event);
    
  } else if(this.outputType == OUTPUT_MCHBUFF) {
    return this.MCH(this.type, this.event);
    
  } else if(this.outputType == OUTPUT_MNKBUFF) {
    return this.MNK(this.who, this.type, this.event);
    
  } else if(this.outputType == OUTPUT_DRGBUFF) {
    return this.DRG(this.who, this.type, this.event);
    
  } else if(this.outputType == OUTPUT_WARBUFF) {
    return this.WAR(this.type, this.event);

  } else if(this.outputType == OUTPUT_PLDBUFF) {
    return this.PLD(this.type, this.event);

  } else if(this.outputType == OUTPUT_SMNBUFF) {
    return this.SMN(this.who, this.type, this.event, this.whom);
  }

  return col;
}

// 出力バフタイプがジョブ別用か
Job_OutputBuff.prototype.getoutputTypeJob = function() {
  if(this.getCol() == null) {
    return false;
  } else {
    return true;
  }
}

// 詩人
Job_OutputBuff.prototype.BRD = function(type, event) {
  var col = null;
  
  if(type == AC_ACTION && BRD_SongValue(event) != null) {
    col = 1;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "猛者の撃") {
    col = 2;
  } else if(type == AC_ACTION && event == "アイアンジョー") {
    col = 3;
  } else if(type == AC_ACTION && event == "エンピリアルアロー") {
    col = 4;
  } else if(type == AC_ACTION && event == "サイドワインダー") {
    col = 5;
  } else if((type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "タクティシャン") {
    col = 6;
  }
  
  if (col != null) col = this.baseCol + col;
  return col;
}

// 機工士
Job_OutputBuff.prototype.MCH = function(type, event) {
  var col = null;

  if(type == AC_ACTION && event == "ガウスバレル") {
    col = 1;
  } else if(type == AC_ACTION && event == "バレルヒーター") {
    col = 2;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "フレイムスロアー") {
    col = 3;
  } else if(type == AC_ACTION && (event == "オーバードライブ・ルーク" || event == "オーバードライブ・ビショップ")) {
    col = 4;
  } else if(type == AC_ACTION && event == "ガウスラウンド") {
    col = 5;
  } else if(type == AC_ACTION && event == "クールダウン") {
    col = 6;
  } else if(type == AC_ACTION && event == "リコシェット") {
    col = 7;
  } else if((type == AC_LOSE_EFFECT || type == AC_EFFECT) && event == "タクティシャン") {
    col = 8;
  }
  
  if (col != null) col = this.baseCol + col;
  return col;
}

// モンク
Job_OutputBuff.prototype.MNK = function(who, type, event) {
  var col = null;
  
  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "発勁") {
    col = 1;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "紅蓮の極意") {
    col = 2;
  } else if(type == AC_ACTION && event == "空鳴拳") {
    col = 3;
  } else if(type == AC_ACTION && event == "蒼気砲") {
    col = 4;
  } else if(type == AC_ACTION && event == "闘魂旋風脚") {
    col = 5;
  } else if(type == AC_ACTION && event == "疾風羅刹衝") {
    col = 6;
  } else if(type == AC_ACTION && event == "疾風の極意") {
    col = 7;
  } else if(type == AC_ACTION && event == "紅蓮羅刹衝") {
    col = 8;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "踏鳴") {
    col = 9;
  } else if(who == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "トゥルーノース") {
    col = 10;
  }
  
  if (col != null) col = this.baseCol + col;
  return col;
}

// 竜
Job_OutputBuff.prototype.DRG = function(who, type, event) {
  var col = null;
  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "捨身") {
    col = 1;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "ライフサージ") {
    col = 2;
  } else if(type == AC_ACTION && (event == "竜牙竜爪" || event == "竜尾大車輪")) {
    col = 3;
  } else if(type == AC_ACTION && event == "ゲイルスコグル") {
    col = 4;
  } else if(type == AC_ACTION && event == "ジャンプ") {
    col = 5;
  } else if(type == AC_ACTION && event == "スパインダイブ") {
    col = 6;
  } else if(type == AC_ACTION && event == "ミラージュダイブ") {
    col = 7;
  } else if(type == AC_ACTION && event == "ナーストレンド") {
    col = 8;
  } else if(who == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "トゥルーノース") {
    col = 9;
  }
  
  if (col != null) col = this.baseCol + col;
  return col;
}


// 戦士定義
Job_OutputBuff.prototype.WAR = function(type, event) {
  var col = null;
  
  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "原初の解放") {
    col = 1;
  } else if(type == AC_ACTION && event == "オンスロート") {
    col = 2;
  } else if(type == AC_ACTION && event == "アップヒーバル") {
    col = 3;
  } else if(type == AC_ACTION && event == "ウォークライ") {
    col = 4;
  }

  if (col != null) col = this.baseCol + col;
  return col;
}

// ナイト定義
Job_OutputBuff.prototype.PLD = function(type, event) {
  var col = null;
  
  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ファイト・オア・フライト") {
    col = 1;
  } else if(type == AC_ACTION && event == "レイジ・オブ・ハルオーネ") {
    col = 2;
  } else if((type == AC_ACTION || type == AC_REFRESH) && event == "ゴアブレード") {
    col = 3;
  } else if(type == AC_ACTION && event == "ロイヤルアソリティ") {
    col = 4;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "レクイエスカット") {
    col = 5;
  } else if(type == AC_ACTION && event == "ホーリースピリット") {
    col = 6;
  } else if(type == AC_ACTION && event == "スピリッツウィズイン") {
    col = 7;
  } else if(type == AC_ACTION && event == "サークル・オブ・ドゥーム") {
    col = 8;
  }

  if (col != null) col = this.baseCol + col;
  return col;
}


// 召喚定義
Job_OutputBuff.prototype.SMN = function(who, type, event, whom) {
  var col = null; 

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ルイネーション") {
    col = 1;
  } else if((type == AC_ACTION || type == AC_REFRESH) && event == "トライディザスター") {
    col = 2;
  } else if((type == AC_ACTION || type == AC_REFRESH) && event == "ミアズガ") {
    col = 3;
  } else if((type == AC_ACTION || type == AC_REFRESH) && event == "バイオガ") {
    col = 4;
  } else if((type == AC_ACTION || type == AC_REFRESH) && event == "ルインガ") {
    col = 5;
  } else if(who == this.userName && type == AC_ACTION && SMN_RuinValue(event) != null) {
    col = 6;
  } else if(who == this.userName && type == AC_ACTION && SMN_EnagyValue(event) != null) {
    col = 7;
  } else if(who == this.userName && type == AC_ACTION && SMN_FlowValue(event) != null) {
    col = 8;
  } else if(type == AC_ACTION && event.match(/^エギアサルトi：/)) {
    col = 9;
  } else if(type == AC_ACTION && event.match(/^エギアサルトii：/)) {
    col = 10;
  } else if(type == AC_ACTION && event.match(/^エンキンドル：/)) {
    col = 11;
  } else if(type == AC_ACTION && event == "トランス・バハムート") {
    col = 12;
  } else if(type == AC_ACTION && event == "デスフレア") {
    col = 13;
  } else if(type == AC_ACTION && event == "サモン・バハムート") {
    col = 14;
  } else if(type == AC_ACTION && event == "ウィルムウェーブ") {
    col = 15;
  } else if(type == AC_ACTION && event == "アク・モーン") {
    col = 16;
  } else if(type == AC_ACTION && event == "トランス・フェニックス") {
    col = 17;
  } else if(type == AC_ACTION && event == "霊泉の炎") {
    col = 18;
  } else if(type == AC_ACTION && event == "煉獄の炎") {
    col = 19;
  } else if(type == AC_ACTION && event == "リヴァレーション") {
    col = 20;
  }

  if (col != null) col = this.baseCol + col;
  return col;
}

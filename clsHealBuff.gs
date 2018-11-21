////////////////////////////////////////
// ヒール系出力セル定義
////////////////////////////////////////
Heal_OutputBuff = function(outputType, who, whom, type, event, userName, jobs) {
  this.outputType = outputType;
  this.who   = who;
  this.whom  = whom;
  this.type  = type;
  this.event = event;
  this.userName = userName;
  this.jobs = jobs;
  
  this.baseCol = CNT_TIMELINE_COL;
}

Heal_OutputBuff.prototype.getCol = function() {
  var col = null;
  
  if(this.outputType == OUTPUT_ALLBUFF) {
    if (this.jobs[this.who] == "Warrior") {
      var col = this.WAR(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Paladin") {
      var col = this.PLD(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Darkknight") {
      var col = this.DRK(this.who, this.type, this.event, this.whom);

    } else if(this.jobs[this.who] == "Monk") {
      var col = this.MNK(this.who, this.type, this.event, this.whom);

    } else if(this.jobs[this.who] == "Dragoon") {
      var col = this.DRG(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Ninja") {
      var col = this.NIN(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Samurai") {
      var col = this.SAM(this.who, this.type, this.event, this.whom);

    } else if(this.jobs[this.who] == "Bard") {
      var col = this.BRD(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Blackmage") {
      var col = this.BLM(this.who, this.type, this.event, this.whom);

    } else if(this.jobs[this.who] == "Summoner" || this.who.match(/Garuda|Ifrit|Titan|ガルーダ|イフリート|タイタン/)) {
      var col = this.SMN(this.who, this.type, this.event, this.whom);

    } else if(this.jobs[this.who] == "Redmage") {
      var col = this.RDM(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Whitemage") {
      var col = this.WHM(this.who, this.type, this.event, this.whom);

    } else if(this.jobs[this.who] == "Astrologian") {
      var col = this.AST(this.who, this.type, this.event, this.whom);
      
    } else if(this.jobs[this.who] == "Scholar" || this.who.match(/Eos|Selene|エオス|セレネ/)) {
      var col = this.SCH(this.who, this.type, this.event, this.whom);
      
    }
    
    if (col != null) return col;
  }
  
  return col;
}


// 戦士
Heal_OutputBuff.prototype.WAR = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol;

  if (this.Provoke(type, event)) {
    col = 1;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シェイクオフ") {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ヴェンジェンス") {
    col = 3;
  } else if(this.Rampart(type, event)) {
    col = 4;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "スリル・オブ・バトル") {
    col = 5;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ホルムギャング") {
    col = 6;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "原初の直感") {
    col = 7;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アウェアネス") {
    col = 8;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "コンバレセンス") {
    col = 9;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "リプライザル") {
    col = 10;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}


// ないと
Heal_OutputBuff.prototype.PLD = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL;

  if (this.Provoke(type, event)) {
    col = 1;
  } else if(this.Rampart(type, event)) {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "センチネル") {
    col = 3;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ブルワーク") {
    col = 4;
  } else if((type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "かばう") {
    col = 5;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シェルトロン") {
    col = 6;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "インビンシブル") {
    col = 7;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "インターベンション") {
    col = 8;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ディヴァインヴェール［バリア］") {
    col = 9;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "パッセージ・オブ・アームズ") {
    col = 10;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アウェアネス") {
    col = 11;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "コンバレセンス") {
    col = 12;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "リプライザル") {
    col = 13;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}


// 暗黒
Heal_OutputBuff.prototype.DRK = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL;

  if (this.Provoke(type, event)) {
    col = 1;
  } else if(this.Rampart(type, event)) {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シャドウウォール") {
    col = 3;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ブラックナイト") {
    col = 4;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ダークマインド") {
    col = 5;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "リビングデッド") {
    col = 6;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "コンバレセンス") {
    col = 7;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "リプライザル") {
    col = 8;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}


// モンク
Heal_OutputBuff.prototype.MNK = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "牽制") {
    col = 1;
  } else if(type == AC_ACTION && event == "内丹") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}

// 竜騎士
Heal_OutputBuff.prototype.DRG = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "牽制") {
    col = 1;
  } else if(type == AC_ACTION && event == "内丹") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}

// 忍者
Heal_OutputBuff.prototype.NIN = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "牽制") {
    col = 1;
  } else if(type == AC_ACTION && event == "内丹") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}


// 侍
Heal_OutputBuff.prototype.SAM = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "牽制") {
    col = 1;
  } else if(type == AC_ACTION && event == "内丹") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}


// 詩人
Heal_OutputBuff.prototype.BRD = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL;

  if(whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event.match(/^トルバドゥール：/) ) {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "パリセード") {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "地神のミンネ") {
    col = 3;
  } else if(type == AC_ACTION && event == "内丹") {
    col = 4;
  }

  if (col != null) col = baseCol + col;
  return col;
}


// 黒
Heal_OutputBuff.prototype.BLM = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL + CNT_HBRD_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アドル") {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アポカタスタシス") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}

// 召喚
Heal_OutputBuff.prototype.SMN = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL + CNT_HBRD_COL + CNT_HBLM_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アドル") {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アポカタスタシス") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}

// 赤
Heal_OutputBuff.prototype.RDM = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL + CNT_HBRD_COL + CNT_HBLM_COL + CNT_HSMN_COL;

  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アドル") {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アポカタスタシス") {
    col = 2;
  }

  if (col != null) col = baseCol + col;
  return col;
}

// 挑発
Heal_OutputBuff.prototype.Provoke = function(type, event) {
  if((type == AC_ACTION && event == "挑発") || ((type == AC_ACTION || type == AC_AOE) && event == "アルティメイタム")) {
    return true;
  }
  
  return false;
}

// ランパ
Heal_OutputBuff.prototype.Rampart = function(type, event) {
  if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "ランパート") {
    return true;
  }
  
  return false;
}

Heal_OutputBuff.prototype.WHM = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL + CNT_HBRD_COL + CNT_HBLM_COL + CNT_HSMN_COL + CNT_HRDM_COL;

  if (whom == this.userName && (type == AC_REFRESH ||type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "メディカラ") {
    col = 1;
  } else if(type == AC_ACTION && event == "ケアルラ") {
    col = 2;
  } else if(type == AC_ACTION && event == "ベネディクション") {
    col = 3;
  } else if(type == AC_ACTION && event == "テトラグラマトン") {
    col = 4;
  } else if((type == AC_AOE || type == AC_ACTION || type == AC_LOSE_EFFECT) && event == "アサイラム") {
    col = 5;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_AOE) && event == "アサイズ") {
    col = 6;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_AOE) && event == "ケアルガ") {
    col = 7;
  } else if(whom == this.userName && (type == AC_EFFECT || type == AC_AOE) && event == "メディカ") {
    col = 8;
  } else if(whom == this.userName && (type == AC_REFRESH ||type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "インドゥルゲンティア") {
    col = 9;
  }
  
  if (col != null) col = baseCol + col;
  return col;
}


Heal_OutputBuff.prototype.AST = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL + CNT_HBRD_COL + CNT_HBLM_COL + CNT_HSMN_COL + CNT_HRDM_COL + CNT_HWHM_COL;
  
  if(type == AC_ACTION && event == "ベネフィラ") {
    col = 1;
  } else if(type == AC_START_USING && event == "ヘリオス") {
    col = 2;
  } else if(whom == who && (type == AC_REFRESH || type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アスペクト・ヘリオス") {
    col = 3;
  } else if(whom == this.userName && (type == AC_REFRESH || type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "アスペクト・ベネフィク") {
    col = 4;
  } else if(type == AC_ACTION && event == "ディグニティ") {
    col = 5;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "シナストリー［被］") {
    col = 6;
  } else if(who == whom && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "運命の輪") {
    col = 7;
  } else if(event == "アーサリースター" || event == "ステラデトネーション" || event == "ステラバースト") {
    col = 8;
  } else if(type == AC_AOE && event == "星天対抗") {
    col = 9;
  } else if(type == AC_ACTION && event == "クラウンレディ") {
    col = 10;
  }
  
  
  if (col != null) col = baseCol + col;
  return col;
}

Heal_OutputBuff.prototype.SCH = function (who, type, event, whom) {
  var col = null;
  var baseCol = this.baseCol + CNT_HWAR_COL + CNT_HPLD_COL + CNT_HDRK_COL + CNT_HMNK_COL + CNT_HDRG_COL + CNT_HNIN_COL + CNT_HSAM_COL + CNT_HBRD_COL + CNT_HBLM_COL + CNT_HSMN_COL + CNT_HRDM_COL + CNT_HWHM_COL + CNT_HAST_COL;

  if((type == AC_ACTION || type == AC_AOE || type == AC_LOSE_EFFECT) && event == "野戦治療の陣") {
    col = 1;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "フェイユニオン［被］") {
    col = 2;
  } else if((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "深謀遠慮の策") {
    col = 3;
  } else if(type == AC_ACTION && event == "応急戦術") {
    col = 4;
  } else if(whom == this.userName && event == "士気高揚の策") {
    col = 5;
  } else if(type == AC_ACTION && event == "鼓舞激励の策") {
    col = 6;
  } else if(type == AC_AOE && event == "展開戦術") {
    col = 7;
  } else if(type == AC_ACTION && event == "生命活性法") {
    col = 8;
  } else if (whom == this.userName &&  event == "不撓不屈の策") {
    col = 9;
  } else if (whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "光の囁き") {
    col = 10;
  } else if (whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "フェイコヴナント") {
    col = 11;
  } else if (whom == this.userName && (type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "フェイイルミネーション") {
    col = 12;
  } else if (type == AC_ACTION && event == "転化") {
    col = 13;
  } else if ((type == AC_EFFECT || type == AC_LOSE_EFFECT) && event == "慈愛") {
    col = 14;
  }

  if (col != null) col = baseCol + col;
  return col;
}
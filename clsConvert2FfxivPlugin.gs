////////////////////////////////////////
// FFXIV_ACT_PLUGINからタイムラインを作成
////////////////////////////////////////

var Convert2FfxivPlugin = function(outputType, job) {
  // 出力する対象
  this.outputType = outputType;
  this.job        = job;
  this.friendlies = [];
  
  // startRow
  this.startRow = getStartRow(outputType);
  
  // 出力するタイムライン
  this.tlType = OUTPUT_TIMELINE;
  if (booOutputTlSkill()) this.tlType = OUTPUT_SKILL;

  // 出力クラス
  this.clsOutput = null;
  
  // シート名
  if (this.outputType == OUTPUT_LOG) {
    this.sheetName = SHEET_LOG;
  } else {
    this.sheetName = SHEET_TIMELINE;
  }
  
  // シートの存在チェック
  if(!booSheet(this.sheetName)) {
    Browser.msgBox(ERR_NO_TEMP);
    return;
  }
  
  this.data2Parse();
  
  return true;
}


// データをパース
Convert2FfxivPlugin.prototype.data2Parse = function() {
  var objSheet = SpreadsheetApp.getActive().getSheetByName(SHEET_IMPORT);
  var iValues = objSheet.getDataRange().getValues();
  var iLastRow = iValues.length;
  
  this.startTime = null;
  this.endTime   = null;

  var oValues  = [];
  var oBuffs   = [];
  
  // Logのデータを１行ずつループ
  var logs = [];
  var jobs = {};
  for(var rowNum=1;rowNum<iLastRow;rowNum++) {
    var data  = this.parseLine(iValues[rowNum][0]);
    
    // Unknownはスキップ
    if (data["event"].match(/Unknown/)) continue;
    var val = getTlValue({
      "time" : sec2Time(data["time"] - this.startTime), 
      "type" : data["type"],
      "who"  : data["who"], 
      "whom" : data["whom"],
      "event": data["event"],
      "damage": data["damage"],
      "log"  : data["log"]
    });
    
    val["timeline"] = data["timeline"];

        
    // 配列に追加
    logs.push(val);
    
    // job選別
    var job = this.setJob(val["who"], val["event"]);
    if (job != null) jobs[val["who"]] = job;

    // Combat Endが出た時点でループ終了
    if(this.endTime != null) break;
  }
  
  if (this.outputType != OUTPUT_TIMELINE && this.outputType != OUTPUT_LOG) {
    // ユーザの設定
    for (userName in jobs) this.friendlies.push({'type': jobs[userName], 'name': userName});
    
    if (this.job == undefined) {
      this.userName = dialogJob(this.friendlies);
    } else {
      this.userName = getFriendryName(this.job, this.friendlies)
    }
    if (!this.userName) return false;
  }

  this.clsOutput = new clsOutput(this.outputType, this.startRow,　this.tlType, this.userName);

  // フィルタリング
  for (var idx in logs) {
    var log = logs[idx];
    var duplicateIdx = this.clsOutput.duplicateIdx(oValues, log);
    if (duplicateIdx) {
      oValues[duplicateIdx]['count']++;
      if (log['damage'] != null) oValues[duplicateIdx]['damages'].push(log['damage']);
      continue;
    }

    if (this.tlType == OUTPUT_TIMELINE && log["timeline"]) {
      log['damages'] = (log['damage'] == null) ? [] : [log['damage']];
      if (!this.clsOutput.booContinue(log)) oValues.push(log);
      
    } else {
      if (this.tlType == OUTPUT_SKILL) {
        log['damages'] = (log['damage'] == null) ? [] : [log['damage']];
        if (!this.clsOutput.booContinue(log)) oValues.push(log);
      }

      if (this.outputType != OUTPUT_TIMELINE && this.outputType != OUTPUT_LOG) {
        if (this.clsOutput.outputBuffCol(log, jobs) != null) oBuffs.push(log);
      }

    }
  }
  
  // 終了時間の設定
  if(this.endTime == null && oValues.length > 0) {
    this.endTime = oValues[oValues.length - 1]["time"];
    oValues.push(getTlValue({
      "time": this.endTime,
      "type": AC_FAILED
    }));
  }

  // シートに書き込み
  objSheet = SpreadsheetApp.getActive().getSheetByName(this.sheetName);
  this.clsOutput.outputTimeline(objSheet, oValues, jobs);
  this.clsOutput.setAllbuff(objSheet, oBuffs, jobs);
}


// 1行ずつ解析
Convert2FfxivPlugin.prototype.parseLine = function(data) {
  var val = {};
  var text = "";
  
  text = data.replace(/^\[\d{2}:\d{2}:\d{2}\.\d{3}\]\s/g, "");
  
  val["time"]   = data.replace(/^\[([^\]]+)\].*$/g, "$1");
  val["time"]   = time2Sec(val["time"], this.startTime);
  val["type"]   = text.replace(/^([0-9A-Z]{2}):.*/g, "$1");
  val["who"]    = "";
  val["whom"]   = "";
  val["event"]  = "";
  val["damage"] = null;
  val["log"]    = text;
  
  if (text.match(/^00:0039:戦闘開始！/)) {
    if (this.startTime != null) {
      val["event"] = EVENT_UNKNOWN;
    } else {
      val["type"] = AC_CONBATSTART;
      this.startTime = val["time"];
    }
  } else if(text.match(/の攻略を終了した。|が戦利品に追加されました。|木人討滅戦を達成した！/)) {
    // 戦闘終了
    val["type"] = AC_COMBATEND;
    this.endTime = val["time"];
    
  } else if(text.match(/wipeout|木人討滅戦に失敗した……/)) {
    // 討伐失敗
    val["type"] = AC_FAILED;
    this.endTime = val["time"];
    
  } else if (text.match(/^00:0044:/)) {
    // ダイアログ系
    val["type"] = AC_DIALOG;
    val["event"] = text.replace(/^[^:]+:[^:]+:/g, "");

    if ((val["event"]).match(/:/)) {
      val["who"] = (val["event"]).replace(/^([^:]+):.*$/, "$1");
      val["event"] = (val["event"]).replace(/^[^:]+:(.*)$/, "$1");
    }
    
  } else if(val["type"] == "1A") {
    // エフェクト
    val["type"] = AC_EFFECT;
    val["who"] = text.replace(/^.*\sfrom\s(.*)\sfor\s[0-9\.]*\sSeconds\./g, "$1");
    val["event"] = text.replace(/^.*\sgains\sthe\seffect\sof\s(.*)\sfrom\s.*$/g, "$1");
    val["whom"] = text.replace(/^[^:]+:[^:]+:(.*)\sgains.*$/g, "$1");
    
    // 衰弱は無視
    if(booSkipDebuff(val["event"])) val["event"] = EVENT_UNKNOWN;
    // ペットは無視
    if(booPet(val["whom"])) val["event"] = EVENT_UNKNOWN;

  } else if(val["type"] == "1B") {
    // マーカー
    val["type"] = AC_MARKER;
   
  } else if(val["type"] == 14) {
    // 詠唱開始
    val["type"] = AC_START_USING;
    val["who"] = text.replace(/^[0-9A-Z]{2}:[0-9A-Z]{2,4}:(.*)\sstarts\susing\s.*\son\s.*/g, "$1");
    val["event"] = text.replace(/^.*\sstarts\susing\s(.*)\son\s.*/g, "$1");
    
  } else if(val["type"] == 15 || val["type"] == 16) {
    // 実行 or AOE
    if (val["type"] == 15) {
      val["type"]  = AC_ACTION;
    } else {
      val["type"]  = AC_AOE;
    }
    
    val["who"]   = text.replace(/^(15|16):[0-9A-Z]{8}:/, "");
    val["who"]   = val["who"].replace(/^([^:]*):.*$/, "$1");
    
    val["event"] = text.replace(/^(15|16):[0-9A-Z]{8}:/, "");
    val["event"] = val["event"].replace(/:[0-9A-Z]{8}:.+$/, "").replace(/^.*:[0-9A-Z]{2,4}:/, "").replace(/^:[0-9A-Z]{2,4}:/, "");

    val["whom"] = text.replace(new RegExp(".*" + val["event"] + ":[0-9A-Z]{8}:"), "");
    val["whom"] = val["whom"].replace(/^([^:]*):.*$/, "$1");
    
    var damage = text.replace(/^[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]+:[^:]*:([^:]{1,4})[^:]*:.+$/, "$1");
    if (!booEnemy(val['whom']) && damage.length > 0 && damage.length <= 4 && val["whom"].length > 0) {
      val["damage"] = val['whom'] + "：" + parseInt(damage, 16);
    }

    // AAは無視
    if (booAA(val["event"])) val["event"] = EVENT_UNKNOWN;
  
  } else if(val["type"] == "1E") {
    // 効果切れ
    val["type"] = AC_LOSE_EFFECT;
    val["who"]    = text.replace(/^1E:.*\sfrom\s(.*)\./, "$1");
    val["event"]  = text.replace(/^1E:.*\sloses\sthe\seffect\sof\s(.*)\sfrom.*\./, "$1");
    val["whom"]   = text.replace(/^1E:[^:]+:(.*)\sloses\s.*$/, "$1");
    
    // ペットは無視
    if(booPet(val["whom"])) val["event"] = EVENT_UNKNOWN;
  
  } else if(val["type"] == "03") {
    // ポップ
    val["type"] = AC_POP;
    val["who"]  = text.replace(/^03:[^:]+:Added new combatant\s([^\.]*)\..*$/, "$1");

    // ポップ名が空である場合は無視
    if((val["who"]).length == 0) val["event"] = EVENT_UNKNOWN;
    // ペットは無視
    if(booPet(val["who"])) val["event"] = EVENT_UNKNOWN;
    
  } else {
    val["event"] = EVENT_UNKNOWN;
  }
  
  if (val["type"] == AC_DIALOG ||
      val["type"] == AC_CONBATSTART ||
      val["type"] == AC_COMBATEND ||
      val["type"] == AC_FAILED ||
      val["type"] == AC_MARKER ||
      (val["type"] == AC_EFFECT && (booEnemy(val["who"]) || val["who"] == "")) ||
      (val["type"] != AC_LOSE_EFFECT && booEnemy(val["who"])) ||
      val["type"] == AC_POP
  ) {
    // タイムライン対象
    val["timeline"] = true;

    if (this.startTime == null) {
      this.startTime = val["time"];
      if(val["event"] == EVENT_UNKNOWN) {
        val["type"]  = AC_CONBATSTART;
        val["event"] = "";
      }
    }
    
  } else {
    // buff対象
    val["timeline"] = false;
  }
  
  if(this.startTime == null)  {
    // 開始前なのでスキップ
    val["event"] = EVENT_UNKNOWN;
    return val;
  }
  
  return val;
}


// ジョブの判別
Convert2FfxivPlugin.prototype.setJob = function(who, event) {
  if (event == "ファストブレード") {
    return "Paladin";
  } else if (event == "ヘヴィスウィング") {
    return "Warrior";
  } else if (event == "ハードスラッシュ") {
    return "DarkKnight";
  } else if (event == "キーンエッジ") {
    return "Gunbreaker";
  } else if (event == "リジェネ") {
    return "WhiteMage";
  } else if (event == "鼓舞激励の策") {
    return "Scholar";
  } else if (event == "アスペクト・ベネフィク") {
    return "Astrologian";
  } else if (event == "連撃") {
    return "Monk";
  } else if (event == "トゥルースラスト") {
    return "Dragoon";
  } else if (event == "双刃旋") {
    return "Ninja";
  } else if (event == "刃風") {
    return "Samurai";
  } else if (event == "ヘヴィショット") {
    return "Bard";
  } else if (event == "整備") {
    return "Machinist";
  } else if (event == "カスケード") {
    return "Dancer";
  } else if (event == "エノキアン") {
    return "BlackMage";
  } else if (event == "ミアズマバースト") {
    return "Summoner";
  } else if (event == "マナフィケーション") {
    return "RedMage";
  }
  
  return null;
}
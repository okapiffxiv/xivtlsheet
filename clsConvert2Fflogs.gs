var Convert2Fflogs = function(outputType, job) {
  // バトルログを取得
  var fightCode = dialogFflogs();
  if (!fightCode) return;
  var logCode = fightCode.replace(/(.*)\/?#fight=.*$/, "$1");
  var fId =　fightCode.replace(/.*fight=(.*?)(&|$)/, "$1");
  
  // 出力する対象
  this.outputType = outputType;
  
  // 出力するタイムライン
  this.tlType = OUTPUT_TIMELINE;
  if (booOutputTlSkill()) this.tlType = OUTPUT_SKILL;

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
  

  this.data2Parse(logCode, fId, job);
  
  return true;
}


// データをパース
Convert2Fflogs.prototype.data2Parse = function(logCode, fId, jobName) {
  // 開始時間、終了時間の抽出
  try {
    var response = UrlFetchApp.fetch(LOGS_HOST + "report/fights/" + logCode + "?api_key=" + LOGS_KEY);
    var responseCode = response.getResponseCode();
  } catch(e) {
    var responseCode = -1;
  }  
  
  if (responseCode != 200) {
    Browser.msgBox(ERR_NO_URL);
    return false;
  }
  
  
  var jsonFights = JSON.parse(response.getContentText());
  var fight = jsonFights["fights"][fId - 1];
  this.startTime = fight["start_time"];
  this.endTime   = fight["end_time"];
  
  // sourceIdの取得
  this.friendlies = this.getPartyData("friendlies", jsonFights);
  this.friendlyPets = this.getPartyData("friendlyPets", jsonFights);
  this.enemies = this.getPartyData("enemies", jsonFights);
  
  // ユーザの設定
  if (jobName == undefined) {
    this.userName = dialogJob(this.friendlies);
  } else {
    this.userName = getFriendryName(jobName, this.friendlies)
  }
  if (!this.userName) return false;
  
  // 出力クラス
  this.clsOutput = new clsOutput(this.outputType,　this.tlType, this.userName);

  
  var startTime = this.startTime;
  var endTime = this.endTime;

  var oValues = [];
  var oBuffs  = [];

  // シートをクリア
  if(booOutputToTL(this.outputType)) {
    deleteRows(this.sheetName);
  } else {
    clearBuffs(this.sheetName);
  }
  
  // 開始時間のセット
  oValues.push(getTlValue({"time": this.getTime(startTime), "type": AC_CONBATSTART}));


  // logを抽出
  while(startTime != undefined) {
    var response = UrlFetchApp.fetch(LOGS_HOST + "report/events/" + logCode + "?start=" + startTime + "&end=" + endTime + "&translate=true&api_key=" + LOGS_KEY);
    var jsonEvents = JSON.parse(response.getContentText());
    var events = jsonEvents["events"];
    startTime = jsonEvents["nextPageTimestamp"];

    if (jsonEvents["type"] == "death" && jsonEvents["targetIsFriendly"] == false) break;
    for (var idx in events) {
      var event = events[idx];
      
      if (event["type"] == "death" && event["targetIsFriendly"] == false) break;
      if (event["type"] == "death") continue;
      
      // AAは無視
      if (booAA(event["ability"]["name"])) continue;
      
      // dot,hotは無視
      if (event["tick"]) continue;
      
      var ability = event["ability"]["name"];
      if (ability == "" || booSkipDebuff(ability)) continue;
      
      var who  = "";
      var sourceId = event["sourceID"];
      if (event["sourceIsFriendly"]) {
        if (this.friendlies[sourceId]) who = this.friendlies[sourceId]["name"];
        if (who == "" && this.friendlyPets[sourceId]) who = this.friendlyPets[sourceId]["name"];
      } else {
        if (this.enemies[sourceId]) who = this.enemies[sourceId]["name"];
      }

      var whom = "";
      var targetId = event["targetID"];
      if (event["targetIsFriendly"]) {
        if (this.friendlies[targetId]) whom = this.friendlies[targetId]["name"];
        if (whom == "" && this.friendlyPets[targetId]) whom = this.friendlyPets[targetId]["name"];
      } else {
        if (this.enemies[targetId]) whom = this.enemies[targetId]["name"];
      }
      
      var type = this.getType(event);
      if (type == null) continue;
      
      
      var val = getTlValue({
        "time" : this.getTime(event["timestamp"]), 
        "type" : type,
        "who"  : who,
        "whom" : whom,
        "event": ability
      });
      
      if (event["ability"]["name"].match(/踏鳴/)) {
        Logger.log(event);
      }
      
            
      // 配列に追加
      if (this.tlType == OUTPUT_TIMELINE && !event["sourceIsFriendly"]) {
        if (val["type"] == AC_LOSE_EFFECT) continue;
        if (!this.clsOutput.booContinue(oValues, val)) oValues.push(val);
        
      } else {
        if (this.tlType == OUTPUT_SKILL) {
          if (!this.clsOutput.booContinue(oValues, val)) oValues.push(val);
        }
        if (this.outputType != OUTPUT_TIMELINE && this.outputType != OUTPUT_LOG) {
          if (this.clsOutput.outputBuffCol(val) != null) oBuffs.push(val);
        }
      }

    }
  }
  
  // 終了時間のセット
  oValues.push(getTlValue({"time": this.getTime(endTime), "type": AC_COMBATEND}));

  
  // シートに書き込み
  objSheet = SpreadsheetApp.getActive().getSheetByName(this.sheetName);
  this.outputOValue(objSheet, oValues);
  this.outputOBuff(objSheet, oBuffs);
}


// TIMELINE欄に出力
Convert2Fflogs.prototype.outputOValue = function(sheet, datas) {
  this.clsOutput.outputTimeline(sheet, datas);
}

// BUFF欄に出力
Convert2Fflogs.prototype.outputOBuff = function(sheet, datas) {
  var startRow = oStartRow;
  var oLastRow = datas.length;
  
  for(var rowNum=0;rowNum<oLastRow;rowNum++) { 
    startRow = this.clsOutput.outputallbuff(sheet, startRow, datas[rowNum]);
  }
}


Convert2Fflogs.prototype.getPartyData = function(key, json) {
  var values = json[key];
  var ids = {};
  
  for (var idx in values) {
    var value = values[idx];
    ids[value["id"]] = {"name": value["name"], "type": value["type"]};
  }

  return ids;
}

Convert2Fflogs.prototype.getType = function(event) {
  var type = event["type"];
  
  if (type == "begincast") {
    return AC_START_USING;
  } else if (event["target"]　!= undefined && event["target"]["name"] == "Environment") {
    return AC_AOE;
  } else if(type == "cast") {
    return AC_ACTION;
//  } else if(type == "heal") {
//    return AC_ACTION;
  } else if(type == "applybuff" || type == "applydebuff" || type == "applybuffstack") {
    return AC_EFFECT;
  } else if (type == "refreshbuff" || type == "refreshdebuff") {
    return AC_REFRESH;
  } else if(type == "removebuff" || type == "removedebuff") {
    return AC_LOSE_EFFECT;
  } else {
    return null;
  }
}

Convert2Fflogs.prototype.getTime = function(time) {
  var sec = Math.floor((time - this.startTime) / 1000);
  return sec2Time(sec);
}
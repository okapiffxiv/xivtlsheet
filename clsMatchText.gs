////////////////////////////////////////
// ACT用正規表現マッチテキストの生成
////////////////////////////////////////
function MatchText(text) {
  
  var regaxes = [
    [/^1B:[^:]+:[^:]+:([^:]+):([^:]+):([^:]+):.*$/g, "^1B:[^:]+:[^:]+:$1:$2:$3:"],
    [/^1A:[^:]+:(.*) gains the effect of (.*) from (.*) for .*$/g, "^1A:[^:]+:$1 gains the effect of $2 from $3 for"],
    [/^14:[^:]+:(.*) starts using (.*) on [^\.]+\.$/g, "^14:[^:]+:$1 starts using $2 on"],
    [/^(15|16):[^:]+:([^:]+):[^:]+:([^:]+):.*$/g, "^$1:[^:]+:$2:[^:]+:$3:"],
    [/^03:[^:]+:Added new combatant ([^:]+)\..*$/, "^03:[^:]+:Added new combatant $1\\."]
  ];

  var cnt = regaxes.length;
  for(var i = 0; i<cnt; i++) {
    text = text.replace(regaxes[i][0], regaxes[i][1]);
  }

  return text;
}

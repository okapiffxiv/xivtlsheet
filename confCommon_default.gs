//////////////////////////////////////////
//// 共通定義
//////////////////////////////////////////
//var VERSION = "2.6.1";
//var objSheet;
//var timezone = 'JST';
//var COL_OUTPUT_SKILL = "C2";
//var COL_API_KEY = "C3";
//
//// 出力カラム
//var oStartRow   = 2;
//var allStartRow = 5;
//var jStartRow   = 4;
//
//// 行を追加する秒数
//var OVERSEC = 3;
//
//// イベント
//var EVENT_UNKNOWN = "Unknown";
//
//// セルにターゲットを記入するスキル
//var SET_TARGET_SKILLS = [
//  "インターベンション",
//  "かばう",
//  "原初の猛り",
//  "ブラックナイト",
//  "オーロラ",
//  "ハート・オブ・ストーン",
//  "アポカタスタシス",
//  "ベネディクション",
//  "テトラグラマトン",
//  "ディヴァインベニゾン",
//  "生命活性法",
//  "ディグニティ",
//  "シナストリー［被］",
//  "フェイユニオン［被］",
//  "深謀遠慮の策",
//  "地神のミンネ",
//  "ベネフィラ",
//  "挑発",
//  "星天交差"
//];
//
//// シート名
//var SHEET_IMPORT   = "logs";
//var SHEET_TIMELINE = "timeline";
//var SHEET_LOG      = "viewlog";
//var SHEET_SETTING  = "設定";
//var SHEET_VERSION  = "バージョン";
//
//var VERSION_SHEET_ID = "";
//var TMP_SHEET_ID = "";
//var LOGS_KEY = "";
//var LOGS_HOST = "https://ja.fflogs.com:443/v1/";
//
//// DBシート名
//var DB_JOB = "db_jobs";
//var DB_ALLBUFF = "db_buff";
//
//// テンプレート名
//var TMP_ONLY = "temp(timeline only)";
//var TMP_BUFF = "temp(buff)";
//var TMP_BRD  = "temp(BRD)";
//var TMP_MNK  = "temp(MNK)";
//var TMP_DRG  = "temp(DRG)";
//var TMP_BLM  = "temp(BLM)";
//var TMP_SMN  = "temp(SMN)";
//var TMP_WAR  = "temp(WAR)";
//var TMP_PLD  = "temp(PLD)";
//var TMP_RAIDBUFF = "temp(raidbuff)";
//var TMP_VIEWLOG = "temp(log)";
//var TMP_CMP_BRD = "compare(BRD)";
//
//// 出力内容
//var OUTPUT_TIMELINE = "timeline";
//var OUTPUT_SKILL    = "skill";
//var OUTPUT_ALLBUFF  = "allbuff";
//var OUTPUT_RAIDBUFF = "raidbuff";
//var OUTPUT_BRDBUFF  = "brd";
//var OUTPUT_MCHBUFF  = "mch";
//var OUTPUT_MNKBUFF  = "mnk";
//var OUTPUT_DRGBUFF  = "drg";
//var OUTPUT_BLMBUFF  = "blm";
//var OUTPUT_SMNBUFF  = "smn";
//var OUTPUT_WARBUFF  = "war";
//var OUTPUT_PLDBUFF  = "pld";
//var OUTPUT_LOG      = "log";
//
//// アクションTYPE
//var AC_CONBATSTART = 0;
//var AC_COMBATEND = 1;
//var AC_DIALOG = 2;
//var AC_MARKER = 3;
//var AC_EFFECT = 4;
//var AC_LOSE_EFFECT = 5;
//var AC_START_USING = 6;
//var AC_ACTION = 7;
//var AC_WAIT = 8;
//var AC_AOE = 9;
//var AC_FAILED = 10;
//var AC_REFRESH = 11;
//var AC_POP = 12;
//
//// 横軸カラム数
//var CNT_TIMELINE_COL   = 4;
//var CNT_RAIDBUFF_COL   = 13;
//var CNT_BARRIER_COL    = 13;
//var CNT_BARRIERALL_COL = 3;
//var CNT_DOWN_COL       = 5;
//var CNT_WHM_COL        = 9;
//var CNT_AST_COL        = 8;
//var CNT_SCH_COL        = 10;
//
//var CNT_HWAR_COL = 11;
//var CNT_HPLD_COL = 13;
//var CNT_HDRK_COL = 9;
//var CNT_HGNB_COL = 10;
//var CNT_HMNK_COL = 2;
//var CNT_HDRG_COL = 2;
//var CNT_HNIN_COL = 2;
//var CNT_HSAM_COL = 2;
//var CNT_HBRD_COL = 3;
//var CNT_HMCH_COL = 2;
//var CNT_HDNC_COL = 4;
//var CNT_HBLM_COL = 1;
//var CNT_HSMN_COL = 1;
//var CNT_HRDM_COL = 1;
//var CNT_HWHM_COL = 13;
//var CNT_HAST_COL = 12;
//var CNT_HSCH_COL = 18;
//
//// エラー
//var ERR_OK = "処理完了";
//var ERR_NO_TEMP = "テンプレートシートがありません";
//var ERR_NO_LOGS = "logsシートがありません";
//var ERR_NO_SETTING = "未設定";
//var ERR_NO_URL = "データが存在しません";
//var ERR_LINK_GITHUB = "タイムラインシートのバージョン管理はgithubで行っています。\\n最新バージョンの確認、スプレットシートの入手は以下のURLへアクセスしてください\\n\\nhttps://github.com/okapiffxiv/xivtlsheet";
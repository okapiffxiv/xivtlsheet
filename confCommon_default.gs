//////////////////////////////////////////
//// 共通定義
//////////////////////////////////////////
//var objSheet;
//var timezone = 'JST';
//var COL_OUTPUT_SKILL = "C2";
//var COL_USER_NAME = "C3";
//// 出力カラム
//var oStartRow = 2;
//// 行を追加する秒数
//var OVERSEC = 3;
//// イベント
//var EVENT_UNKNOWN = "Unknown";
//
//// シート名
//var SHEET_IMPORT   = "logs";
//var SHEET_TIMELINE = "timeline";
//var SHEET_LOG      = "viewlog";
//var SHEET_SETTING  = "設定";
//
//var TMP_SHEET_ID = "";
//var LOGS_KEY = ""
//var LOGS_HOST = "https://ja.fflogs.com:443/v1/";
//
//// テンプレート名
//var TMP_ONLY = "temp(timeline only)";
//var TMP_BUFF = "temp(buff)";
//var TMP_BRD  = "temp(BRD)";
//var TMP_MNK  = "temp(MNK)";
//var TMP_DRG  = "temp(DRG)";
//var TMP_SMN  = "temp(SMN)";
//var TMP_WAR  = "temp(WAR)";
//var TMP_PLD  = "temp(PLD)";
//var TMP_RAIDBUFF = "temp(raidbuff)";
//var TMP_VIEWLOG = "temp(log)";
//
//// 出力内容
//var OUTPUT_TIMELINE = "timeline";
//var OUTPUT_SKILL    = "skill";
//var OUTPUT_ALLBUFF  = "allbuff";
//var OUTPUT_RAIDBUFF = "raidbuff";
//var OUTPUT_BRDBUFF  = "brd";
//var OUTPUT_MNKBUFF  = "mnk";
//var OUTPUT_DRGBUFF  = "drg";
//var OUTPUT_SMNBUFF  = "smn";
//var OUTPUT_WARBUFF  = "war";
//var OUTPUT_PLDBUFF  = "pld";
//var OUTPUT_LOG      = "log";
//
//var CNT_HWAR_COL = 10;
//var CNT_HPLD_COL = 13;
//var CNT_HDRK_COL = 7;
//var CNT_HMNK_COL = 2;
//var CNT_HDRG_COL = 2;
//var CNT_HNIN_COL = 2;
//var CNT_HSAM_COL = 2;
//var CNT_HBRD_COL = 4;
//var CNT_HBLM_COL = 2;
//var CNT_HSMN_COL = 2;
//var CNT_HRDM_COL = 2;
//var CNT_HWHM_COL = 9;
//var CNT_HAST_COL = 10;
//var CNT_HSCH_COL = 14;
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
//
//// 横軸カラム数
//var CNT_TIMELINE_COL   = 4;
//var CNT_RAIDBUFF_COL   = 11;
//var CNT_BARRIER_COL    = 13;
//var CNT_BARRIERALL_COL = 3;
//var CNT_DOWN_COL       = 5;
//var CNT_WHM_COL        = 9;
//var CNT_AST_COL        = 8;
//var CNT_SCH_COL        = 10;
//
//// エラー
//var ERR_OK = "処理完了";
//var ERR_NO_TEMP = "テンプレートシートがありません";
//var ERR_NO_LOGS = "logsシートがありません";
//var ERR_NO_SETTING = "未設定";
//
//// BRD定義
//var BRD_Menuett　= "メヌエット";
//var BRD_Ballade　= "バラード";
//var BRD_Pion   　= "パイオン";

////////////////////////////////////////
// シナジー出力セル定義
////////////////////////////////////////

function LB_OutputBuffCol(event, type) {
  if (['シールドウォール','ブレイバー','ビッグショット','スカイシャード','癒しの風'].indexOf(event) >= 0 && (type == AC_ACTION || type == AC_EFFECT || type == AC_LOSE_EFFECT)) {
    return 1;
  } else if (['ストロングホールド', 'ブレードダンス', 'デスペラード', 'プチメテオ', '大地の息吹'].indexOf(event) >= 0 && (type == AC_ACTION || type == AC_EFFECT || type == AC_LOSE_EFFECT)) {
    return 2;
  } else if([
    'ラストバスティオン', '原初の大地', 'ダークフォース', 'ソウルガンメタル',
    'ファイナルヘヴン', '蒼天のドラゴンダイブ', '月遁血祭', '生者必滅',
    'サジタリウスアロー', 'サテライトビーム', 'クリムゾンロータス',
    'メテオ', 'テラフレア', 'ヴァーミリオンスカージ',
    '生命の鼓動', 'エンジェルフェザー', '星天開門'].indexOf(event) >= 0 && (type == AC_ACTION || type == AC_EFFECT || type == AC_LOSE_EFFECT)) {
    return 3;
  }
  
  return 0;
}
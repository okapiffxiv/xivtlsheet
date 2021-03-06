# xivtlsheet
ACTのlog、FFLogsからFF14零式コンテンツ用のタイムラインのスプレッドシートを作成します　　
![タイムライン](https://i.imgur.com/Wpwljta.png)

### セットアップ
1. Googleアカウントにログイン
1. [ここをクリックして](https://docs.google.com/spreadsheets/d/1L8iDIn373U3rOGpw5KPLYQ3oE-U-BjJWxSTcbE4xbJE/copy)自分のGoogleアカウントのドライブにスプレットシートをコピー
1. 承認ダイアログが出てきたら許可をクリック（[参考記事](https://www.virment.com/step-allow-google-apps-script/)）

### アップデートの方法
今まで使っていたGoogleスプレッドシートを削除、または閲覧用とし、もう一度スプレットシートをコピーしてください  
昔のスプレットシートはレイアウトのズレなどで使えなくなる場合があります

### 使い方
#### ACTの場合
![使い方](https://i.imgur.com/xRyYtho.gif)
1. ACTの「Mainタブ＞該当ボスの戦闘ログ」を右クリック＞View Logsをクリック
1. 「Copy All」を選択し、コピーしたブックのシート「logs」に貼り付け(右クリック→貼り付け)
1. メニューの「タイムライン＞ACTのLogから作成」より出力したいデータを選択

#### FFLogsの場合
![使い方](https://i.imgur.com/wxDsYht.gif)
1. FFlogsの戦闘ログページを開く
1. URLのreports/の後「ランダムな文字#fight=数字」の部分をコピー
1. メニューの「タイムライン＞FFLogsから作成」より出力したいデータを選択。初めはWEB APIキーの設定を聞かれるのでキーを入力（[参考記事](https://upepep.blogspot.com/2019/01/hojoring-ultrascouter.html#chapter6)）
1. 出てきたダイアログにコピーしたテキストを貼り付けてOKをクリック

### 機能
- タイムライン表を作成
- タイムラインと各シナジーの発動時間をグラフで表示
- ~ジョブ別アクションとタイムラインをグラフで表示~ 召喚・黒のみ
- 対象ユーザのスキル回しを出力
- ACTのLogを見易い形式で表示

### 注意事項
- 前に貼ったデータを残したままLogを貼り付けて実行すると正しいデータが取得できないので、必ず一度削除すること	
  - 「Ctrl + A → delete」または「タイムライン＞logsシートをリセット」を押す
- 処理中にシートを弄ったり削除したりしないこと	
- メニューに「タイムライン」が出ない時	
  - Googleにログインしているか確認
  - ブラウザの更新ボタンを押してみる
- ジョブ被りがないことを前提に作られています	

---
layout: post
title: Ruby programmerがApp Engineを使ったら
date: '2011-12-23T19:51:00.002Z'
author: Suzuki MilanPaak
tags:
- Essays and Reports
modified_time: '2012-01-03T18:16:11.020Z'
thumbnail: https://lh6.googleusercontent.com/-5zNfY855Bd0/TvSipDuR6lI/AAAAAAAAAKU/25oQipjK3VU/s72-c/17939689502.jpg
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-4532545690566753240
blogger_orig_url: http://engineerflies.blogspot.com/2011/12/ruby-programmerapp-engine.html
---

 [![](https://lh6.googleusercontent.com/-5zNfY855Bd0/TvSipDuR6lI/AAAAAAAAAKU/25oQipjK3VU/s512/17939689502.jpg)](http://goo.gl/photos/z7hNd5ACh4)
ここ最近App Engineを使って今の企画のバックエンドを担当していました。Ruby programmer として感じたことをまとめてみます。  
  
  

# どういう企画？
地図とメールを使ったインタラクティブアドのアプリです。詳しくは今のところ内緒になっています。  
  

# Python
　Python初めて書きました。今までPython=indentしてるからきっとだれにでも読みやすくなってる　くらいの安易な認識しかなかった私。Rubyと一番違うと思ったのは必ず誰しもに必要とされるまで余分な実装しないというPythonの考え方。Rubyだと全てのクラスはObject型を継承してて、便利なirbでClass.public\_methods.grep /name\_of\_method/ すればリファレンス見ることもなく大体使いたい関数が見つかる　とか　Enumerableのeachとかmap, reduce, injectみたいな”おかげでfor を全然書いてないし一行で大体配列もハッシュも加工できる”みたいな便利なものはなくてlambdaを使って自分で書いたりするほうが一般的ぽい　といった基本ライブラリの考え方の違い。  
  
　文法だと定数が無いとか（やりたかったらシングルトンでやらないといけない　http://code.activestate.com/recipes/65207-constants-in-python/?in=user-97991）、switch 句が無いとか、Rubyは実行したファイル中でrequire, loadしていくと共有の名前空間のハイラルキーに追記していくけどPythonはファイルごとで都度 import, reloadした空間が有効になってるとか（多分一ヶ所でまとめてimportすればRubyと同じような動きを真似できると思う）とか　時々書いてて違いに気づかなくてアレ？てなったことはあった。文法戦争にあんまり興味いのでMatter of tasteだしMatter of type of app youre currently developingだと思う人なんですが、個人的には何でも揃ってるファジーさと直感的で自然言語で右脳的にドリブンして書けるRubyのあの感じが好きだからやっぱり簡単には他の言語に切り替えられない。ただ、RubyというよりはRails界隈の考え方は、少なくともver 2.2.xくらいまでは、運用時の論理というよりかはアプリの書き手の論理が先行する感じがあったのでPythonの足の軽さには考えさせられるものがありました。  
  

## Thread
　最初メールのバルクを配信するのに、エラー率をシングルトンで持っておいて各Threadで常にそれを監視するようなモデルに使用しようと思ってたけど、メールの一括配信はやらないことになったので一個のバルクがすごく小さいので結局使わなかったな。代わりに負荷テストで複数人が同時アクセスするのをエミュレートするのに使用した。以下ほぼ [App Engineのサンプルコード](http://code.google.com/appengine/articles/load_test.html)から抜粋。最初、Thread proccess中で定義したerror\_respsがどこを参照してるか分からなかった。しょうがないんで global error\_respsとglobalにすることで参照できるようになったた。 

    

  
error\_resps = 0  
  
def threadproc():  
 """This function is executed by each thread."""  
 h = httplib2.Http()  
  
 while not quitevent.is\_set():  
 try:  
 # HTTP requests to exercise the server go here  
 # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
 resp, content = h.request(random\_url())  
 if resp.status != 200:  
 error\_resps += 1 # Got an error something like undefined/uninitialised variable, error\_resps  
 # !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!  
  
if \_\_name\_\_ == "\_\_main\_\_":  
 try:  
 for i in range(NUM\_THREADS):  
 # Create an instance of a thread with the method above  
 t = Thread(target=threadproc)  
 t.start()  
 threads.append(t)  
   
  

# App Engineの機能
　使う前までApp EngineてVPSくらいに何でもセットアップして使うんだろうと思ってた（スゴイ）。だからなんでもpipのライブラリ使える分けじゃないと知ったときは残念だったけど、後でなんでもそろってると知って嬉しかった。大半のWeb開発で使うライブラリなんて大体決まってる。でも多分どうしても使いたいものはpackageして自分のプロジェクトに配置してそこからimportする方法がきっとあるんじゃないかな。一部socket通信を行うライブラリなどはセキュリティの理由から使用できないようだった。  
  
  

## webapps2
　今回フレームワークとしてwebapps2を採用しました。Djangoをよく知らないので比較できないけどSinatraみたいなRequest Handlerの書き方をします。一つのurlに対して一個のURLが割り当てられてget やpostを定義します。  
  
　ディレクトリ構成はMVCパターンを採用しました。webappsはどのようにでも自由に組めるようになっていましたがConvention over configurationの世界に慣れているのでURLがAPPENGINE\_ROOT/emailsだったらModelはEmail、ControllerはEmailsController、Viewはemailsというように自ら制約を設けて組みました。Modelはdatastoreのentity（RDBでいうところのtable）を扱い、ControllerはRequestを扱うHandlerです。Viewはjinja2というtemplate engineを使いました。  
  
  

## Task Queues
　重い処理を投げておくと後で実行しておいてくれるQueueです。メールを投げる処理がエラーを投げるだけじゃなくてメールドメインごとのエラー率を取るとか、一秒の送信数を調整できる様にしてたりとか、携帯には深夜送らないとか、エラー率上がってたらリトライとか　その他いろいろやってるのでリクエストを返すのを早めるために、そういった処理もろもろを後でやっといてよとQueueにpushしています。Rubyの時はRedisを使ったresqueというRubygemを使っていたのが使い道が似てるかな  
  

## Scheduled Tasks
　一般的に言うところのCron jobです。cron.yamlに実行したいタスクを処理するurlを書くだけ。 [http://code.google.com/appengine/docs/python/config/cron.html](http://code.google.com/appengine/docs/python/config/cron.html)　urlはapp.yamlのroutingの定義でlogin: admin とすれば管理者とcronのprocessだけが実行できるようになる。なんでもweb appにしてしまうのはweb app感覚でそのままコーディングすればいいわけだからよく考えたらスマートだなあ。cronで loginじゃなくてsuだけしてると.bashrcが読まれてないとかchrootが何とかとかいろいろ気にしないでいいじゃん。  
  

## Backends
　変わって、今度はもっと重い処理をやってくれるBackendsです。Task queueもScheduled Tasksも３０秒くらいで処理を終わらせないといけないとかいろいろ制限があってそれないは収まらない長く重い処理を担当してくれる。メール受信者一覧のCSVをあらかじめ生成するのに使おうと思っていたけれどCSV生成に１６秒くらいしかかからなさそうだったので結局使ってない。スペックの良いBackends実行専用のinstanceが割り当てられるので、そこに処理を移譲すればいいとかいうふうになってたと思う。 [詳しくはWebで](http://code.google.com/appengine/docs/python/backends/)  
  

## Data store
　おはずかしながら今まで私はK/V storeをメインのDBとしては使ったことがなかった。今回も残念ながら日程がタイトだったため一番勉強しないといけないここが勉強できなかったのでなんだかよくわからないままになってしまった。テストの項でも書くけれど、AWSなんかでapplication serverをいくらload balancingしていてもRDBのreplicationがボトルネックになってスケールアウトしない、結局cachingをK/V storeにやらせるとか、そのへんがgoogleのbig tableを使ってのるとは違いがでてきてしまうんではないかなと思った。  
  

## Mail
　メール送信機能です。開発に使用中のライブラリの不具合は付き物です。もちろんメール送信は今回メインでしようする機能だったんですが送信メールのEnvelope FromがFrom宛になっておらずバウンスメールがロストするという不具合に遭遇してしまいメールのエラー率を取れなかった。そのため急遽自作でSMTPでログインしてsmtp.google.com経由でメール送信する外部（Rails）にRestful APIを作成した。ところがその外部APIに負荷テストをかけて一日何通送れるか試していたところSMTPで一日に送れる数というのが１０００通までだけということが分かった。要件は一日５、６万通だった。  
  
　以前 Amazon SESの1秒間や一日の送信制限どおりにrequestするライブラリを自分で書いていたのでそれを使ったら確実にメールを相手のinboxまで届けられるしSPF KDIMも一度やったから大丈夫と思ってた。ところが、初日に１０００通、１０日かけて1万通裁けるようになるとのこと。これでは要件をクリアできない。  
  
　そこで今度は自分でSMTPを立てることにしたんだけれど、最初はqmail使ってみたくてやってみたらqmailと互換性がなくRailsのActionmailerからのSMTPプロトコルでの会話が全然成立してない。それで今度はPostfixにした。Postfixの認証をしないように設定していたんだけど、ActionmailerがEHLOして認証が必要ないのを確認していないみたいで/var/log/mail.log見るとどうもAUTHに失敗してるみたい。あーついてないとか思いながら睡眠不足を跳ね返してログをみながらRubyのコードを書き換えるという土臭い作業を繰り替えした。結局Actionmailer::Baseの設定に数あるうちのオプションのうち:passとか一定のオプションを与えると無条件で認証しようとするらしかったことが判明。どうにか自SMTPサーバでも負荷テストをやって1万７千件一時間で送れることを確認。今回これが一番苦労したかもしれないなー  
  
うーん、あとで設定のノートでも書きたいなあ。   
  

# Quota
　その名も直訳して割り当て。App Engine利用者の利用制限です。APIの使用回数とか、Taskの容量とか..エトセトラなんだか予期せぬところにあるので一体どれくらいPV稼いだらいくらになるんだろうとかがわからなくて怖かった。Google側の資産利用コストがもちろん基準になっているとおもうんだけど、利用者の理論と乖離があるのでなんとかなったらなあと思うところ。だいたいどういう使い方したらいくらいくらですみたいなことを案内しているページとかがきっとありそう。VPS的に自分で上限をつけておけるパッケージとか、最初の超過は警告段階で課金されないとかあったらいいなあ。  
  
  

# Load Test
　これはすごかった。まだ何もプログラム書いてない段階でちゃんとスケールアウトするかなあとか心配してたんだけど、実際作り終わってみてテストしてみたらdatastoreへのqueryも何のそので、自分の書いたアプリがものすごく簡単だっただけに途中から自分のアプリを負荷試験しているというよりはApp Engineを試験してるみたいな申し訳ない気持ちでいっぱいになった。  
 [![](https://lh4.googleusercontent.com/-QSyofoEkprs/TvTQT9hcG1I/AAAAAAAAAKc/Tuqaa-q3MRw/s512/17942529279.jpg)](http://goo.gl/photos/aBj13LlQ42) QPSをこんなにあげてるのにResponseは0.6から0.7秒で推移した。通常時とほとんど変わらない。   
  

# まとめ
　そんなこんなで一プログラマがプログラミングだけほぼに集中できる環境、そしてGoogleの技術を借りてスケールできる環境が手に入ってしまうのはすごい。と今更ながら感動した。そしてまた端からGoogleのユーザを取り入れられるのも大きな利点。大量のデータを高速に扱うようなアプリ構築に向いていそう。
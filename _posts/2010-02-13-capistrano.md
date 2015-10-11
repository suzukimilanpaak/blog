---
layout: post
title: capistranoでフリーズ
date: '2010-02-13T22:33:00.004Z'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2010-02-14T02:10:27.354Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-1558492319177052832
blogger_orig_url: http://engineerflies.blogspot.com/2010/02/capistrano.html
---

新しい環境を構築中にcapistranoの設定ではまったのでメモ。  
  
capistranoが止まる件はいくつか種類がある様ですが、私の場合はsubversionが対話式にパスワードを要求してきて処理が止まったのが原因。  
  
- subversion+apache  
- capistrano (2.5.14)  
- rails (2.3.5)  
  
という環境でsubversionから最新を引いて実行環境にアップロードしようとしたが失敗。

    $ cap deploy:update -v **transaction: startAuthentication realm: administratorsUsername: adminPassword for 'admin': Password: #=>ここでsvn用のpasswordの入力を求められる。#入力すると以下が表示される** [sanfrancisco :: out] Authentication realm: administrators ** Username:#=> Username: の一行したの行でフリーズしてしまう。入力を受け付けない

パスワードを一度入力してるのにまた入力を要求するところがよく分からない。  
  
とりあえずrakeでトレースしながら実行すれば何か分かるかなと思ってやってみる  

    $ rake remote:setup --tracerake aborted!Don't know how to build task 'remote:setup'

あれ？remote:setupは廃止されたかな。。。  
  
 [capistranoの導入ドキュメント](http://www.capify.org/index.php/Getting_Started)にcap shellで一行ずつ実行する方法が載ってたのを思い出す。まずcapにオプション-d (--debug)を渡して、投げられてるコマンドを確認  
  

    $ cap deploy:update -dv :Preparing to execute command: "svn checkout -q --username admin --password --no-auth-cache -r1 http://svn.sanfrancisco/yourfav /var/www/yourfav/releases/20100213222102 && (echo 1 > /var/www/yourfav/releases/20100213222102/REVISION)":

どうもsvnの--passwordオプションにパスワードそのものが定義されてないから要求されてそこで処理が止まってるんじゃないかな。ということで  
  

    $ cap shellcap> svn checkout -q --username admin --password passadmin --no-auth-cache -r1 http://svn.sanfrancisco/yourfav /var/www/yourfav/releases/20100213213845 && (echo 1 > /var/www/yourfav/releases/20100213213845/REVISION)[establishing connection(s) to sanfrancisco]Password: cap> #次の行へ行った。てことは動いた？

パスワードを定義しないで実行すると、cap deploy:updateから実行した時と同じく止まりますが、今回は止まることなく次の行へ行きました。  
  
そこでRAILS\_HOME/config/deploy.rbに勘で以下のステップを追加したところうまく動作しました。  
set :scm\_password, "password\_for\_SCM"  
  
  
誰かの役に立ちますように
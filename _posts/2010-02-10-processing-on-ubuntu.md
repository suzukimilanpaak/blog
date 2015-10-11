---
layout: post
title: Processing on Ubuntu
date: '2010-02-10T23:03:00.003Z'
author: Suzuki MilanPaak
tags:
- Processing
modified_time: '2010-02-13T22:43:57.888Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-3846104398021200923
blogger_orig_url: http://engineerflies.blogspot.com/2010/02/processing-on-ubuntu.html
---

手持ちのラップトップSamsung nc10のOSをwin XPからubuntuに入れ替えたのでProcessingの環境を再構築。  
  
- processingのインストール  
- よく使うライブラリのインストール  
- JMyron  
  
当方のOSはubuntu 9.10 karmic

    $ cat /etc/lsb-release DISTRIB_ID=UbuntuDISTRIB_RELEASE=9.10DISTRIB_CODENAME=karmicDISTRIB_DESCRIPTION="Ubuntu 9.10"

  

# processingのダウンロード、インストール
  
 [本家のダウンロードページ](http://processing.org/download/)に常に最新版のダウンロードリンクがあります。リンクアドレスをコピーしてください。  

    $ wget http://processing.org/download/processing-1.0.9.tgz$ tar xvzf processing-1.0.9.tgz$ sudo mv processing-1.0.9 /opt/processing-1.0.9

これだけです。  
  
JREはprocessing直下のjavaフォルダに入ってるみたいなので別途インストール必要無いみたいです。  
  
早速起動してみましょう  
$ /opt/processing-1.0.9/processing  
  
動作確認はFile->Examples以下のサンプルから。  
  
  

# JMyronのインストール
  
JMyronのインストールも [本家から最新を取得。](http://webcamxtra.sourceforge.net/download.shtml)ここからはGUIで操作します。解答すると、HowtoInstall.txtというファイルがあるのでそれにしたがいます。  
- Jmyronフォルダは先ほど配置したprocessingのホームディレクトリのしたのlibrariesディレクトリに移動  
- Jmyron Examplesはprocessingのexamplesディレクトリに移動  
  
librariesディレクトリは名前のとおりライブラリ群が配置されたディレクトリ。processingが参照パスが通ってます。先ほど動作確認を行ったとおりProcessingのメニューからexamplesディレクトリ以下のサンプルが参照可能です。私の場合メニューがExample>>JMyron Examlesとなるのが何だか気になってでディレクトリ名をJMyronに変更してます。  
  
processingを再起動してFile->Examples->JMyron以下のサンプルを実行しようとするとJMyronをnewするステップで落ちます。soとそれにあわせたjarを配布しているページが [こちら](http://piratestudios.com/v4ljmyron/)に有ります。ありがたいですね。日付リンクから最新版を取得します。  
  
READMEにはJMyron.jarをprocessing/java/libにlibJMyron.soをprocessing/java/lib/i386に配置するように書いてありますが、両方共processing/libraries/JMyron/libraryに配置すれば動作します。 - パスが通っているみたいなので。  
  
  
  
っと、ここまでやってprocessing.video.\*が動かないことが判明。”Linux 向けの Processing には processing.video 自体が入ってない。”いやあほんとQuickTimeとか爆発してほしいですな。同感   
ビデオの操作がしたい方はこちらを参考にしてください。 [Processing video on Linux](http://techno-st.net/2009/11/05/processing-video-on-linux-1.html)
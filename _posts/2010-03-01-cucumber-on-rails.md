---
layout: post
title: Cucumber入門(3) 一番最初のCucumber on Rails
date: '2010-03-01T23:51:00.004Z'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2010-06-09T19:32:05.679+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7189496765273396796
blogger_orig_url: http://engineerflies.blogspot.com/2010/02/cucumber-on-rails.html
---

Cucmberはセットアップの時点でいろいろと選択肢があるようです。まずは使ってみましょう。構成の選択肢については [前回の記事](http://engineerflies.blogspot.com/2010/02/cucumber_26.html)を参考にしてください。

# Cucumberのインストール
  
今回選択した環境は Cucumber + Capybara + Culerity + Rspec + Spork です。さっそくセットアップしていきましょう。  
  

    #gemのインストールsudo gem install cucumber cucumber-rails celerity# Culerityで使用するjrubyのインストールsudo apt-get install jruby # JrubyのgemsにCelerityを追加sudo /usr/lib/jruby1.2/bin/gem install celerity

  
  
  

# サンプルプロジェクトの作成
  
RSSのFeedを登録するだけのアプリケーションを作ってみます。  
本編と関係ありませんが、rails projectの名前にsampleという接頭辞をつけておくと大変便利です。新しく機能を導入する際に一回使いきりのプロジェクトを用意して思い切り遊べるようにできるからです。いらなくなったらプロジェクトはrm sample\* -rで、DBはdrop database samplexxxx\_test; で削除すれば良いので間違いが少なくて済みます。  

    $ rails -d mysql samplecucmber$ ruby script/generate rspec_scaffold feed url:string:create db/migratecreate db/migrate/20100228205558_create_feeds.rbroute map.resources :feeds$ rake db:migrate

  
  
  

# rails環境のセットアップ
  
まずは--capybara, --rspecオプションだけをつけた状態で実行します。  

    $ ruby script/generate cucumber --capybara --rspec#設定ファイル。出力先としてreturn.txtが設定されています。create config/cucumber.yml #同じく設定ファイルですがCucumber実行時のRails環境の動作と必要なconfig.gemを指定していますcreate config/environments/cucumber.rb create script/cucumber #cucumber本体の呼び出しスクリプトcreate features/step_definitionscreate features/step_definitions/web_steps.rbcreate features/supportcreate features/support/env.rb#ここにGherkinで書かれたページ名をURLにマップを設定します。create features/support/paths.rb create lib/tasks#Cucumber関係のrakeタスクを定義create lib/tasks/cucumber.rake

  
太字は [一番最初のcucumber](http://engineerflies.blogspot.com/2010/02/cucumber_23.html)で扱ったプレーンなCucumber環境と比べて増えたファイルです。  
  
次に--sporkオプションをつけてsporkの設定に必要なファイルを見てみましょう。  

    $ ruby script/generate cucumber --spork --forceoverwrite config/cucumber.yml? (enter "h" for help) [Ynaqdh] Y#DRbが出力に追加されましたforce config/cucumber.yml overwrite config/environments/cucumber.rb? (enter "h" for help) [Ynaqdh] Y#config.gemsporkが追加されましたforce config/environments/cucumber.rb identical script/cucumberexists features/step_definitionsidentical features/step_definitions/web_steps.rbexists features/supportoverwrite features/support/env.rb? (enter "h" for help) [Ynaqdh] Y #require 'spork'が追加されました。requireの記述がSpork.preforkブロックに囲まれました。 force features/support/env.rb identical features/support/paths.rbexists lib/tasksidentical lib/tasks/cucumber.rake

  
  
  
  
次にプロジェクト依存のgemのバージョンをインストールします。この方法で別途gemをインストールするのはgemのバージョンとプロジェクトをそろえて何かの時(人にコードを渡した、しばらくぶりにプロジェクトが再開された)場合にテストを止めないようにするための工夫ではないかと思います。RAILS＿ROOT/config/envioronments/cucumber.rbに以下のような記述がありました。どうもここから必要なgemをインストールしている様です。  
参考 [Ruby on Rails Tips - rake gems:install](http://labs.agenda-style.jp/blog/2009/12/ruby-on-rails-tips---rake-gemsinstall--.html)  
  

    #当環境のバージョンは以下のとおり。#cucumber (0.6.2)#cucumber-rails (0.2.4)config.gem 'cucumber-rails', :lib => false, :version => '>=0.2.4' unless File.directory?(File.join(Rails.root, 'vendor/plugins/cucumber-rails'))config.gem 'database_cleaner', :lib => false, :version => '>=0.4.3' unless File.directory?(File.join(Rails.root, 'vendor/plugins/database_cleaner'))config.gem 'capybara', :lib => false, :version => '>=0.3.0' unless File.directory?(File.join(Rails.root, 'vendor/plugins/capybara'))config.gem 'rspec', :lib => false, :version => '>=1.3.0' unless File.directory?(File.join(Rails.root, 'vendor/plugins/rspec'))config.gem 'rspec-rails', :lib => false, :version => '>=1.3.2' unless File.directory?(File.join(Rails.root, 'vendor/plugins/rspec-rails'))config.gem 'spork', :lib => false, :version => '>=0.7.5' unless File.directory?(File.join(Rails.root, 'vendor/plugins/spork'))

  
  
プロジェクト依存のgemをインストールします。  

    #先に必要なライブラリをインストールsudo aptitude install libxslt1-dev libxml2-devRAILS_ENV=cucumber rake gems:install

  
このステップでcapybaraがインストールされるはずです。同時に多くの依存するgemがインストールされるので、gemが依存するライブラリがインストールされていない場合はメッセージを出力してcapybaraのインストールが失敗します。該当ライブラリをインストールしてください。  
  
  

# Cucumberを使ったBDD
  
featureの作成  
  

    #feature 'controllerの名前' :オブジェクト変数(script/generate scaffold で指定するのと一緒)$ ruby script/generate feature feed url:stringexists features/step_definitionscreate features/manage_feeds.featurecreate features/step_definitions/feeds_steps.rb

  
  
  
それでは試験を開始します。  

    #sporkサーバを立ち上げます。$ ~/.gem/ruby/1.8/bin/spork cuc#drbを設定$ rake cucumber --drb#試験実行$ rake cucumber(in /home/suzukimilanpaak/workspace/ror/samplecucumber)/opt/ruby-enterprise-1.8.7/bin/ruby -I "/opt/ruby-enterprise-1.8.7/lib/ruby/gems/1.8/gems/cucumber-0.6.2/lib:lib" "/opt/ruby-enterprise-1.8.7/lib/ruby/gems/1.8/gems/cucumber-0.6.2/bin/cucumber" --profile defaultUsing the default profile...Disabling profiles...Feature: Manage feedsIn order to [goal][stakeholder]wants [behaviour]# Rails generates Delete links that use Javascript to pop up a confirmation# dialog and then do a HTTP POST request (emulated DELETE request).## Capybara must use Culerity or Selenium2 (webdriver) when pages rely on# Javascript events. Only Culerity supports confirmation dialogs.## cucumber-rails will turn off transactions for scenarios tagged with# @selenium, @culerity, @javascript or @no-txn and clean the database with# DatabaseCleaner after the scenario has finished. This is to prevent data# from leaking into the next scenario.## Culerity has some performance overhead, and there are two alternatives to using# Culerity:## a) You can remove the @culerity tag and run everything in-process, but then you# also have to modify your views to use button instead: http://github.com/jnicklas/capybara/issues#issue/12## b) Replace the @culerity tag with @emulate_rails_javascript. This will detect# the onclick javascript and emulate its behaviour without a real Javascript# interpreter.#@culerityScenario: Delete feed # features/manage_feeds.feature:34Given the following feeds: # features/step_definitions/feed_steps.rb:1| url || url 1 || url 2 || url 3 || url 4 |http://www.example.com/feedsWhen I delete the 3rd feed # features/step_definitions/feed_steps.rb:5Then I should see the following feeds: # features/step_definitions/feed_steps.rb:13| Url || url 1 || url 2 || url 4 |1 scenario (1 passed)3 steps (3 passed)0m14.669s

  
どうでしょううまく通りましたでしょうか？実行エラーはSporkサーバのプロセスの方に吐き出されますので注意してください。これはテストコードがテストを実行しているインタプリタではなくSporkサーバに移譲されているためです。  
  
  

# テストの解説
  
テストの内容について少し解説します。features/manage\_feeds.featureを覗いてみましょう。  
  
このファイルはrake script/generate featureによって自動作成されました。"５つのurlが与えられていて、url='3'のレコードを削除したとき、その他のレコードが残っている"というシナリオです。  
  
Givenのステップで| Url x |として与えられている値はfeatures/feed\_steps.rbに配列として渡されレコードがインサートされます。  

    Given /^the following feeds:$/ do |feeds|Feed.create!(feeds.hashes)end

  
  
Then句でも||内の値は同様に配列として渡され、htmlの出力結果と異なることを試験します。  

    Then /^I should see the following feeds:$/ do |expected_feeds_table|expected_feeds_table.diff!(tableish('table tr', 'td,th'))end

  
  
  
さあ、これで一応cucumberが動くようになりました。GherkinやWhen-Then-Givenの書き方、ヘルパーメソッドなどに集中できる環境が整いました。次回以降また触れたいと思います。  
  
.
---
layout: post
title: script/consoleでhelper, routing
date: '2012-04-08T04:45:00.000+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2012-04-09T07:35:34.482+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-8298324680507938005
blogger_orig_url: http://engineerflies.blogspot.com/2010/08/scriptconsolehelper-routing.html
---

- 下記に追記  
いつのバージョンからか(少なくとも2.3.14からは)名前付きルートはscript/consoleを立ち上げた時点でlink\_to はhelperというActionView::Baseのインスタンスからアクセスできて、ダイナミックルートはappというActionController::Integration::Sessionのインスタンスからアクセスできるようになっていました。  
  
 [http://blog.p.latyp.us/2008/03/calling-helpers-in-rails-console.html](http://blog.p.latyp.us/2008/03/calling-helpers-in-rails-console.html)  
  
  
--------------------------------  
- コンソールで名前付きルート  
 [Testing Named Routes in the Rails Console](http://stuartsierra.com/2008/01/08/testing-named-routes-in-the-rails-console)からまんま拝借。

    include ActionController::UrlWriter default_url_options[:host] = 'whatever'

  
  
default\_url\_optionsは名前のとおり、/parent\_controller/:host/child\_controller/:idといった定義に対して以下の用にコンソールで名前付きパスのデフォルトのオプションを指定してくれる。  
action\_controller\_path(:id => 23)  
=> "/parent\_controller/watever/child\_controller/23"  
belong\_toなんかでリソースがネストしてる時に便利。  
  
rs = ActionController::Routing::Routes  
rs.recognize\_path action\_controller\_path(:id => 23), :method => 'GET'  
とかで、params => {:host => 'whatever', :id => '23'}とかがパラメータとして渡ってくるはず。試してない。  
  
  
- Helperをコンソールで  

    include HelperYouWantToRun #使いたいhelperをincludeする。 helper.method_you_want_to_run


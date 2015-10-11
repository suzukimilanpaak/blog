---
layout: post
title: 'lightwindowのHTMLを:js => trueなexampleで試験するのはwithin_frameが良いけどissues #365に遭遇した'
date: '2012-12-25T03:23:00.000Z'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2012-12-25T03:23:41.567Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7498389159546171629
blogger_orig_url: http://engineerflies.blogspot.com/2012/12/lightwindowhtmljs-trueexamplewithinfram.html
---

Integration testを書いていたらlight windowの中にIframeでレンダリングされるHTML pageがあって、testにはCapybaraのwithin\_frameが良いことを発見した。within\_frameはSeleniumにも [Webkit](http://www.rubydoc.info/gems/capybara-webkit/0.12.1/Capybara/Driver/Webkit#within_frame-instance_method)にもある。  
  
ただし、lightwindowに親のURLを変えるようなjavascriptがありこの [issue #365](https://github.com/thoughtbot/capybara-webkit/issues/365)に遭遇してしまった。  
  
そもそもAjaxでリクエストした結果をIframeに描写するという実装は複雑すぎるしあんまりテストフレンドリーじゃないからやめたい。ということで結局は実装を変えることにした


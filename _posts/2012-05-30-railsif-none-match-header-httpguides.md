---
layout: post
title: 
date: '2012-05-30T14:54:00.002+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2012-05-30T14:58:02.254+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-2435368128232634934
blogger_orig_url: http://engineerflies.blogspot.com/2012/05/railsif-none-match-header-httpguides.html
---

最近なんかマイクロブログみたいになってるけど。。  
RailsがIf-None-Match headerを公式にサポートしているのを発見。実際に使われているプロジェクトに出会ったことはない。  
  
 [Rails Guide: Conditional GET support](http://guides.rubyonrails.org/caching_with_rails.html#conditional-get-support)  
  
Ajax requestなんかでresponseが空だった場合は画面に対して何もしない。キャッシュも返さないからサーバ側の負担を軽減する。とかいうのが使いどころなのかな。  
  
 [If\_None\_Match headerについての解説記事](http://odino.org/don-t-rape-http-if-none-match-the-412-http-status-code/)  
If-None-Matchに仕込んであるEtagが更新されテイルかチェックするためには [ActionController#stale?](http://apidock.com/rails/ActionController/ConditionalGet/stale%3F)を使う


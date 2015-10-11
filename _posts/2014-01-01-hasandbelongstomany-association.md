---
layout: post
title: has_and_belongs_to_many associationで counter_cacheを有効にする
date: '2014-01-01T04:21:00.001Z'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2014-01-01T04:21:23.470Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7236712443752184579
blogger_orig_url: http://engineerflies.blogspot.com/2014/01/hasandbelongstomany-association.html
---

has\_and\_belongs\_to\_many associationで counter\_cacheを有効にするサンプル。  
  
以下は Category has\_and\_belongs\_to\_many Website な関係が成立しています。HABTMでcounter\_cacheを実施するには has\_and\_belongs\_to\_manyに:after\_add, :after\_removeなどのオプションを渡してフックするメソッドをしてあげれば良いです。  
  
そうすることで website.categries = [category\_foo, category\_bar] としたときに以前のcategoriesとの差分についてcounter\_cacheをincrement/decrementしてくれる。  
  
Website自身のフック :after\_save, :after\_create, :after\_destroyは関連を更新したときにはトリガーされないです。  
  
\*. #make!はmachinistからデータを作成しています  
<script src="https://gist.github.com/suzukimilanpaak/8204980.js"></script>


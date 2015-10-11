---
layout: post
title: empty?  nil? blank?とtrue false
date: '2010-06-18T00:37:00.002+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2010-06-18T00:50:45.763+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7657702773564452435
blogger_orig_url: http://engineerflies.blogspot.com/2010/06/empty-nil-blanktrue-false.html
---

Railsをやってると誰しもがありがたいと思うblank?。  
- 他のempty?とnil?との使い分けは？  
- ときどき、true, falseの条件とごっちゃになるし整理してみよう

## empty? nil? blank?の違い
  

    # blank?はActivesupportのObjectクラスのメソッド# p "".blank? #=> undefined method `blank?' for "":Stringrequire 'rubygems'require 'active_support'p ["", [], {}, nil, 0].collect{|v| v.nil?} #=>[false, false, false, true, false]p ["", [], {}, "\n", "\t"].collect{|v| v.empty?} #=>[true, true, true, false, false]# p 0.empty? #=> undefined method `empty?' for 0:Fixnum# p nil.empty? #=> undefined method `empty?' for nil:NilClassp ["", [], {}, nil, 0, "\n", "\t"].collect{|v| v.blank?} #=>[true, true, true, true, false, true, true]

  
  
- nil?  
　nilを判定するのにしか使えません  
  
- empty?  
　変数の初期値を判定するのに使える様です。"", [], {}はそれぞれString.new, Array.new, Hash.newと同じ値になります。Fixnum, NilClassにはnew methodはありません。  
  
- blank?  
　nilかempty?である場合を判定する場合に使えそうです。試してみた感じFixnumは常にfalseの様です。  
blank?の定義って  

    def blank? self.nil? or self.empty?end

かと思ってましたが、そういうわけでもないんですね。  
  
  
実際のところはこんな感じ  

    # File activesupport/lib/active_support/core_ext/object/blank.rb, line 12 def blank? respond_to?(:empty?) ? empty? : !self end

respond\_to?はRubyのObjectクラスのメソッドで、 [引数に取ったメソッドが応答するかどうか調べてくれる](http://apidock.com/ruby/Object/respond_to%3F)らしい。（ってつまりメソッドの存在チェック。）  
  
  
例えば、  

    [].instance_eval{ respond_to?(:blank?) } #=> false[].blank? #=> undefined method `blank?' for []:Array

  
って余計に説明わかりづらくした。すいません。  
  
  
話を戻すと、blank?はempty?がある場合はそれを使って判定。そうじゃない場合はRubyの標準の判定の逆を返す。（ここの仕組みが僕はよく分かっていません。例えば if instance\_of\_objectとしたときどこで判定されるのか見つけられない。きっとライブラリでなく構文解析をやってるところに書いてあるかな）  
respond\_to?(:empty?) ? empty? : !self  
  
  
  
  

## 何がTrue, Falseと判定されるか？
  
さてTrue, Flseの方はと言いますと、  

    >> ["", [], {}, nil, 0, "\n", "\t"].collect{|v| if v then true; else false; end}=> [true, true, true, false, true, true, true]

  
**nil** だけがfalseと判定されます。  
  
.
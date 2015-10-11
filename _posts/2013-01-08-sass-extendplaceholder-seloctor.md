---
layout: post
title: "[Sass] @extendの覚えておくべき動作とplaceholder seloctorの使い道"
date: '2013-01-08T16:01:00.001Z'
author: Suzuki MilanPaak
tags:
- Sass
- Ruby/ Ruby on Rails
modified_time: '2013-01-08T16:09:18.853Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7070521224594752265
blogger_orig_url: http://engineerflies.blogspot.com/2013/01/sass-extendplaceholder-seloctor.html
---

以前から疑問に思っていたSassのplaceholder selectorの使い道がひとつ見つかりました。それは既存の継承の定義を汚さずに拡張を行うというものでした。といっても例をあげないことにはぱっと伝わらないと思います。以下のような順番でおさらいをしながら話を進めます。  
  
extend => placeholder selector => codeschoolの応用問題  
  
<style type="text/css">.left { width: 250px; float: left; background-color: #eee; padding: 10px; } .arrow { float: left; padding: 100px 20px; } .right { width: 250px; float: left; background-color: #dde; padding: 10px; } </style>

# @extendの基本的な使い方
  
@extendの基本的な使い方はこのようにクラスを拡張して他の要素(この例だとborder-with)を付け足すことだ。  

    .error { border: 1px #f00; background-color: #fdd;}.seriousError { @extend .error; border-width: 3px;}

  

>> 
  

    .error, .seriousError { border: 1px #f00; background-color: #fdd; }.seriousError { border-width: 3px; }

  

  
  
出力結果はもともと定義されていたCSS上の.error{} にセレクタである.seriousErrorを追加して同じスタイルを適応している。さらに.seriousError{ border-width: 3px; } を単体で宣言することで拡張という概念を実現している。  
  
では、上記の例のように既に.errorsが拡張されている場合に、.errorsを別のところでも定義したらどうなるだろうか？  

    .error { border: 1px #f00; background-color: #fdd;}.error.intrusion { background-image: url("/image/hacked.png");}.seriousError { @extend .error; border-width: 3px;}

  

>> 
  

    .error, .seriousError { border: 1px #f00; background-color: #fdd; }.error.intrusion, .seriousError.intrusion { background-image: url("/image/hacked.png"); }.seriousError { border-width: 3px; }

  

出力結果には.error.intrusion だけでなく.seriousError.intrusion もできるんですね。  
  
  
実はこれ [本家のリファレンス](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#how_it_works)にある基本的なextendの例なんです。  
  
  

# placeholder selector
  
 [Placeholder selector](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#placeholders)はそれそのものの定義は何も出力されませんが、それをextendするとextendした先の定義が出力されます  
  

    // This ruleset won't be rendered on its own.#context a%extreme { color: blue; font-weight: bold; font-size: 2em;}//However, placeholder selectors can be extended, just like classes and ids. The extended selectors will be generated, but the base placeholder selector will not. For example:.notice { @extend %extreme;}

  

>> 
  

    #context a.notice { color: blue; font-weight: bold; font-size: 2em; }

  

僕はこれの使い道がいまいち分かりませんでした。  
  
  

## Codeschool
  
以下は僕がCodeschoolで遭遇した問題です。  
  
  
= 問題本文 =   
Whoops - we've discovered an alteration to .blueprint later in our stylesheet, and extending .blueprint with .surveyor is creating extra selectors in .factory that aren't needed. Create a placeholder selector called container to hold the shared properties and extend it with .blueprint and .surveyor to remove the extra .factory .surveyor selector.  
  
？？？なんじゃそりゃ。と初見だと文の意味すらよく理解できなかったです。  
でも上記のコンテキストを踏んでいるのでもうお分かりじゃないかと思います。  
  
意訳するとこういうことですね。  
  
最初に .blueprint を定義して .factoryでextendした。  

    .blueprint { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px;}.factory { background: #fff; .blueprint { margin-bottom: 20px; }}

  

  
だけど、変更が必要で .surveyor を作って extend した。  
  

    .blueprint { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px;}.surveyor { @extend .blueprint; color: #fff;}.factory { background: #fff; .blueprint { margin-bottom: 20px; }}

  
そしたら、出力結果に予期せぬ余分な .factory .surveyor が入ったのでこれを取り除きたい。  

    .blueprint, .surveyor { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px;}.surveyor { color: #fff;}.factory { background: #fff;}.factory .blueprint, .factory .surveyor { margin-bottom: 20px;}

  
Placeholder selectorを作って余分な .factory .surveyorセレクタを削除してください。  
  
どうでしょう、make senseしましたか?すでに定義済みの継承関係.factory{ .blueprint{} }を汚さないように拡張をするのにplaceholder selector使ってくださいと言っています。こういうケースならplaceholder selectorが使えるのかもしれません。  
  
  
では以下が問題全文です。回答もありますので併せて参考にしてみてください。  
  
Whoops - we've discovered an alteration to .blueprint later in our stylesheet, and extending .blueprint with .surveyor is creating extra selectors in .factory that aren't needed. Create a placeholder selector called container to hold the shared properties and extend it with .blueprint and .surveyor to remove the extra .factory .surveyor selector.  
  

    .blueprint { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px;}.surveyor { @extend .blueprint; color: #fff;}.factory { background: #fff; .blueprint { margin-bottom: 20px; }}

  

>> 
  

    .blueprint, .surveyor { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px;}.surveyor { color: #fff;}.factory { background: #fff;}.factory .blueprint, .factory .surveyor { margin-bottom: 20px;}

  

  
  
回答；  

    %container { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px;}.blueprint { @extend %container;}.surveyor { @extend %container; color: #fff;}.factory { background: #fff; .blueprint { margin-bottom: 20px; }}

  

>> 
  

    .blueprint, .surveyor { background: blue; border-radius: 5px; margin-bottom: 15px; padding: 10px; }.surveyor { color: #fff; }.factory { background: #fff; } .factory .blueprint { margin-bottom: 20px; }

  

  
まずは.blueprintに親になる %containerを定義して拡張することで出力結果の .blueprint{} と .factory .blueprint{} を実現します。.surveyor{} には color: #fff; という拡張を入れたいので別途 %containerをextendしています。そうすると、.factory { .blueprint{} } は .blueprint だけに適用されますから余分な .factory .surveyerは出力されません。  
  

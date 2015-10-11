---
layout: post
title: RSpecのshouldは何をしてるの？　RSpecの仕組み
date: '2012-06-04T17:06:00.003+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2012-06-04T17:29:54.214+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-2740206096405086535
blogger_orig_url: http://engineerflies.blogspot.com/2012/06/rspecshould.html
---

RSpecのshouldはどうやって動いているのか？..という仕組みについてpaperboy&co.の方が既にcodeを読んで解説されているスライドを見つけました。  
  
まずshouldが全てのinstaceで実効可能なのは [Kernel classに対して定義されている](http://banyan.github.com/slides/20120321/#/step-12)からです。  
  
 [shouldの居場所](https://github.com/dchelimsky/rspec/blob/master/lib/spec/expectations/extensions/kernel.rb#L26)

    # spec/expectations/extensions/kernel.rbdef should(matcher=nil, message=nil, &block) Spec::Expectations::PositiveExpectationHandler.handle_matcher(self, matcher, message, &block)end

  
 [PositiveExpectationHandler#handle\_matcherの居場所](https://github.com/dchelimsky/rspec/blob/master/lib/spec/expectations/handler.rb#L5)  

    # spec/expectations/handler.rbmatch = matcher.matches?(actual, &block)

  
  
  

### [RSpecの構造](http://banyan.github.com/slides/20120321/#/step-9)

    /lib└── spec ├── expectations │ └── extensions └── matchers └── extensions

  
expectations/extensionsはその名のとおり拡張を行う。 [spec/expectations/extensions/にはkernel.rbのみがある](https://github.com/dchelimsky/rspec/tree/master/lib/spec/expectations/extensions)。  
  
 [RSpecの構造](http://banyan.github.com/slides/20120321/#/step-9)  
 [spec/matchers](https://github.com/dchelimsky/rspec/tree/master/lib/spec/matchers)には見慣れた名前が。。  
  
ずっとshouldはきっと variable.be\_a Stringてかくと variable.is\_a? Stringって変えてくれると想像して信じていたけど、実際の条件は逐一Matcherに書いてあるらしい。例えば [be\_kind\_of matcher](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/be_kind_of.rb)  

    def be_a_kind_of(expected) Matcher.new :be_a_kind_of, expected do |_expected_| match do |actual| actual.kind_of?(_expected_) end endend

  
be Matcherには [僕が想像していたような機能がある](http://banyan.github.com/slides/20120321/#/step-31)  
  
§  
  
Matcherを自作したい時は Object.should be\_fine => Object.fine?の法則に当てはまるfine? methodを持つObject定義してあげるか、matches?にrespondするMatcherを書いて [matcher.rb](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers.rb)みたいに requireしてあげればいいはず。  
  
  
§  
  
  

### 蛇足だけど
上記 kernel.rbのとおり [引数にmessageを渡してfailure時に何が失敗したのかわかりやすくすることもできる](http://kerryb.github.com/iprug-rspec-presentation/#34)  
  
別のshould、 [Subject#shouldの居場所](https://github.com/rspec/rspec-core/blob/master/lib/rspec/core/subject.rb#L62)  
これは以下の用に書いたときのshouldにちがいない（と信じてる）  

    let(:int) { 16 }subject { int }it "should be even" do should be_evenend

  
  

### Change
例えばこんな感じに書いたときは  

    expect{ array

 [initializeで @value\_proc に{ array 、](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/change.rb#L4) [from methodで@fromに0が、to methodで@to に1が代入される。](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/change.rb#L78)比較は他のmatchers同様 [matches?](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/change.rb#L11)で @beforeと@afterを比較して行われる。event\_procには array.sizeが代入される。 

    @before = evaluate_value_procevent_proc.call@after = evaluate_value_proc

 [スライド](http://banyan.github.com/slides/20120321/#/step-4)すばらしいので全部読むべし  
  
  

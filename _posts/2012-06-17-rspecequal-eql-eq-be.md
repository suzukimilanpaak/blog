---
layout: post
title: RSpecのequal, eql, eq, be の違い
date: '2012-06-17T06:36:00.001+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2012-06-17T06:39:52.016+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-20968713072103515
blogger_orig_url: http://engineerflies.blogspot.com/2012/06/rspecequal-eql-eq-be.html
---

RSeqでshould equalと書くべきかeqlと書くべきか、それともbeと書くべきか時々混乱するのでこの際覚えてしまおうと意味で何がちがうんだろうと見てみた。それによるとごく簡単にまとめると以下のような結果だった。  
  
二つの変数を比較するとき；

- 変数の値だけを比べる
**eql**** eq**- 変数の値だけでなく、インスタンスのobject\_idまで比べる
**equal**** be**と、ここまで覚えておけばSpec書くのに支障はない。  
  
  
もう少し掘り下げると、それぞれ以下のような仕組みになっている。  
  

### eql
 [Matcherの場所はここ](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/eql.rb)。実際にはObject#eql?を呼んでいる。  
  
> arr.eql? :a => 1, :b => 2  
=> true  
  
  

### equal
 [Matcherの場所はここ](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/equal.rb)。実際にはObject#equal?を呼んでいる  
  
> arr.equal? :a => 1, :b => 2  
=> false  
  
  

### eq
eqの定義は [DSLの方](http://stackoverflow.com/a/9797559/273182)にあるらしい。  
  
  

### be
 [Matcherの定義はここ](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/be.rb#L236)。beに引数があれば [BeSameAs#matches?](https://github.com/dchelimsky/rspec/blob/master/lib/spec/matchers/be.rb#L187)がshouldによって呼ばれる仕組みになっている。  
  
  
  
  
整理して実際に試してみよう。以下のようにString, Array, Fixnumの型のインスタンスについてそれぞれeq, eql, equal, beのマッチャでSpecを実施してみた。  
  
# ./tmp\_spec.rb  

    require 'rspec'describe 'eq' do it('should find two strings are equal') { "".should eq ""} it('should find two Arrays are equal') { {:a => 1}.should eq :a => 1 } it('should find two Fixnums are equal') { 1.should eq 1 }enddescribe 'eql' do it('should find two strings are equal') { "".should eql ""} it('should find two Arrays are equal') { {:a => 1}.should eql :a => 1 } it('should find two Fixnums are equal') { 1.should eql 1 }enddescribe 'equal' do it('should find two Strings are equal') { "".should equal ""} it('should find two Arrays are equal') { {:a => 1}.should equal :a => 1 } it('should find two Fixnums are equal') { 1.should equal 1 }enddescribe 'be' do it('should find two strings are equal') { "".should be ""} it('hould find two Arrays are equal') { {:a => 1}.should be :a => 1 } it('should find two Fixnums are equal') { 1.should be 1 }end

  
  
結果は以下のとおり。equalとbeでは　String, Arrayではobject\_idまで同じかチェックしている。  

    $ rspec tmp_spec.rb -f doceq should find two strings are equal should find two Arrays are equal should find two Fixnums are equaleql should find two strings are equal should find two Arrays are equal should find two Fixnums are equalequal should find two Strings are equal (FAILED - 1) should find two Arrays are equal (FAILED - 2) should find two Fixnums are equalbe should find two strings are equal (FAILED - 3) hould find two Arrays are equal (FAILED - 4) should find two Fixnums are equalFailures: 1) equal should find two Strings are equal Failure/Error: it('should find two Strings are equal') { "".should equal ""} expected # => "" got # => "" Compared using equal?, which compares object identity, but expected and actual are not the same object. Use 'actual.should == expected' if you don't care about object identity in this example. # ./tmp_spec.rb:16:in `block (2 levels) in ' 2) equal should find two Arrays are equal Failure/Error: it('should find two Arrays are equal') { {:a => 1}.should equal :a => 1 } expected # => {:a=>1} got # => {:a=>1} Compared using equal?, which compares object identity, but expected and actual are not the same object. Use 'actual.should == expected' if you don't care about object identity in this example. Diff:{:a=>1}.==({:a=>1}) returned false even though the diff between {:a=>1} and {:a=>1} is empty. Check the implementation of {:a=>1}.==. # ./tmp_spec.rb:17:in `block (2 levels) in ' 3) be should find two strings are equal Failure/Error: it('should find two strings are equal') { "".should be ""} expected # => "" got # => "" Compared using equal?, which compares object identity, but expected and actual are not the same object. Use 'actual.should == expected' if you don't care about object identity in this example. # ./tmp_spec.rb:22:in `block (2 levels) in ' 4) be hould find two Arrays are equal Failure/Error: it('hould find two Arrays are equal') { {:a => 1}.should be :a => 1 } expected # => {:a=>1} got # => {:a=>1} Compared using equal?, which compares object identity, but expected and actual are not the same object. Use 'actual.should == expected' if you don't care about object identity in this example. Diff:{:a=>1}.==({:a=>1}) returned false even though the diff between {:a=>1} and {:a=>1} is empty. Check the implementation of {:a=>1}.==. # ./tmp_spec.rb:23:in `block (2 levels) in 'Finished in 0.01339 seconds12 examples, 4 failuresFailed examples:rspec ./tmp_spec.rb:16 # equal should find two Strings are equalrspec ./tmp_spec.rb:17 # equal should find two Arrays are equalrspec ./tmp_spec.rb:22 # be should find two strings are equalrspec ./tmp_spec.rb:23 # be hould find two Arrays are equal

  
  
でもこのFixnumの比較に関しては Specが成功してしまう。  

    describe 'be' do it('should find two Fixnums are equal') { 1.should be 1 }end

  
これはFixnumのidがrubyを起動時に実行されて既に予約済みだからのようだ  
  
irb/ pry  

    [28] pry(main)> 1.object_id=> 3[29] pry(main)> 2.object_id=> 5[30] pry(main)> 3.object_id=> 7[35] pry(main)> 1.object_id=> 3[32] pry(main)> 1.0.object_id=> 105431370

  
このようにFixnumのインスタンスはシングルトンで定義されているようだ。
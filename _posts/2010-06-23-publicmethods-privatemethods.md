---
layout: post
title: "インスタンスの状態とpublic_methods, private_methods, singleton_methods, public_instance_methods,
  protected_instance_methods, private_instance_methods"
date: '2010-06-22T19:54:00.008+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2010-06-23T16:13:29.011+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7088623990635619616
blogger_orig_url: http://engineerflies.blogspot.com/2010/06/publicmethods-privatemethods.html
---

インスタンスの状態とpublic\_methods, private\_methods, singleton\_methods, public\_instance\_methods, protected\_instance\_methods, private\_instance\_methods  
インスタンスの状態とメソッド検索メソッドの関係についてまとめました。  
  
まずはどんなメソッド検索メソッドを調べます。

    # >> Object.methods.select{|m| m=~ /_methods/} # => ["public_methods", "instance_methods", "singleton_methods", "public_instance_methods", "protected_methods", "protected_instance_methods", "private_methods", "private_instance_methods"]

  
  
こんなクラスで試します。  

    class MyClass def initialize; end def instance_method; end def self.singleton_method; end protected def protected_instance_method; end def self.protected_singleton_method; end private def private_instance_method; end def self.private_singleton_method; end end

  
  
  

### クラスを検索
  
まずはクラスそのものでメソッドの検索をしてみます。methodsという配列との論理積を出しているのは、継承しているメソッドを表示させないためです。=beginで始まるコメントには上の４行の出力結果をそれぞれ示しています。  

    methods = ["instance_method", "singleton_method", "protected_instance_method", "protected_singleton_method", "private_instance_method", "private_singleton_method"] p methods & MyClass.public_methods.collect{|m| m.to_s} p methods & MyClass.protected_methods.collect{|m| m.to_s} p methods & MyClass.private_methods.collect{|m| m.to_s} p methods & MyClass.singleton_methods.collect{|m| m.to_s} =begin ["instance_method", "singleton_method", "protected_singleton_method", "private_singleton_method"] [] [] ["singleton_method", "protected_singleton_method", "private_singleton_method"] =end p methods & MyClass.instance_methods.collect{|m| m.to_s} p methods & MyClass.public_instance_methods.collect{|m| m.to_s} p methods & MyClass.protected_instance_methods.collect{|m| m.to_s} p methods & MyClass.private_instance_methods.collect{|m| m.to_s} =begin ["instance_method", "protected_instance_method"] ["instance_method"] ["protected_instance_method"] ["private_instance_method"] =end

  
注意すべきところはpublic\_methodsにprotected\_singleton\_methodとprivate\_singleton\_methodが含まれるところです。理由はよく分かりません。それから、protected\_methodsとprivate\_methodsは何も表示しません。  
  
instance\_methodsはpirvate\_instance\_methodを表示させません。インスタンスメソッドを検索したい場合はスコープごとに分けて検索するか、すべてのスコープの結果を論理和したものから探すのが良いと思います。  
  
  
インスタンスを検索  

    mc = MyClass.new p methods & mc.public_methods.collect{|m| m.to_s} p methods & mc.protected_methods.collect{|m| m.to_s} p methods & mc.private_methods.collect{|m| m.to_s} p methods & mc.singleton_methods.collect{|m| m.to_s} =begin ["instance_method"] ["protected_instance_method"] ["private_instance_method"] [] =end

  
  
インスタンスから検索した場合、当然ながらクラスで定義したシングルトンメソッドは表示されません。代わりにインスタンスにシングルトンメソッドを定義すればsingleton\_methods()で発見されます。  
  
protected\_instance\_methodとprivate\_instance\_methodが発見されます。  
  
インスタンスからinstance\_xxxx\_methodsと名のつくメソッドを実行すると全てundefined methodになります（ので表記してません）。  
  
  

### 継承したクラスを検索
  
元のクラスと同じ結果  
  

### 継承したインスタンスを検索
  
元のクラスのインスタンスと同じ結果  
  

## まとめ
  
- シングルトンメソッドは（当たり前だけど）定義したインスタンス（クラスはClassクラスのインスタンス）からしか参照できない。  
- クラスのprotected\_instance\_methods(), private\_instance\_methods()は何も見つけないので何のためにあるか分からない。  
- instance\_methodsはpirvate\_instance\_methodを含まない  
  
ちなみに、メソッド検索メソッドで参照できるのと、callできるかはまた別の話なのでご注意あれ。
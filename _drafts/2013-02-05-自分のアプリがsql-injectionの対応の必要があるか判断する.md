---
layout: post
title: "自分のアプリがSQL injectionの対応の必要があるか判断する"
date: '2013-02-05T08:08:00.002Z'
author: Suzuki MilanPaak
tags: 
modified_time: '2013-02-05T08:08:34.661Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-6706860790423053978
---

- このようにparamsでhashを渡している場合に発生  
User.find\_by\_name(params[:name])  
  
- でもhashのキーがStringではなくてSymbolの時だけ発生  
- paramsはHashWithIndifferentAccessのインスタンスなので以下のようなパラメータを渡すことがexploitになることはない  
 /example-url?name[select]=whatever&name[limit]=23  
  
 ```  
 params["foo"] = "bar"  
 puts params.inspect  
 #=> {"foo"=>"bar"}  
 puts params["foo"]  
 #=> "bar"  
 ```  
  
- Authlogicと組み合わせると弱体性が発生  
 Authlogicの認証はこんな感じ  
　　User.find\_by\_persistence\_token(the\_token)  
 the\_tokenはHMACで暗号化されてsessionに保存されている。  
 その暗号化に使われている秘密鍵がAuthlogicにはあるが、  
 デフォルトのまま変更していない人が多いためthe\_tokenを編集可能になってしまうのが今回のセキュリティホール


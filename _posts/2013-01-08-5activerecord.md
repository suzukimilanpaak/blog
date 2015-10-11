---
layout: post
title: "覚えているようで覚えられない5通りのActiveRecordの属性を変更する方法"
date: '2013-01-08T07:44:00.000Z'
author: Suzuki MilanPaak
tags: 
modified_time: '2013-01-08T07:53:10.171Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7228019644124381756
blogger_orig_url: http://engineerflies.blogspot.com/2013/01/5activerecord.html
---

メモ；  
  
 [5 Ways to set Attributes in ActiveRecord](http://www.davidverhasselt.com/2011/06/28/5-ways-to-set-attributes-in-activerecord/)  
  
  
<style type="text/css">table, th, td { border: 2px #793939 solid; padding: 0px; margin: 0px; } </style>

# 5 Ways to set Attributes in ActiveRecord
  

| Method | Uses Default Accessor | Mass Assignment Protection | Saved to Database | Validations |
| --- | --- | --- | --- | --- |
| [attribute=](http://apidock.com/rails/ActiveRecord/AttributeMethods/Write/attribute%3D) | Yes | No | No | n/a |
| [write\_attribute](http://apidock.com/rails/ActiveRecord/AttributeMethods/Write/write_attribute) | No | No | No | n/a |
| [update\_attribute](http://apidock.com/rails/ActiveRecord/Persistence/update_attribute) | Yes | No | Yes | No |
| [attributes=](http://apidock.com/rails/ActiveRecord/Base/attributes%3D) | Yes | Yes<sup><a class="footnote-link footnote-identifier-link" href="http://draft.blogger.com/blogger.g?blogID=6758697817819098194#footnote_0_362" id="identifier_0_362" title="Mass Assignment Protection for attributes= is overridable.">1</a></sup> | No | n/a |
| [update\_attributes](http://apidock.com/rails/v3.0.0/ActiveRecord/Persistence/update_attributes) | Yes | Yes | Yes | Yes |
 

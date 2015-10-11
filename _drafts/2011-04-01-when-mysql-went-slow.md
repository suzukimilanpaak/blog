---
layout: post
title: When mysql went slow
date: '2011-04-01T13:34:00.001+01:00'
author: Suzuki MilanPaak
tags:
- MySQL
modified_time: '2011-04-08T18:06:50.969+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-8252787025108915124
---

- SHOW PROCESSLIST;  
shows all processes stocking.  
  
- SHOW VARIABLES LIKE 'tx\_isolation';  
shows isolation level of database;  
  
- SHOW CREATE TABLE table\_name;  
shows create table definition for a table;  
  
- slow log   
is normally in /var/log/mysql/mysql-slow.log in Ubntu server  
  
- There is seemingly no way to refer isolation level for a query  
http://stackoverflow.com/questions/5347567/view-isolation-level-for-a-query-in-mysql  
  
- mysqlcheck http://linuxcommand.org/man\_pages/mysqlcheck1.html  
does CHECK TABLE, REPAIR TABLE, ANALYZE, TABLE, and OPTIMIZE TABLE


---
layout: post
title: How to find if a process is running by port number
date: '2012-07-12T02:57:00.002+01:00'
author: Suzuki MilanPaak
tags: 
modified_time: '2012-07-12T02:57:50.943+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-7770827631489955046
---

$ netstat -an | grep LISTEN | grep -E "6025|7195|2080"


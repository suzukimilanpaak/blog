---
layout: post
title: Date.parse と DateTime.parse
date: '2014-03-17T13:42:00.000Z'
author: Suzuki MilanPaak
tags: 
modified_time: '2014-03-17T13:46:07.062Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-6928825678490348007
blogger_orig_url: http://engineerflies.blogspot.com/2014/03/dateparse-datetimeparse.html
---

    DateTime.parseの方はlocal timeになるらしい。to_iするとUTCとJPTの時差が数値で出る。```ruby[2] pry(main)> Date.parse("2014-03-12").to_time.to_i=> 1394550000[3] pry(main)> DateTime.parse("2014-03-12").to_i=> 1394582400```


---
layout: post
title: RSpec evidence with progress bar
date: '2012-05-23T14:48:00.002+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2012-05-24T01:31:35.665+01:00'
thumbnail: http://4.bp.blogspot.com/-PEL3KbGGt_Q/T7znZkpDGDI/AAAAAAAAAOQ/4ib24UASTYs/s72-c/rspec.png
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-6687023219528263886
blogger_orig_url: http://engineerflies.blogspot.com/2012/05/rspec-evidence-with-progress-bar.html
---

Just found that 'rspec' takes multiple options to specify formats like I do in the following snippet.

 [![](http://4.bp.blogspot.com/-PEL3KbGGt_Q/T7znZkpDGDI/AAAAAAAAAOQ/4ib24UASTYs/s400/rspec.png)](http://4.bp.blogspot.com/-PEL3KbGGt_Q/T7znZkpDGDI/AAAAAAAAAOQ/4ib24UASTYs/s1600/rspec.png)
  
'-f Fuubar' to show a progress bar.   
I do test all specs of thousands in a project I'm currently working on. So, better have a progress bar.   
  
'-f doc' to generate sentences according to specs.   
I use methods 'let', 'subject', 'shared\_examples\_for' make output of 'rspec' self-explanatory.  
  
  

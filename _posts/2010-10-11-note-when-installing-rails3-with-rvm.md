---
layout: post
title: Note when installing Rails3 with RVM
date: '2010-10-11T14:49:00.009+01:00'
author: Suzuki MilanPaak
tags:
- Ruby/ Ruby on Rails
modified_time: '2011-10-26T11:33:09.327+01:00'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-1604273215050674715
blogger_orig_url: http://engineerflies.blogspot.com/2010/10/note-when-installing-rails3-with-rvm.html
---

# Prerequisite
  
  
- ruby >= 1.8.7 but [p248 and p249 crashes rails3](http://edgeguides.rubyonrails.org/3_0_release_notes.html#rails-3-requires-at-least-ruby-1-8-7)  
  
- gem >= 1.3.6  
  
  

# My environment
  
  
- Ubuntu  

    $ cat /etc/lsb-releaseDISTRIB_ID=UbuntuDISTRIB_RELEASE=9.10DISTRIB_CODENAME=karmicDISTRIB_DESCRIPTION="Ubuntu 9.10"

  
  
- Rvm  

    $ rvm -vrvm 0.1.44

  
  
To update your rvm to the latest version run the following command;  

    $ rvm update

  
  
Since the version of ruby gems in my environment (Ubuntu karmic) is 1.3.5, I decided to use RVM and install ruby 1.8.7 (for a compatibility of other applications) and use rubygem 1.3.7.  
  
  

# Installation
  
  

    $ rvm notesNotes for Linux ( DISTRIB_ID=UbuntuDISTRIB_RELEASE=9.10DISTRIB_CODENAME=karmicDISTRIB_DESCRIPTION="Ubuntu 9.10" )* NOTE: MRI stands for Matz's Ruby Interpreter (1.8.X, 1.9.X), ree stands for Ruby Enterprise Edition and rbx stands for Rubinius.* curl is required.* patch is required (for ree, some ruby head's).* If you wish to install rbx and/or any MRI head (eg. 1.9.2-head) then you must install and use rvm 1.8.7 first.* For JRuby (if you wish to use it) you will need:$ aptitude install curl sun-java6-bin sun-java6-jre sun-java6-jdk* For MRI & ree (if you wish to use it) you will need (depending on what you are installing):$ aptitude install build-essential bison openssl libreadline5 libreadline-dev curl git-core zlib1g zlib1g-dev libssl-dev vim libsqlite3-0 libsqlite3-dev sqlite3 libreadline5-dev libreadline6-dev libxml2-dev git-core subversion autoconf* For IronRuby (if you wish to use it) you will need:$ aptitude install curl mono-2.0-devel

  
  
  
It is recommended to install the following packages beforehand because, without these, I encountered errors saying 'no such file to load' by ruby.  
  

    $ rvm pkg install iconv $ rvm pkg install readline $ rvm pkg install zlib$ rvm pkg install autoconf$ rvm pkg install openssl$ export PATH=$HOME/.rvm/bin:$PATH# To list all rubies you can install;$ rvm list known$ rvm install ruby-1.8.7-p299 -C --with-readline-dir=$HOME/.rvm/usr --with-iconv-dir=$HOME/.rvm/usr --with-zlib-dir=$HOME/.rvm/usr --with-openssl-dir=$HOME/.rvm/usr$ rvm use 1.8.7 && ruby -vinfo: Using ruby 1.8.7 p299ruby 1.8.7 (2010-06-23 patchlevel 299) [i686-linux]$ gem -v1.3.7

  
  
  
If you got an error like bellow, one of packages above may not be correctly installed.   

    $ bundle exec rails c production/home/suzukimilanpaak/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/irb/completion.rb:9:in `require': no such file to load -- readline (LoadError) from /home/suzukimilanpaak/.rvm/rubies/ruby-1.9.2-p290/lib/ruby/1.9.1/irb/completion.rb:9:in `' from /home/suzukimilanpaak/.rvm/gems/ruby-1.9.2-p290@global/gems/railties-3.0.9/lib/rails/commands/console.rb:3:in `require' from /home/suzukimilanpaak/.rvm/gems/ruby-1.9.2-p290@global/gems/railties-3.0.9/lib/rails/commands/console.rb:3:in `' from /home/suzukimilanpaak/.rvm/gems/ruby-1.9.2-p290@global/gems/railties-3.0.9/lib/rails/commands.rb:20:in `require' from /home/suzukimilanpaak/.rvm/gems/ruby-1.9.2-p290@global/gems/railties-3.0.9/lib/rails/commands.rb:20:in `'

 If this's the case, execute following commands to reset ruby with newly compiled packages 

    rvm remove 1.9.2 rvm cleanup allrvm pkg install readlinervm install ruby-1.9.2

  
   
  
Install Rails3 (Do not sudo when you using RVM, which will cause a permission denial or unreachable path when running console, a server and a rake task in your user privilege)  

    $ gem install rails -v 3.0.0

  
  
Got this notice by rails -h  

    $ rails -h

  
  
Could not find gem 'mysql2 (>= 0, runtime)' in any of the gem sources.  
Try running `bundle install`.  
  

    $ bundle installFetching source index for http://rubygems.org/Using rake (0.8.7) Using abstract (1.0.0) ::Using railties (3.0.0) Using rails (3.0.0) Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.Your bundle was installed to `/home/tatsuya/.rvm/gems/ruby-1.8.7-p299`

  
  
  
  

# Create a new application
$ rails new apns  
  

    $ rails server


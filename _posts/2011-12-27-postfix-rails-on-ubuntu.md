---
layout: post
title: Postfix + Rails on Ubuntu
date: '2011-12-27T15:46:00.001Z'
author: Suzuki MilanPaak
tags:
- Linux
- Ruby/ Ruby on Rails
modified_time: '2012-01-03T18:14:41.456Z'
blogger_id: tag:blogger.com,1999:blog-6758697817819098194.post-2234179213774522469
blogger_orig_url: http://engineerflies.blogspot.com/2011/12/postfix-rails-on-ubuntu.html
---

&nbsp;Luckily or unluckily, I hadn't had to work with ActionMailer to send emails via Postfix till this time's setting hell. Because, applications I wrote to send emails from my gmail account was as-needed basis and, alternatively, I just could leave the process to send emails to Amazon SES.  
  
&nbsp;This time, an app I'm currently working on reached the maximum limit of number of emails sent by logging-in Google's SMTP, which was 1000 out-going mails a day with my account of Google Apps for free, and I adopted using SMTP server set up in a VPS. I looked for a summarised article on this but couldn't find nice one, really.  
  
&nbsp;I initially tried to get ActionMailer communicate with Qmail before Postfix. It did't work at all perhaps because it speaks slightly different SMTP apart from that of Sendmail and Postfix. So, I used combination of **Postfix + Rails on Ubuntu** and relayed mails to Gmail's SMTPs.

# My Environment

    $ cat /etc/lsb-release DISTRIB_ID=UbuntuDISTRIB_RELEASE=10.04DISTRIB_CODENAME=lucidDISTRIB_DESCRIPTION="Ubuntu 10.04.3 LTS"$ ruby --versionruby 1.8.7 (2011-06-30 patchlevel 352) [i686-linux]$ gem list action ***LOCAL GEMS*** actionmailer (3.0.0)

# Installing Postfix
&nbsp;There were two way to install binary version of Postfix with aptitude. One is to remove MTA currently installed, which forces you to install another MTA, and the other one is vice versa.  
  
 So, usual this one line is fine.  

    $ sudo aptitude install postfix

  
  

# Setting up Postfix

    Rails ==plain SMTP==> Postfix ==SMTP with TLS==> Gmail's SMTP server

  
&nbsp;Rails is able to communicates with Postfix without any unnecessary internal authentications in a box. Just set _smtpd\_use\_tls=no_ in /etc/postfix/main.cf. It apparently forces other smtpd\_tls\_\* options ineffective. I didn't get any difference when I commented out the other smtpd options.  
  
&nbsp;Make sure your setting of _mynetworks_ thoroughly shuts out SMTP server/client from outside. You could check it by using telnet I will mention later.   
&nbsp;Let's reload to apply the setting.  

    $ sudo /etc/init.d/postfix reload

  
&nbsp;Let's telnet to list your setting and check if TLS is not working.  

    $ telnet localhost 25 :EHLO localhost # => type this command250-www24085u.sakura.ne.jp250-PIPELINING250-SIZE 10240000250-VRFY250-ETRN250-ENHANCEDSTATUSCODES250-8BITMIME250 DSN # => make sure you haven't got a line '250-STARTTLS'STARTTLS # => this command tells you if TLS is implemented502 5.5.1 Error: command not implemented

  
You could use Telnet to check if your SMTP doesn't accept requests from outside  

    YourLocalBox$ telnet your.domain.com 25

  
  
&nbsp;Now that your Postfix is ready to receive internal SMTP requests, let's move on to other options. It still doesn't send out emails because we haven't set up from who we send emails and to which SMTP server we relay emails. 

    Add the following line to specify your domain name in email address. For instance, set your.domain.com of notification@your.domain.com$ sudo vim /etc/mailnameyour.domain.com$ sudo vim /etc/postfix/sasl/passwd[smtp.gmail.com]:587 notification@your.domain.com:password # *0$ sudo vim /etc/postfix/main.cfmyorigin = /etc/mailnamemyhostname = www24085u.sakura.ne.jp # => *1# Relay to Gmail#relayhost = [smtp.gmail.com]:587 # => *2smtp_use_tls = yes # => *3smtp_sasl_auth_enable = yessmtp_sasl_password_maps = hash:/etc/postfix/sasl/passwdsmtp_sasl_tls_security_options = noanonymous

  
\*0. Make sure you set email address and password of your gmail account that you want to use as a sender. Also, note that **Gmail's SMTP servers overwrite email address of a sender with this setting**. It's MTS's right to do that.  
  
\*1. This is an option to set your host name in the case where you actually send email from another domain but set **From** in SMTP header email address you'd like to spoof (legitimately). I sent email with From header 'notification@emailsan.com' and Postfix was situated at www24085u.sakura.ne.jp. Thus, I set www24085u.sakura.ne.jp.  
  
\*2. I first set the option to relay mails but bumped a maximum limit of relaying for one SMTP server during load test.  
  
\*3. Postfix as a SMTP client need to use TLS to access Gmail's SMTP server. I'm not quite sure but SASL needs TLS to complete its functions  
  
  
Reload or restart Postfix again.   
  

# Setting up Rails
In config/application.rb 

    # SMTP SETTING FOR local Postfix without any authorisationActionMailer::Base.smtp_settings = { :address => "127.0.0.1", :port => 25, # => *1 :domain => 'your.hostname.com', # => *2# :user_name => 'notification@your.domain.com,# :password => 'password',# :authentication => 'plain',# :tls => true,# :openssl_verify_mode => 'none', :enable_starttls_auto => false}

  
\*1. Don't need to use submission port, 587, because we just set Postfix to talk without any auth and encryption within a box.  
  
\*2. This must be the hostname where your rails app and Postfix is located   
  
\*. Do not add any of the lines commented out, which can cause ActionMailer's attempting SMTP Authentication. It looked like Actionmailer doesn't EHLO to determine either which protocol to talk nor which authentication method to use. _"tail -f /var/log/mail.log"_ may give you line something like this if it's the case;  

    postfix/smtpd[4032]: lost connection after AUTH from your.hostname.com[ipaddress]

 app/mailers/mailer\_api.rb 

    # encoding: UTF-8class MailerApi default :from => '"E mail-san" <notification@emailsan.com&gt', :parts_order => ["text/plain", "text/html"] # => *1 def compose to, subject, body_html, body_text @body_html = body_html @body_text = body_text mail :to => to, :subject => subject do |format| format.text # => *2 format.html end end end

\*1. :parts\_order specifies which part comes first. This matters when the mail you sent is bounced and, as a result, makes different which part to be shown in bounced email.  
  
\*2. It'd be better send multi-part mail if thinking of handling body of bounced mail, which is MIME-enveloped. Giving two line, format.text and format.html respectively, makes ActionMailer send multi parted mail.  
  
To deliver an email; 

    MailerApi.compose(to, subject, body_html, body_text).deliver

&nbsp;It's my assumption that my Postfix looks for which smtp to use with query to DNS and relay email to one of them. Befause I initially used 'relay=' option in main.cf and bumped limit. Then, comment out that line and grepping mail.log told me it still relays but various SMTP servers of Gmail.   

    Dec 28 01:50:12 www24085u postfix/smtp[11638]: 855E6A19A0: to=, orig_to=, relay=ASPMX.L.GOOGLE.com[74.125.53.26]:25, delay=10, delays=8.5/0.06/0.83/0.96, dsn=2.0.0, status=sent (250 2.0.0 OK 1325004612 l10si14011188pbj.164)

  
FYI, here's my MX record; 

    MX 1 ASPMX.L.GOOGLE.COM. (TTL:300) MX 5 ALT1.ASPMX.L.GOOGLE.COM. (TTL:300) MX 5 ALT2.ASPMX.L.GOOGLE.COM. (TTL:300) MX 10 ASPMX2.GOOGLEMAIL.COM. (TTL:300) MX 10 ASPMX3.GOOGLEMAIL.COM. (TTL:300)

  
  
  

# How to inspect
- Use telnet. It may tell you which step of communication is breaking down. e.g. Communication between Rails and Postfix or Postfix and Gmail's SMTP server. Trying SMTP Auth but failed. and so on..  
  
  
- Set log level of main.cf the highest, 4; _smtp\_tls\_loglevel=4_And tailing log files may give you details.  
  
  
- Adding config.action\_mailer.raise\_delivery\_errors = true to your development.rb or application.rb might give you useful information.   
  

# Verifying your domain
So, you can now send email with your Postfix. If you will send bulk of emails, you need to verify your domain in ideally two ways, which are SPF and DKIM, to prevent your account from being blocked by other MTAs. 
## SPF
Set SPF record into your DNS. In my case of application, I use 49.212.10.123 as a physical mail sender. And, send emails with it's From header 'notification@emailsan.com'. So, the record is ;  

    emailsan.com IN TXT "v=spf1 ip4:49.212.10.123 include:aspmx.googlemail.com ~all"

You could nslookup if you want to; 

    $ nslookup -q=txt emailsan.com

  
  
You could check the results by clicking 'show original' button in just right adjacent the curving arrow in conversation pane in a new UI (as of Dec 2011) of Gmail. Below is side by side comparison of the before and after.  
  
Before; 

    Authentication-Results: mx.google.com; spf=neutral (google.com: domain of notification@emailsan.com is neither permitted nor denied by best guess record for domain of example@cloudrop.jp)

  
After; 

    Authentication-Results: mx.google.com; spf=pass (google.com: domain of notification@emailsan.com designates 49.212.10.123 as permitted sender)

  
  

## DKIM
The easiest way to set DKIM should using dkim-filter. I just followed introduction and got no trouble. [PostfixDKIM](https://help.ubuntu.com/community/Postfix/DKIM) And I got this in raw email in Gmail; 

    Authentication-Results: mx.google.com; spf=pass (google.com: domain of notification@emailsan.com designates 49.212.10.123 as permitted sender) smtp.mail=notification@emailsan.com; dkim=pass (test mode) header.i=@emailsan.com

Note its seems that the majority using DKIM run it in test mode.  
  
  
Hope this will save your time.
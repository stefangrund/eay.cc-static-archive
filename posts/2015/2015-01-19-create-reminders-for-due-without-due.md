---
title: "Create Reminders for Due – without Due"
date: "2015-01-19"
datetime: "2015-01-19 16:37:04"
id: "29986"
slug: "create-reminders-for-due-without-due"
url: "https://eay.cc/2015/create-reminders-for-due-without-due/"
author: "eay"
format: "post"
categories:
  - 0815
  - english
tags:
  - apps
  - best-of
  - javascript
  - projekte
  - to-do
  - web-development
  - zeit
meta:
  - yourls_shorturl: "http://eay.li/2mn"
---

One of the all-time favorites on my homescreen is [Due](http://www.dueapp.com/), a reminder app for iOS and Mac. In fact, I wrote a [review of it back in 2011](//eay.cc/2011/to-do-or-not-to-do-oder-ein-loblied-auf-due/) and recommended it to everyone who's looking for a simple, but efficient todo and reminder app. A few days ago Lin Junjie, the developer of Due, released the long-awaited 2.0 of my everyday companion with a new look and feel. I really like it and I'm pretty sure that I'll keep on using Due for the next couple of years. But there's one problem: **My wife doesn't use Due.**

She's a fan of Apple's own Reminders app and that's fine. Thanks to iOS' family sharing I can add tasks and reminders to a shared list and she receives them on her phone. The other way around doesn't work so smoothly: I don't like the official app at all and buried it in an abandoned folder on my last screen. Sure, she could install Due on her iPhone or Mac, too, but so I could use the Reminders app. Obviously, there must be a better way to deal with our task management. A way in which I could have some fun with a few exciting JavaScript libraries...

[![](https://eay.cc/uploads/2015/due-reminder.png)](http://stefangrund.de/projekte/due/)

This resulted in [this little web interface](http://stefangrund.de/projekte/due/). It's a simple way to create and share reminders for Due from the web. For this purpose, it will generate a custom URL, which could then be shared with someone else via Mail, WhatsApp and Threema (or Copy & Paste). When the recipient opens the URL, it takes him to Due, where it composes a new reminder with the chosen title and due date.

The web interface is based on Due's UI and mimics it when creating reminders. Even natural date and time parsing is working just like in the app. Because the browser support of JavaScript's own Date object is a mess, I've implemented the date calculations with Adam Shaw's [XDate](http://arshaw.com/xdate/). The natural date and time parsing is realized with Wanasit Tanakitrungruang's [Chrono](https://github.com/wanasit/chrono). Right now date and time formats like `February 16`, `Feb 16` or `2015-02-16` and `13 pm` or `13:37` are supported.

This was a fun little finger exercise for me, but my wife is actually using it. So, mission accomplished! If you're curious about the code, [check it out on CodePen](http://codepen.io/eay/pen/ByRjyv).

And if your loved ones use Due and you do not, please reconsider your life choices and [get Due](http://eay.li/due). Or [give my little tool a try](http://stefangrund.de/projekte/due/). ;)

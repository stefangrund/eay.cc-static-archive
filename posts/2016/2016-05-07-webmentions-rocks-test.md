---
title: "Webmentions Test-Posting"
date: "2016-05-07"
datetime: "2016-05-07 12:14:15"
id: "31465"
slug: "webmentions-rocks-test"
url: "https://eay.cc/2016/webmentions-rocks-test/"
author: "eay"
format: "post"
categories:
  - 0815
  - english
tags:
  - indieweb
  - test
  - webmentions
meta:
  - yourls_shorturl: "http://eay.li/2sz"
---

I'm at the [IndieWebCamp Düsseldorf](http://indiewebcamp.com/2016/Dusseldorf) right now, just learned about [Webmentions](https://indiewebcamp.com/Webmention) and want to give the [Webmentions-WordPress-Plugin](https://de.wordpress.org/plugins/webmention/) by [pfefferle](http://notizblog.org/) a try with [Webmention.rocks](https://webmention.rocks/), [Aaron](https://aaronparecki.com/)'s helpful validator for sending Webmentions.

**Here are the different tests:** [Test 1](https://webmention.rocks/test/1) ✔ [Test 2](https://webmention.rocks/test/2) ✔ [Test 3](https://webmention.rocks/test/3) ✔ [Test 4](https://webmention.rocks/test/4) ✔ [Test 5](https://webmention.rocks/test/5) ✔ [Test 6](https://webmention.rocks/test/6) ✔ [Test 7](https://webmention.rocks/test/7) ✔ [Test 8](https://webmention.rocks/test/8) ✔ [Test 9](https://webmention.rocks/test/9) ✔ [Test 10](https://webmention.rocks/test/10) ✔ [Test 11](https://webmention.rocks/test/11) ✔ [Test 12](https://webmention.rocks/test/12) ✔ [Test 13](https://webmention.rocks/test/13) ✔ [Test 14](https://webmention.rocks/test/14) ✔ [Test 15](https://webmention.rocks/test/15) ✘

> **Webmention href is an empty string** This post has a <link> tag where the href value is an empty string, meaning the page is its own Webmention endpoint. This tests the relative URL resolver of the sender to ensure an empty string is resolved to the page's URL.

[Test 16](https://webmention.rocks/test/16) ✔ [Test 17](https://webmention.rocks/test/17) ✘

> **Multiple Webmention endpoints advertised: <link>, <a>** This post advertises its Webmention endpoint in an HTML <link> tag followed by a later definition in an tag. Your Webmention client must only send a Webmention to the one in the <link> tag since it appears first in the document.

[Test 18](https://webmention.rocks/test/18) ✔ [Test 19](https://webmention.rocks/test/19) ✔ [Test 20](https://webmention.rocks/test/20) ✔ [Test 21](https://webmention.rocks/test/21) ✔

**Update, 20:30:** While my first Webmention had no styles because of the missing [Microformats](http://microformats.org/) it looked like this:

![](https://eay.cc/uploads/2016/webmentions-test-1.png)

I've updated this post multiple times to incorporate even more Webmention features by adding Microformats' [h-entry](http://microformats.org/wiki/h-entry) and [h-card](http://microformats.org/wiki/h-card) properties. Now that they are declared correctly, the Webmention is looking like this:

![](https://eay.cc/uploads/2016/webmentions-test-2.png)

A huge improvement in just a couple of minutes! (Standing on the shoulders of giants... 😅) I'm looking forward to trying out receiving Webmentions tomorrow!

**Update, 01:30:** Just came back from a friend's party – perfect time to check my Webmention.rocks results. The tests #15 and #17 are failing. Maybe someone of my fellow attendees has any idea why? 🤔

In the meantime I received a Webmention from Webmention.rocks, which links back to this post. It's styled like a regualar WordPress comment right now, but I think I'm going to optimize the presentation of the Webmentions to became more special.

### Day 2

**Update, 12:40:** Test-Webmention an [Webrocker](https://www.webrocker.de/2016/05/08/indiewebcamp-duesseldorf-day-2/). Thank you!

**Update, 16:00:** Tested pfefferle's [Semantic Linkbacks](https://wordpress.org/plugins/semantic-linkbacks/) plugin, too. Works great, but the webmentions no longer get the correct comment type "webmentions". Also there's some unwanted side effects like copying the whole content of received webmentions into the comment. Which is why I deactivated the plugin shortly after.

Because of the delicate legal situation in Germany/Europe regarding copying a user's avatar/content without his written permission, I think I'm going to show webmentions only in a "XY mentioned you on example.com" way without a photo. Under the hood there may be a full representation for me, but not in the frontend.

I also configured [Bridgy](https://brid-gy.appspot.com/) to pull comments from Twitter and send them as a webmention to the proper post. While that's works fine in theory, the way the Webmention plugin determines the author, title and content for the comments is still problematic. There is no Microformat2 parsing happening at all, only guessing what could be the right value by looking a the HTML title and so on. I'm trying to do the parsing with [php-mf2](https://github.com/indieweb/php-mf2) on my own in the couple of days...

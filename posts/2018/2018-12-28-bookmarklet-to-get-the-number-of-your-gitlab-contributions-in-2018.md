---
title: "Bookmarklet to get the number of your GitLab contributions in 2018"
date: "2018-12-28"
published_at: "2018-12-28T11:39:35Z"
id: "35151"
slug: "bookmarklet-to-get-the-number-of-your-gitlab-contributions-in-2018"
permalink: "https://eay.cc/2018/bookmarklet-to-get-the-number-of-your-gitlab-contributions-in-2018/"
author: "Stefan Grund"
format: "standard"
categories:
  - "08/15"
tags:
  - "2018"
  - "bookmarklet"
  - "git"
  - "gitlab"
  - "javascript"
  - "quantified self"
  - "web-entwicklung"
short_url: "https://eay.li/38a"
content_copy:
  - "https://twitter.com/eay/status/1078620528389304320"
  - "https://twitter.com/eay/status/1078620657175445509"
  - "https://eay.social/@eay/101318541488015607"
---

If you are working with [GitLab](https://gitlab.com/) and are interested in the number of contributions you've made this year, here's a handy, little bookmarklet to calculate your contributions.

→ **GitLab Contributions Bookmarklet**

```javascript
(function(){var rects=document.querySelectorAll('#activity .js-contrib-calendar rect.user-contrib-cell');var name=document.querySelectorAll('.user-info .cover-title')[0].textContent.replace(/(\r\n\t|\n|\r\t)/gm,'');var yearToCount='2018';var counter=0;rects.forEach((item)=>{var text=item.getAttribute('data-original-title');var count=text.substr(0,text.indexOf(' '));if(text.indexOf(yearToCount)>-1&&count!=='No'){counter+=parseInt(count)}});alert(name+' did '+counter+' contributions in '+yearToCount+'.')}())
```

-   Drag the link above to your browser’s bookmark bar.
-   Go to `https://gitlab.com/users/​[username]/activity`\
    (replace `[username]` with, well, your username and, if necessary, `gitlab.com` with your custom domain).
-   Hit the bookmarklet and – voilà – there's the number of your contributions made in 2018! 🎉

![Screenshot of GitLab contributions bookmarklet](https://eay.cc/uploads/2018/gitlab-contributions.png)

Here's the JavaScript, if you're interested or want to run it in your console:

```js
(function() {
	var rects = document.querySelectorAll('#activity .js-contrib-calendar rect.user-contrib-cell');
	var name = document.querySelectorAll('.user-info .cover-title')[0].textContent.replace(/(\r\n\t|\n|\r\t)/gm,'');
	var yearToCount = '2018';
	var counter = 0;
	rects.forEach((item) => {
		var text = item.getAttribute('data-original-title');
		var count = text.substr(0, text.indexOf(' ')); 

		if (text.indexOf(yearToCount) > -1 && count !== 'No') {
			counter += parseInt(count);
		}
	});
	alert(name + ' did ' + counter + ' contributions in ' + yearToCount + '.');
}())
```

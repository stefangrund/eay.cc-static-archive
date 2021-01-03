---
title: "Bookmarklet to get the number of your GitLab contributions in 2018"
date: "2018-12-28"
datetime: "2018-12-28 12:39:35"
id: "35151"
slug: "bookmarklet-to-get-the-number-of-your-gitlab-contributions-in-2018"
url: "https://eay.cc/2018/bookmarklet-to-get-the-number-of-your-gitlab-contributions-in-2018/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - 2018
  - bookmarklet
  - git
  - gitlab
  - javascript
  - quantified-self
  - web-entwicklung
meta:
  - yourls_shorturl: "https://eay.li/38a"
  - content_copy: "https://twitter.com/eay/status/1078620528389304320"
  - content_copy: "https://twitter.com/eay/status/1078620657175445509"
  - content_copy: "https://eay.social/@eay/101318541488015607"
---

If you are working with [GitLab](https://gitlab.com/) and are interested in the number of contributions you've made this year, here's a handy, little bookmarklet to calculate your contributions.

→ [**GitLab Contributions Bookmarklet**](javascript:%28function%28%29%7Bvar%20rects%3Ddocument.querySelectorAll%28%27%23activity%20.js-contrib-calendar%20rect.user-contrib-cell%27%29%3Bvar%20name%3Ddocument.querySelectorAll%28%27.user-info%20.cover-title%27%29%5B0%5D.textContent.replace%28/%28%5Cr%5Cn%5Ct%7C%5Cn%7C%5Cr%5Ct%29/gm%2C%27%27%29%3Bvar%20yearToCount%3D%272018%27%3Bvar%20counter%3D0%3Brects.forEach%28%28item%29%3D%3E%7Bvar%20text%3Ditem.getAttribute%28%27data-original-title%27%29%3Bvar%20count%3Dtext.substr%280%2Ctext.indexOf%28%27%20%27%29%29%3Bif%28text.indexOf%28yearToCount%29%3E-1%26%26count%21%3D%3D%27No%27%29%7Bcounter+%3DparseInt%28count%29%7D%7D%29%3Balert%28name+%27%20did%20%27+counter+%27%20contributions%20in%20%27+yearToCount+%27.%27%29%7D%28%29%29)

- Drag the link above to your browser’s bookmark bar.
- Go to `https://gitlab.com/users/​[username]/activity`  
    (replace `[username]` with, well, your username and, if necessary, `gitlab.com` with your custom domain).
- Hit the bookmarklet and – voilà – there's the number of your contributions made in 2018! 🎉

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

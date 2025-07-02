---
title: "Blogtech-Nerd-Update, Februar 2025"
date: "2025-02-15"
datetime: "2025-02-16 00:25:11"
id: "40218"
slug: "blogtech-nerd-update-februar-2025"
url: "https://eay.cc/2025/blogtech-nerd-update-februar-2025/"
author: "eay"
format: "aside"
categories:
  - 0815
tags:
  - blogging
  - changelog
  - in-eigener-sache
  - wordpress
meta:
  - geo_latitude: "50.973871"
  - geo_longitude: "6.682943"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/3uk"
  - _share_on_mastodon_url: "https://eay.social/@eay/114010483069251257"
  - content_copy: "https://bsky.app/profile/eay.social/post/3liauivo73h2c"
---

_Blogtech-Nerd-Update:_

Ich aktualisiere gerade den Frontend-Build-Prozess dieser Seite, der nämlich noch auf dem mittler­weile prähistorischen Node 12 basiert (released im April 2019). Vor zwei Wochen gab es schließlich ein neues M4 MacBook Pro und das soll sich – ebenso wie der [M4 Mac mini](https://eay.cc/2024/hello-little-one/) – nicht mit solchen uralten, nicht auf Apple Silicon-ausgelegten Dependencies rumschlagen müssen.

Generell hatte ich zuletzt mit dem Wechsel von WordPress zu einem anderen System geliebäugelt. Zunächst mit einem Static Site Generator wie [Eleventy](https://www.11ty.dev/). Dann insbesondere [Kirby](https://getkirby.com/), das mir zuletzt positiv aufgefallen ist und [auf Nachfrage](https://eay.social/@eay/113678658129023607) hatte unter anderem [Webrocker-Tom](https://webrocker.de/), dem ich ja bei Blogtech-Entscheidungen [vollends vertraue](https://eay.cc/2020/saturday-night-server-migration/), genau das bestätigt. Meine ersten Tests vor ein paar Wochen waren dann auch überaus positiv, allerdings bin ich an zwei Grenzen gestoßen: 1. Zum einen fehlt mir aktuell die Zeit, mich weiter in Kirby reinzuarbeiten (wobei der [Quickstart](https://getkirby.com/docs/guide/quickstart) vorbildlich ist). 2. Zum anderen habe ich im vorliegenden Setup ein liebgewonnenes Feature-Set, das ich erstmal duplizieren müsste:

- Kommentare & Webmentions, die mit Datenbank, [Webmention-Plugin](https://de.wordpress.org/plugins/webmention/) von [Matthias](https://notiz.blog/) und [Brid.gy](https://brid.gy/) hervorragend funktionieren. Ginge natürlich [auch mit Kirby](https://plugins.getkirby.com/mauricerenck/komments), aber nicht so out-of-the-box'ig, wenn ich das richtig sehe.
- Eine bereits voll funktionsfähige Integration in meinen Workflow: Ich schreibe diese Zeilen in [Drafts](https://getdrafts.com/) (zur Not [meine einzige iPhone-App](https://eay.cc/2023/what-if-you-could-only-use-one-app-on-your-iphone/)) und [veröffentliche gleich direkt hieraus](https://eay.cc/2021/status-2021-10-16-0201/). Kirby hätte eine API, aber dann müssten meine Drafts-Actions/Scripts (Plural!) erstmal refaktoriert werden. Bei einem Static Site Generator müsste das auf Git umgemünzt werden, was mir wiederum zu wenig dynamisch/schnell ist.
- Migration, Migration, Migration. Nicht das Schreckgespenst der deutschen Rechten, sondern das Exportieren & Importieren meiner [vier Romane aus den letzten 18 Jahren](https://eay.cc/2025/22-jahre/) plus Metadaten und Kommentare (die ich nicht verlieren will). Ein Eleventy-kompatibles Archiv [habe ich bereits](https://eay.cc/2020/1017-jahre-eay-cc/), aber bei Kirby wäre es in den gewachsenen Strukturen etwas komplizierter.

Aus diesen Gründen bleibe ich vorerst noch bei WordPress, auch wenn das [zunehmender](https://mkln.org/p/ach-matt) [problematisch](https://mkln.org/p/acf-scf) wird. Mal beobachten, wie es [Thomas mit ClassicPress](https://gigold.me/blog/blogfragen) ergeht.

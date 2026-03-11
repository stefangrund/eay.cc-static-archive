---
title: "Spaß mit Kommentaren"
date: "2026-02-13"
datetime: "2026-02-13 22:56:25"
id: "41226"
slug: "spass-mit-kommentaren"
url: "https://eay.cc/2026/spass-mit-kommentaren/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - changelog
  - eayz
  - in-eigener-sache
  - kommentare
meta:
  - geo_latitude: "50.973881"
  - geo_longitude: "6.683007"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/3zc"
  - _share_on_mastodon_url: "https://eay.social/@eay/116065650480443027"
  - content_copy: "https://bsky.app/profile/eay.social/post/3merkflf4uj2z"
---

[Bleiben wir](https://eay.cc/2026/das-eigene-blogarchiv-lesen-oder-ki-zusammenfassungen-im-blogarchiv/) im Maschinenraum (([Der Maschinenraum](https://wirres.net/tag/aus+dem+maschinenraum) kommt von [Felix](https://wirres.net/), was eine schöne, treffsichere Umschreibung für "Wir basteln an unserem Blog und teilen das, auch wenn es womöglich niemanden oder nur andere Blogger interessiert" ist.)):

Eigentlich wollte ich, nachdem ich von [Felix](https://wirres.net/) ein [Bookmark per Webmention](https://eay.cc/2026/are-we-stuck-with-the-same-desktop-ux-forever/#comments) erhielt, nur sicherstellen, dass diese hier nun auch korrekt dargestellt werden. Bisher gab es diese nämlich fast nie, weshalb ich ihnen keine Beachtung schenkte und stattdessen nur Like-Herzchen anzeigte. Was jedoch recht irre­führend ist, wenn es z.B. Like und Bookmark vom gleichen Autor gibt (und eben kein Double-Like). Also brauchte es ein Bookmark-Icon. Gesagt, getan:

![Screenshot-Ausschnitt der neuen Webmention-Bookmark-Icon mit besagtem Bookmark von Felix](https://eay.cc/uploads/2026/interactions-bookmarks.png)

Als ich dann die `comments.php` bearbeitete, dachte ich, dass es ja eigentlich auch ganz schön wäre, wenn ich bei (Text-)Kommentaren schnell Replies mit @-Mention auf den Kommentar schreiben könnte, was es hier vor Urzeiten schon mal gab. Weshalb ich das noch hinzufügte:

![Screenshot-Auszug von dem neuen Reply-Link in den hiesigen Kommentaren](https://eay.cc/uploads/2026/interactions-replies.gif)

Ein Klick darauf füllt nun das Kommentarfeld entsprechend aus. Mehrere Reply-Klicks werden schön untereinander mit Leerzeile dazwischen ergänzt:

![Screenshot-Auszug der nach doppelte Reply-Button-Betätigung](https://eay.cc/uploads/2026/interactions-textarea.png)

Was mich dazu brachte, dass meine Kommentare – egal ob hier geschrieben oder per Mastodon/Bluesky via Webmention hierher zurück – eigentlich als mir zugehörig gekennzeichnet werden sollten. Street Cred und so. Weshalb jetzt der bereits von [meinem Mastodon-Profil](https://eay.social/@eay) bekannte, kleine eay-Badge neben meinen Kommentaren angezeigt wird:

![Screenshot-Auszug eines Kommentars von mir mit neuem eay-Badge](https://eay.cc/uploads/2026/interactions-badge.png)

Woraufhin ich dachte, dass es eigentlich ganz nützlich wäre, eine überge­ordnete Seite der letzten Interaktionen und Kommentare zu haben. Weshalb ich [eine "Letzte Interaktionen"-Seite](https://eay.cc/interactions/) gebaut habe, die Posts rückwärts chrono­lo­gisch nach den letzten Kommentaren, Replies, Likes, Reposts und Bookmarks auflistet:

![Screenshot-Auszug einer Items aus der neuen Interactions-Seite](https://eay.cc/uploads/2026/interactions-item.png)

Handelt es sich um eine Webmention, wird direkt die externe Quelle verlinkt:

![Screenshot-Auszug eines Items mit Extern-Indikator am Ende](https://eay.cc/uploads/2026/interactions-external.png)

Eventuell nur für mich hilfreich, aber das darf es ja auch mal sein.

Bis wir das herausgefunden haben, habe ich die Interactions-Seite jedenfalls oben rechts im nun drei Punkte umfassenden Menü unter­gebracht, wo sie sich zum Darkmode-Toggle und zur Suche gesellt:

![Screenshot-Auszug des erweiterten Menüs oben rechts](https://eay.cc/uploads/2026/interactions-menu.png)

---

P.S.: Gibt es irgendeine menschenlesbare Beschreibung von Webmentions für Nicht-Techniker? Ich habe auf der Interactions-Seite jetzt [den IndieWeb-Wiki-Eintrag](https://indieweb.org/Webmention) verlinkt, aber danach muss man eigentlich [ein analoges IndieWebCamp besuchen](https://eay.cc/2016/indiewebcamp-duesseldorf/), um das zu verstehen. Ich würde die Webmention-Mentions hier gerne sinnvoller/zugänglicher verlinken.

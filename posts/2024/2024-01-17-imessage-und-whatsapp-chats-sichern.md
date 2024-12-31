---
title: "iMessage- und WhatsApp-Chats sichern"
date: "2024-01-17"
datetime: "2024-01-17 11:44:31"
id: "39423"
slug: "imessage-und-whatsapp-chats-sichern"
url: "https://eay.cc/2024/imessage-und-whatsapp-chats-sichern/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - apple
  - apps
  - ios
  - mac
  - whatsapp
meta:
  - geo_latitude: "51.00009"
  - geo_longitude: "6.794237"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/3pi"
  - _share_on_mastodon_url: "https://eay.social/@eay/111770879497079669"
  - content_copy: "https://staging.bsky.app/profile/eay.social/post/3kj6brp3usc26"
  - _share_on_mastodon: "0"
---

![](https://eay.cc/uploads/2024/imessage-backup.png)

[Manchmal](https://eay.cc/2024/mama/) möchte man ja Chats mit ausgewählten Mitmenschen sichern, um so etwa Erinnerungen festzuhalten oder auch um im großen Stil an die nur dort vorhandenen Mediendateien zu kommen. Das gestaltet sich jedoch bei den diversen Messengern, in unserem Fall namentlich Apples Nachrichten a.k.a. iMessage, sowie WhatsApp, durchaus schwierig.

Ich habe mich am Wochenende durch diverse Threads und Tools geklickt und mit den folgenden beiden Open-Source-Tools Lösungen gefunden, die den Job gut erledigen; minimale Terminal- und Datei­system­kenntnisse vorausgesetzt.

- [imessage-exporter](https://github.com/ReagentX/imessage-exporter/) von [Christopher Sardegna](https://github.com/ReagentX) blickt in die lokale iMessage-Datenbank auf macOS und generiert daraus eine hübsche HTML-Datei für jede Konversation samt Mediendateien, blauen und grünen Bubbles. Jede Konversation bekommt dabei ein eigenes Asset-Folder für optimale Portabilität.
- [WhatsApp-Chat-Exporter](https://github.com/KnugiHK/WhatsApp-Chat-Exporter) von [KnugiHK](https://github.com/KnugiHK) kann in ein verschlüsseltes oder – das lag mir vor – unverschlüsseltes iOS-Backup schauen und daraus dann ebenfalls HTML-Dateien samt Mediendateien extrahieren. Erfüllt den Job, legt dabei aber noch Dutzende weitere, kryptische WhatsApp-Files an. Bin beim Prozess in zwei Fehler reingelaufen, deren Lösung sich jedoch schon in [den Issues](https://github.com/KnugiHK/WhatsApp-Chat-Exporter/issues) fand.

Problematisch bei beiden Tools: Personennamen werden nur unzureichend zugeordnet, wenn überhaupt (das war WhatsApp besser). Zudem kann man beiden beiden nicht einzelne Konversationen extrahieren, sondern immer nur alle. Da hilft aber natürlich nachträgliches Löschen.

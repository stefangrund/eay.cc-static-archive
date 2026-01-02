---
title: "macOS Tahoe vs. Electron"
date: "2025-10-15"
datetime: "2025-10-15 13:59:31"
id: "40641"
slug: "macos-tahoe-vs-electron"
url: "https://eay.cc/2025/macos-tahoe-vs-electron/"
author: "eay"
format: "aside"
categories:
  - 0815
tags:
  - apple
  - apps
  - mac
meta:
  - geo_latitude: "51.000032"
  - geo_longitude: "6.79421"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/3wv"
  - _share_on_mastodon_url: "https://eay.social/@eay/115378066046209512"
  - content_copy: "https://bsky.app/profile/eay.social/post/3m3a6zuhtnm2o"
---

Es scheint [aktuell größere Probleme](https://mjtsai.com/blog/2025/09/30/electron-apps-causing-system-wide-lag-on-tahoe/) mit macOS Tahoe und dem Einsatz von Apps zu geben, die veraltete Versionen des Cross-Platform-Frameworks [Electron](https://www.electronjs.org/) nutzen. Craig Hockenberry hat [ein Detection-Script für diese Apps erstellt](https://furbo.org/2025/10/06/tahoe-electron-detector/) und bei mir sind einige betroffen. Was sich auch mit meiner Beobachtung deckt, dass auf dem M4 immer mal wieder die mit dem Script ausgemachten Apps einfrieren.

Das Problem ist mittlerweile aber wohl [von Electron-Seite gefixed](https://9to5mac.com/2025/10/11/macos-26-tahoe-electron-gpu-slowdown-bug-fix-rollout/) und sollte in den nächsten Tagen & Wochen durch Update der besagten Apps korrigiert werden. 🤞

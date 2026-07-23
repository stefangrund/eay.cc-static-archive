---
title: "Unsere neueste Smarthome-Spielerei: Push Notifications beim Haustürklingeln!"
date: "2017-02-26"
published_at: "2017-02-26T17:30:29Z"
id: "33268"
slug: "push-notifications-beim-haustuerklingeln"
permalink: "https://eay.cc/2017/push-notifications-beim-haustuerklingeln/"
author: "Stefan Grund"
format: "standard"
categories:
  - "08/15"
tags:
  - "best of"
  - "diy"
  - "home assistant"
  - "homematic"
  - "smarthome"
short_url: "https://eay.li/30i"
content_copy:
  - "https://twitter.com/eay/status/835919388217913344"
---

\[video src="https://eay.cc/uploads/video/smarthome-push-klingel.mp4" loop="on" height="400"\]

Das ganze funktioniert so, dass ein simpler [Sensor am Klingeldraht](https://www.elv.de/Homematic%C2%AE-Funk-Klingelsignalsensor-HM-Sen-DB-PCB/x.aspx/cid_726/detail_49649) unsere Homematic CCU2-Zentrale informiert, die wiederum den [Home Assistant](https://home-assistant.io/) auf einem Raspberry Pi informiert, der dann wiederum [Pushover](https://pushover.net/) informiert, dass dann eine Push Notifications auf's iPhone schickt. Klingt komplizierter, als es eigentlich ist und dafür, dass daran doch einige Parteien beteiligt sind, ist das Delay ausgesprochen gering.

---
title: "Bad UX may destroy the world"
date: "2018-01-15"
datetime: "2018-01-15 21:12:12"
id: "33992"
slug: "bad-ux-may-destroy-the-world"
url: "https://eay.cc/2018/bad-ux-may-destroy-the-world/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - hawaii
  - nordkorea
  - smart-phones-stupid-people
  - technologie
  - usa
  - user-experience-design
meta:
  - yourls_shorturl: "https://eay.li/336"
---

Am Samstagmorgen herrschte [bekanntlich](http://www.spiegel.de/panorama/gesellschaft/hawaii-38-minuten-todesangst-wegen-raketen-fehlalarm-a-1187822.html) und verständlicherweise Panik auf Hawaii, nachdem die Menschen fälschlicherweise die folgende Notfall­benachrichtigung auf ihre Smartphones geschickt bekamen:

![](https://eay.cc/uploads/2018/emergency-alert.jpg)

Der ansonsten ach so Twitter-freudige Präsident [golfte zu diesem Zeitpunkt](https://www.huffingtonpost.com/entry/trump-golf-hawaii-missile-alarm_us_5a5a9201e4b04f3c55a32242) und wusste sehr schnell, dass es sich um ein Fehlalarm handelte, hielt es aber ausge­rechnet diesmal nicht für nötig zum Handy zu greifen. Erst 38 Minuten später gab es Ent­warnung von offizieller Seite. Alsbald war der Schuldige [laut dem Leiter](https://twitter.com/CBCNews/status/952563892571566080) der Hawaii Emergency Management Agency ausgemacht:

> It's a human error. There is a screen that says: "Are you sure you want to do this?" That's already in place. We had one person, human error, and that thing was pushed anyway.

Später führte die Washington Post das [etwas weiter aus](https://www.washingtonpost.com/news/post-nation/wp/2018/01/14/hawaii-missile-alert-how-one-employee-pushed-the-wrong-button-and-caused-a-wave-of-panic/):

> Around 8:05 a.m., the Hawaii emergency employee initiated the internal test, according to a timeline released by the state. From a drop-down menu on a computer program, he saw two options: “Test missile alert” and “Missile alert.” He was supposed to choose the former; as much of the world now knows, he chose the latter, an initiation of a real-life missile alert.

Es lag also an einem spärlich beschrifteten Dropdown mit anschließender Confirm-Message, das falsch bedient wurde. So etwa wie dieses hier:

<script>var confirmMissileAlert=function(){window.confirm("Are you sure you want to do this?")&&alert("Sending missile alert...")},sendTestAlert=function(){window.confirm("Are you sure you want to do this?")&&alert("Sending test missile alert...")},missileSelection=function(e){"1"===e.value?sendTestAlert():"2"===e.value&&confirmMissileAlert()};</script>

Please select Test missile alert Missile alert

Was Frontend-Entwickler und UX-Designer schon lange wissen, scheint bei den Verantwortlichen von kritischer Infrastruktur noch nicht angekommen zu sein:

- Dropdowns, [per se doof](https://eay.cc/2016/you-know-what-fuck-drop-downs/), sind nicht das geeignete Bedienelement, um derart wichtige Entscheidungen zu treffen. Weder bei Bestellformularen, noch bei Raketenalarm­applikationen. Man sieht seine Auswahl/-möglichkeiten schlicht schlecht.
- Confirm-Messages werden, nachdem sie jahrzehntelang für jede kleinste und unsinnigste Aktion missbraucht wurden (danke, Microsoft), von uns allen so beiläufig bestätigt und ignoriert, dass sie im kritischen Kontext eigentlich keinen Sinn mehr haben und höchstens noch mit Zusatzaufwand funktionieren ("Um das Löschen zu bestätigen, bitte `LÖSCHEN` in das folgende Feld eingeben.").

In Hawaiis Emergency-App scheint das alles nicht beachtet worden zu sein. Wenn wir davon ausgehen, dass noch weitaus mehr Applikationen zur Steuerung von kritischer Infrastruktur ähnliche Mängel aufweisen, dann sind wir wahrscheinlich doch nicht so weit von der totalen Zerstörung des Planeten entfernt, wie uns der Nuklear-Code-Koffer glauben machen will/soll. **Update, 16.01.:** [Christoph](https://christophboecken.de/) schreibt in den Kommentaren: "Es wurde ein Screenshot vom Interface getwittert, und es ist tatsächlich noch schlimmer als gedacht: [twitter.com/CivilBeat/...](https://twitter.com/CivilBeat/status/953127542050795520)" – Stimmt. 😳

---
title: "Post to WordPress with Workflow"
date: "2015-11-24"
datetime: "2015-11-24 23:55:44"
id: "31009"
slug: "post-to-wordpress-with-workflow"
url: "https://eay.cc/2015/post-to-wordpress-with-workflow/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - apps
  - blogging
  - drafts
  - ios
  - output
  - wordpress
  - workflow
meta:
  - _oembed_de0b64bd51f3e46ab91e4f605d603c17: "{{unknown}}"
  - _oembed_2a26d122cfc30a4c0e36629e2a769713: "{{unknown}}"
  - yourls_shorturl: "https://eay.li/2r0"
---

Und wo wir [gerade](//eay.cc/2015/calypso-ein-neues-backend-fuer-wordpress-2/) bei WordPress und spannenden Smartphone-Apps sind: Die hervorragende und für mich mittlerweile unverzichtbare iOS-Automator-App [Workflow](https://geo.itunes.apple.com/us/app/workflow-powerful-automation/id915249334?mt=8&at=11lohW)\* wurde heute in einem Update um die Funktion auf WordPress-Seiten veröffentlichen zu können, erweitert. Und das erfreulicherweise mit allem drum und dran: Custom Fields, Post Formats, Featured Image, usw.

Da der offiziellen WordPress-App die Unterstützung sämtlicher Features seit jeher fehlt, kam die bisher maximal zum korrigieren für mich in Frage. Stattdessen nutzte ich die uralte Indie-App Poster, die allerdings nicht mehr weiterentwickelt wurde, nachdem [Automattic sich Entwickler und App einverleibt hat](//eay.cc/2013/automattic-kauft-ios-blogging-app-poster/) (mittlerweile ist [der Mann](http://www.tomwitkin.com/) bei Apple). Dank des WordPress-Supports in Workflow bin ich nun aber sogar in der Lage aus meiner Lieblingsnotiz-App [Drafts](https://geo.itunes.apple.com/us/app/drafts-4-quickly-capture-notes/id905337691?mt=8&at=11lohW)\* heraus schnell und einfach Blogeinträge zu veröffentlichen, gänzlich ohne Copy/Paste-Overkill. Heureka!

Mein Drafts-Template aus dem Workflow dann die entsprechenden Variablen zieht, sieht dabei folgendermaßen aus (anstelle von Drafts ist aber auch jede andere Text-/Notiz-App denkbar, die sowas als Plain Text an Workflow übergeben kann):

Title  
http://example.com/ (Link-Post only)

Paragraph #1.

Paragraph #2 and so on.

tag1, tag2, tag3

Hier findet ihr die dazugehörigen WordPress-Workflows, die ihr natürlich an euer Setup anpassen könnt/müsst:

- [**Workflow: Standard-Post**](https://workflow.is/workflows/dbeecb318d3f418c95c023a0e293b288)
- [**Workflow: Link-Post**](https://workflow.is/workflows/fa3b3965ab594f6fb4b3f7eb6c83731a)

Was dabei passiert ist recht einfach: Aus den einzelnen Zeilen werden Variablen (Zeile 1 = Titel, letzte Zeile = Tags, etc.), die dann an die WordPress-Funktion übergeben werden. Zudem werden diese vordefinierten Zeilen aus dem "Body", dem eigentlichen Beitrag, entfernt. Anschließend müsst ihr bestätigten, dass ihr den Beitrag wirklich an euer WordPress schicken wollt und angeben, welchen Status dieser haben soll (Entwurf/veröffentlicht).

Zur Veranschaulichung hier noch der Link-Workflow in Bildform:

![](https://eay.cc/uploads/2015/workflow_overview.png)

\* App-Store-Partnerlinks. Support your local eay! ✌️

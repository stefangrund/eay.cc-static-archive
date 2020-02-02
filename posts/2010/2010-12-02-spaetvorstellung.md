---
title: "Wordpress-Plugin: Spätvorstellung"
date: "2010-12-02"
datetime: "2010-12-02 11:37:31"
id: "11001"
slug: "spaetvorstellung"
url: "https://eay.cc/2010/spaetvorstellung/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - best-of
  - deutschland
  - jugendschutz
  - nsfw
  - output
  - plugin
  - projekte
  - spatvorstellung
  - wordpress
meta:
  - yourls_shorturl: "http://eay.li/12v"
---

### Prolog

Die Idee zu folgendem Plugin hatte ich Anfang des Jahres als ich auf der Arbeit auf den [Amy&Pinks](http://www.amypink.com/de/) und [electrus](http://www.electru.de/) dieser Welt herumsurfte (beides - einmal mehr, einmal weniger - Vertreter der eher nsfw'en Bloggerszunft). Manche der dort veröffentlichten Beiträge waren im wahrsten Sinne des Wortes unter der Gürtellinie und das ganze Blog somit am Büro-PC zur No-Go-Area verdammt. Schade: wegen ein paar Brüsten muss auf die Geschlechtsteil-freien, Pulitzer-Preis verdächten Artikel verzichtet werden. So will es der Arbeitgeber. Kann man nichts machen.

Kann man doch, dachte ich mir. Wenn ich hier anstößige Inhalte posten würde, würde ich meine arbeitende Leserschaft gerne vor der Bredouille, im Büro beim Surfen auf "diesem Schmuddelblog" erwischt zu werden, schützen. Warum also die entsprechenden Beiträge nicht erst zum Feierabend anzeigen? Effektiv und (wenn man's nicht übertreibt) ein lustiger Gag. Ich schrieb ein paar Zeilen Code, die genau das taten ... und hab nie wieder dran gedacht. Bis dieser Tage [das Ungetüm von JMStV mit seinen Folgen](http://t3n.de/news/neuer-jmstv-286977/) die Runde machte. Plötzlich waren Blog-Sendezeiten kein Gag mehr, sondern bittere Realität...

Nun bin ich wahrlich kein Freund dieser schwachsinnigen Regulierungswut, halte diese Sendezeitensache aber weiterhin für einen wahnwitzigen Gag (die Betonung liegt auf wahnwitzig). Deswegen und weil es für den ein oder anderen in Anbetracht der mysteriösen Gesetzeslage vielleicht doch nützlich ist, habe ich den Code nochmal rausgeholt und ein kleines WordPress-Plugin gebastelt.

### Das Plugin

Mein kleines WordPress-Plugin hört auf den Namen **Spätvorstellung** und ermöglicht es, einen Artikel oder eine Seite (oder auch nur einen Teil davon) erst nach und nur bis zu einer bestimmten Uhrzeit anzeigen zu lassen. So lassen sich "Sendezeiten" für einzelne Beiträge, z.B. von 22 bis 6 Uhr, einrichten. Tagsüber wird anstelle des eigentlichen Inhalts nur der folgende, beliebig anpassbare Hinweis angezeigt:

Der folgende Beitrag ist für Büro-PCs und Jugendliche unter 16 Jahren nicht geeignet, weshalb er **ausschließlich zwischen 22 und 6 Uhr zu sehen** ist. ([Warum?](#))

Zwischen 22 und 6 Uhr wird anstelle dieses Hinweises der eigentliche Beitrag plus die Info, dass dieser Beitrag nur in einer bestimmten Zeitspanne zu sehen ist, angezeigt. Hier könnt ihr euch das ganze einmal [**live und in Farbe ansehen**](//eay.cc/2010/webdesigners-pron-nsfw/).

### Einbindung

Der Inhalt (am besten ein ganzer Beitrag oder ein Absatz), der später angezeigt werden soll, wird einfach zwischen die zwei `[spaeter]`\-Shortcodes gesetzt:

`[spaeter]Dieser Inhalt wird später angezeigt.[/spaeter]`

Dabei ist all das möglich, was Wordpress auch sonst so kann. Embed-Codes von YouTube & Co. gehen genauso wie PHP via [PHP Execution](http://wordpress.org/extend/plugins/php-execution-plugin/) und so weiter. All das, was außerhalb der Shortcodes steht, wird ganz normal davor/danach angezeigt.

### Anforderungen

Spätvorstellung wurde mit Wordpress 3.0 getestet. Das Plugin nutzt Wordpress' [Shortcodes](http://codex.wordpress.org/Shortcode_API). Diese wurden mit Version 2.5 eingeführt, weshalb es durchaus möglich ist, dass das Plugin bereits ab 2.5 läuft. Wurde aber, wie gesagt, nicht getestet.

### Download & Installation

[![](https://eay.cc/uploads/pages/spaetvorstellung/icon_zip.gif)spaetvorstellung.zip  
Version 1.0 vom 02.12.2010](//eay.cc/uploads/software/spaetvorstellung.zip)

- spaetvorstellung.zip downloaden und entpacken
- den Ordner spaetvorstellung via FTP in den Ordner /wp-content/plugins/ kopieren
- das Plugin im Admin-Panel (unter "Plugins") aktivieren
- Fertig! - Spätvorstellung ist einsatzbereit, ggf. möchtest du noch etwas anpassen

### Anpassen

Spätvorstellung kann über das Admin-Panel (unter "Einstellungen / Spätvorstellung") komfortabel und, wie ich hoffe relativ selbsterklärend, an persönliche Bedürfnisse angepasst werden. Neben dem Zeitfenster lassen sich auch die Gestaltung und der Text der Hinweis-Infoboxen, sowie der Erklärungslink beliebig verändern.

![](https://eay.cc/uploads/pages/spaetvorstellung/anpassen.gif)

Mit der **Korrektur** ist es möglich die Zeit anzupassen, falls es durch Zeitumstellung, falsche Serverzeit usw. zu Unregelmäßigkeiten kommt. Wenn z.B. unter "Ab wann?" 22 Uhr eingestellt ist, der Beitrag nach 22 Uhr aber immer noch nicht angezeigt wird, ist es möglich, dass es _auf_ dem Server erst 21 Uhr ist. Mit `+1` ließe sich die Uhrzeit in dem Fall korrigieren.

Um die Standardeinstellungen wiederherzustellen, musst du das Plugin lediglich einmal deaktivieren und wieder aktivieren. Bedenke, dass das auch heißt, dass deine Spätvorstellung-Einstellungen verloren gehen, sobald du das Plugin deaktivierst. It's not a bug, it's a feature!

### Feedback

Ich freue mich über Fragen, Lob, Kritik, Verbesserungsvorschläge und entdeckte Bugs (okay, über die weniger) in den Kommentaren oder per Mail an ![](https://eay.cc/uploads/pages/about/rh45zhyr.gif).

---
title: "YouTube Music Player"
date: "2008-09-09"
datetime: "2008-09-09 12:02:45"
id: "1643"
slug: "youtube-music-player"
url: "https://eay.cc/2008/youtube-music-player/"
author: "eay"
format: "post"
categories:
  - 0815
tags:
  - bastelei
  - how-to
  - musik
  - output
  - webservice
  - youtube
meta:
  - yourls_shorturl: "http://eay.li/8m"
---

Wie ihr hier [ab](//eay.cc/2008/eine-kleine-geschichte-an-der-sich-andere-musiker-ein-beispiel-nehmen-sollten/) und [zu](//eay.cc/2008/remix-wahnsinn/) sehen könnt, pimpe ich meine Blogeinträge schon mal gerne mit Musik. Diese wird dann hier in einem hübschen Flashplayer präsentiert und zumeist von mir selbst oder von anderen legalen Quellen gehostet. Gerade letzteres hat zur Folge, dass man immer nur Jahrzehnte alte Musik oder vom Urheber (wie auch immer) freigegebene MP3s einbinden kann, ohne dass mir irgendein unausgelasteter Sesselpupser gleich die ganze Bude zumacht.

Trotzdem möchte man manchmal auch ein aktuelles bzw. ein nicht frei erhältliches Stück miteinbringen. Wenn ich z.B. einen Eintrag über ein brennendes Hamburg schreibe, was wäre geschmackloser und würde sich wohl mehr anbieten als diesen mit [Hamburg brennt](http://www.youtube.com/watch?v=gl6yeBxm6P8) von 1000 Robota zu untermalen?

Nun kann man immer noch auf YouTube zurückgreifen, das Sammelsurium an offiziellen und inoffiziellen Musikvideos, und von der GEMA abgesichert. Doch möchte ich hier nicht immer immer uninteressante Videos reinpacken, nur weil der Song ganz nett ist. Es bräuchte daher einen YouTube-Player, der nur Musik abspielt - et voilÃ , [hier](http://eleph.antville.org/stories/1833232/) ist er:

**So funktioniert's:** Einfach im Embed-Code aus dem gewünschten YouTube-Video die Höhe zwei Mal auf 25 umändern, damit der Code folgendermaßen aussieht:

`<object width="425" height="25"><param name="movie" value="http://www.youtube.com/v/gl6yeBxm6P8&hl=de&fs=1"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/gl6yeBxm6P8&hl=de&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="25"></embed></object>`

Der Code ist natürlich, wie von sämtlichen YouTube-Codes gewohnt, alles andere als valide, erfüllt dafür aber in allen angesagten Browsern seinen Zweck.

_(überarbeitet am 11. Mai 2009)_

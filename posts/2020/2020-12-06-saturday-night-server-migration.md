---
title: "Saturday Night Server Migration"
date: "2020-12-06"
published_at: "2020-12-06T11:22:36Z"
id: "36860"
slug: "saturday-night-server-migration"
permalink: "https://eay.cc/2020/saturday-night-server-migration/"
author: "Stefan Grund"
format: "standard"
categories:
  - "08/15"
tags:
  - "all-inkl"
  - "domainfactory"
  - "eayz"
  - "in eigener sache"
  - "web-entwicklung"
short_url: "https://eay.li/jt"
content_copy:
  - "https://twitter.com/eay/status/1335548895452082178"
---

Ich habe am gestrigen Abend das gemacht, was man Samstagabends 2020 so macht: Einen Film geschaut (»[Guns Akimbo](https://www.imdb.com/title/tt6902676/)«, in dem man Daniel Radcliffe unfreiwilligerweise Waffen an die Hände montiert hat und ihn live gestreamt an einem Real-Life-Deathmatch teilnehmen lässt) und danach diverse Webprojekte, u.a. dieses hier, auf einen neuen Server umgezogen. Was hat man früher nochmal Samstagabends gemacht? Ich weiß es nicht mehr.

Mein neues Abendprogramm habe ich allerdings auch nicht wirklich aus freien Stücken gewählt. DomainFactory, der Webhoster, den ich seit 2003 (!) für die Verbreitung dieses Blogs und all meinen anderen, privaten Side Projects genutzt habe, hat mir quasi Tastatur und Maus an die Hände montiert und mich mit schlechtem Service, betagter Technik und tiefem Griff in meinen Geldbeutel dazu gezwungen, das zu ändern.

Konkret: Während DomainFactory einst insbesondere für größere WordPress-Installationen, wie eben dieses mittlerweile rund 3.400 Beiträge und 10.000 Kommentare umfassende Blog oder [shortfil.ms](https://shortfil.ms/), die von mir und meinem Mitstreiter sträflich vernachlässigte, aber immer noch sehr populäre Kurzfilm­plattform, die erste Wahl war, ist das schon länger nicht mehr der Fall. Wenn dann noch ein paar große [Matomo](https://matomo.org/matomo-on-premise/)-Installationen dazu kommen, grenzte das bei DomainFactory in den letzten Jahren an Arbeitsverweigerung. Abgerundet wird das Trauerspiel durch ein hilfefreies Support-Forum, in dem man seit Jahren um Node.js-Unterstützung jenseits von 0.x bettelt und Unterstützung für [Let's Encrypt](https://letsencrypt.org/)-Zertifikate einfordert. Gut, dass immerhin die alten Threads regelmässig aussortiert werden, wie es scheint.

Überhaupt sind die SSL-Zertifikate die größte Unverschämtheit, die man sich bei DomainFactory seit Jahren gefallen lassen muss. Während die gesamte Industrie dazu übergangen ist, kostenfreie SSL-Zertifikate auf Basis von Let's Encrypt anzubieten, ist in den Managed-Hosting-Tarifen von DF ein einzelnes (!) Zertifikat enthalten, jedes weitere kostet mittlerweile 2,99 Euro pro Monat (!) und Subdomain (!). Das muss man sich mal auf der Zunge zergehen lassen.

Auftritt All-Inkl: Auf meiner Suche nach Alternativen hat mir dann [Tom](https://www.webrocker.de/) vor ein paar Monaten [All-Inkl](https://all-inkl.com/PA592F9B391F215) [^1] empfohlen. Eine Empfehlung die dann in den Folgemonaten das ein oder andere Mal von anderer Stelle wiederholt wurde. Man solle sich nicht von dem Pauschal­touristen­namen und dem 1999er Backend abschrecken lassen, der Dienst sei gut. Und was soll ich sagen: das stimmt. Die Seiten, die ich gestern dorthin portiert habe, sind _lightning fast_. Diese Performance sieht man dann doch eher selten bei Managed-Hosting-Angeboten. Der Import der 1,8 GB großen Matomo-Datenbank von shortfil.ms, war überhaupt kein Problem und das Matomo-Interface rennt im Vergleich zu DF. Gleiches bei den WordPress-Seiten, die so schnell laden, dass ich bei meinen anfänglichen Tests dachte, die wären gecached, obwohl ich das Caching noch nicht aktiviert hatte. 🤯

Hinzu kommt, dass sich Let's Encrypt-Zertifikate, wie es sich gehört, komfortabel und natürlich kostenfrei über das Backend aktivieren lassen. Seit gestern kann damit auch mein URL-Shortener [eay.li](https://eay.li/) endlich HTTPS.

Ansonsten laufen wie gesagt erstmal [eay.cc](https://eay.cc/) und [shortfil.ms](https://shortfil.ms/) auf dem neuen ALL-INKL-System. Solltet ihr wider Erwarten irgendwelche Unstimmigkeiten bemerken, bitte melden. Ansonsten werde ich die nächsten Samstagabende nun damit verbringen, mich nach und nach immer weiter aus dem DomainFactory-Kosmos zu entfernen.

[^1]: Partnerlink von Tom

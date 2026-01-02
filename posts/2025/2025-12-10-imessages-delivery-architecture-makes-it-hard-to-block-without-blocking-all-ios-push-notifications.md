---
title: "iMessage’s delivery architecture makes it hard to block without blocking all iOS push notifications"
date: "2025-12-10"
datetime: "2025-12-10 09:04:59"
id: "40796"
slug: "imessages-delivery-architecture-makes-it-hard-to-block-without-blocking-all-ios-push-notifications"
url: "https://eay.cc/2025/imessages-delivery-architecture-makes-it-hard-to-block-without-blocking-all-ios-push-notifications/"
author: "eay"
format: "link"
categories:
  - 0815
tags:
  - apple
  - imessage
  - russland
  - zensur
meta:
  - linked_list_url: "https://daringfireball.net/2025/12/imessage_push_notifications_hard_to_block"
  - geo_latitude: "50.973837"
  - geo_longitude: "6.683007"
  - geo_public: "1"
  - yourls_shorturl: "https://eay.li/3xq"
  - _share_on_mastodon_url: "https://eay.social/@eay/115694233259668758"
  - linked_list_og-title: "iMessage’s Delivery Architecture Makes It Hard to Block Without Blocking All iOS Push Notificat..."
  - linked_list_og-description: "Draw your own conclusions about cellular carriers and enterprise network administrators being similar to authoritarian governments."
  - linked_list_og-image: "https://eay.cc/wordpress/uploads/og-cache/98f5cdcc416080f7ddeb8037b618f642.webp"
  - content_copy: "https://bsky.app/profile/eay.social/post/3m7mm3mfsjc2b"
---

Interessant: Wer iMessage blocken will, muss alle Push Notifications auf Apple-Plattformen blockieren. Hintergrund ist, dass iMessage auf dem [Apple Push Notification Service](https://en.wikipedia.org/wiki/Apple_Push_Notification_service) basiert, dem Protokoll und Dienst zum Versand der Benachrichtigungen.

John Gruber vermutet, dass das ursprünglich ein Weg war, um es den Mobilfunkanbietern schwerer bis unmöglichen zu machen, Apples Messaging-Dienst zu deaktivieren. Heute erschwert es die Staatszensur, wie zuletzt z.B. [in Russland, wo neuerdings FaceTime und Snapchat blockiert sind](https://daringfireball.net/linked/2025/12/07/russia-blocks-facetime-and-snapchat), iMessage jedoch nicht.

**Update, 13.12.:** John Gruber hat [noch ergänzt](https://daringfireball.net/linked/2025/12/12/imessage-apns-attachments), das Anhänge oder zu lange Nachrichten nicht per APNs verschickt werden, sondern verschlüsselt zu iCloud hochgeladen werden, woraufhin dem Empfänger per iMessage die Metadaten zum Download und Entschlüsseln geschickt werden, siehe [dieses Apple-Support-Dokument](https://support.apple.com/de-de/guide/security/sec70e68c949/web).

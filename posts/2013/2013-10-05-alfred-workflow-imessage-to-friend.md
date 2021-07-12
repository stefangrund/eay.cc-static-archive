---
title: "Alfred Workflow: iMessage to Friend"
date: "2013-10-05"
datetime: "2013-10-05 14:04:21"
id: "25369"
slug: "alfred-workflow-imessage-to-friend"
url: "https://eay.cc/2013/alfred-workflow-imessage-to-friend/"
author: "eay"
format: "post"
categories:
  - 0815
  - english
tags:
  - alfred
  - applescript
  - imessage
  - mac
  - output
  - projekte
meta:
  - _wp_page_template: "default"
  - yourls_shorturl: "https://eay.li/alfred2imessage"
---

![](https://eay.cc/uploads/2021/imessage-to-friend-v1.3.png) 

While working, everything can be a distraction: Twitter, email, your co-workers and texts from iMessage, of course. Answering your friends' texts will take you out of your workflow and after that, it takes minutes to get back into it.

That's why I created the [Alfred](http://www.alfredapp.com/) workflow "iMessage to Friend", which allows you to directly write and send a message to a friend from within Alfred. Just hit Alfred's hotkey, enter your friends (nick)name, write a message, hit enter and you're done. No more clicking and application switching required. In order to use workflows you will need the [Powerpack version](http://www.alfredapp.com/powerpack/) of Alfred v2 or higher.

### Download

[![](https://eay.cc/uploads/2013/alfred2_workflow_icon.png)**iMessage to Friend.alfredworkflow**](//eay.cc/uploads/software/iMessage%20to%20Friend.alfredworkflow)  
Version 1.3, 08.05.2021

If you are looking for the old extension for Alfred v1 [click here](//eay.cc/2012/alfred-extension-imessage-to-friend/).

### Changelog

**1.3 (08.05.2021):** Add compatibility with macOS 11.0 Big Sur. **1.2 (05.10.2013):** Add compatibility with Alfred v2 and higher. **1.1 (05.01.2013):** Fixed bug in which the extension didn't work properly, if your iCloud account isn't the first account in iMessage's account list. (thanks to [@Cinematze](http://twitter.com/Cinematze) for reporting) **1.0 (05.12.2012):** First release of iMessage to Friend.

### Known issues

If you have more than one iCloud account enabled in iMessage, the workflow will only work with the first one. Group chats aren't possible, because they aren't supported through iMessage's AppleScript.

### Installation

After you have installed/imported the workflow, you´ll have to replace two things:

![](https://eay.cc/uploads/2013/alfred2_imessage_2.png)

**1.** Replace `Friend1` (and so on) in the trigger's keyword, title and subtext field with your friend´s (nick)name, e.g. `BFF` or `kira`:

![](https://eay.cc/uploads/2013/alfred2_imessage_3.png)

**2.** Replace `FRIEND1_IMESSAGE` in the corresponding AppleScript action with your friend´s phone number or email address, e.g. 00491501234567 (country code + prefix + number) or friend@icloud.com. Keep in mind that the number or email address must be activated for iMessage and don't remove the quotation marks:

![](https://eay.cc/uploads/2013/alfred2_imessage_4.png)

Repeat these steps for your other friends. If you have more than five friends, feel free to add more by copying the trigger and actions.

Now you're ready to go.

### How to use it

If your friend´s name is Kira and you´ve entered her phone number or email address and changed the corresponding keyword to "kira", hit your hotkey to open/enter Alfred and type something like:

> kira Hello Kira, how are you?

This will send an iMessage with the text "Hello Kira, how are you?" to Kira's iMessage-enabled phone number or email address. It's that simple.

### Feedback

Feel free to leave a comment, if you have a question, discovered a bug or just want to say hi. You can also [contact me on Twitter](https://twitter.com/eay).

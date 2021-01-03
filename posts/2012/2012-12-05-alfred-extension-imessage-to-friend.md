---
title: "Alfred extension: iMessage to Friend"
date: "2012-12-05"
datetime: "2012-12-05 17:22:51"
id: "21355"
slug: "alfred-extension-imessage-to-friend"
url: "https://eay.cc/2012/alfred-extension-imessage-to-friend/"
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
  - yourls_shorturl: "https://eay.li/alfredimessage"
---

![](https://eay.cc/uploads/2012/alfred_imessage_1.png)

While working, everything can be a distraction: Twitter, email, your co-workers and texts from iMessage, of course. Answering your friends' texts will take you out of your workflow and after that, it takes minutes to get back into it.

That's why I created the [Alfred](http://www.alfredapp.com/) extension "iMessage to Friend", which allows you to directly write and send a message to a friend from within Alfred. Just hit Alfred's hotkey, enter your friends (nick)name, write a message, hit enter and you're done. No more clicking and application switching required. In order to use extensions you will need the [Powerpack version](http://www.alfredapp.com/powerpack/) of Alfred.

### Download

**Old version!** This version of "iMessage to Friend" only works with Alfred v1. If you're looking for the [updated **workflow for Alfred v2** click here](http://eay.cc/projects/alfred-workflow-imessage-to-friend/).

[![](https://eay.cc/uploads/2012/icon_alfredextension.gif)iMessage to Friend.alfredextension](//eay.cc/uploads/software/iMessage%20to%20Friend.alfredextension)  
Version 1.1, 05.01.2013, **for Alfred v1**

### Changelog

**1.1 (05.01.2013):** Fixed bug in which the extension didn't work properly, if your iCloud account isn't the first account in iMessage's account list. (thanks to [@Cinematze](http://twitter.com/Cinematze) for reporting) **1.0 (05.12.2012):** First release of iMessage to Friend.

### Known issues

If you have more than one iCloud account enabled in iMessage, the extension will only work with the first one.

### Installation

After you have installed the extension (by dragging it into the extension preference panel in Alfred), you'll have to select the "iMessage to Friend" extension and replace two things:

1. Replace `FRIENDS_NAME` in the title, description and keyword field with your friend's (nick)name, e.g. `BFF` or `Kira`.
    
    ![](https://eay.cc/uploads/2012/alfred_imessage_2.gif)
    
2. In the AppleScript text field replace `FRIENDS_IMESSAGE` with your friend's phone number or email address, e.g. `friend@icloud.com` or `00491501234567` (country code + prefix + number). Keep in mind that this number or email address must be activated for iMessage.
    
    ![](https://eay.cc/uploads/2012/alfred_imessage_3.gif)
    

Now you're ready to go.

### How to use it

If your friend's name is Kira and you've changed the title, description and most important the keyword to "Kira" (respectively "kira"), hit your hotkey to enter Alfred and type something like:

> kira Hello Kira, how are you?

This will send an iMessage with the text "Hello Kira, how are you?" to Kira's iMessage-enabled phone number or email address. It's that simple.

### But wait, I have more than one friend

Congratulations, you've done something right in your life. If you also want to message them via Alfred, just repeat the installation process and enter another name for the extension (see the screenshot), another friend's name and his contact information.

![](https://eay.cc/uploads/2012/alfred_imessage_4.png)

If you right click on the installed extension, you're also able to change it's name.

### Feedback

Feel free to leave a comment, if you have a question, discovered a bug or just want to say hi. You can also [contact me on Twitter](https://twitter.com/eay).

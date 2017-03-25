# stay-focused
An extension which doesn't let you browse social media and Youtube more than few seconds(kept for demonstration purposes). It utilises Web Extension APIs namely [alarm](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/alarms), [storage](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage) and [tabs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs) provided by Mozilla. It also comes with a preference page by which you can select which quote is to be loaded. 

## What it does

After N seconds of browsing on social media(facebook, twitter) or youtube (defined as the user not having navigated
or switched away from the active tab) it loads a stay focused image quote in browser. It works with every browser(Chrome, Edge, Firefox desktop, Firefox for Android and others). 

"N" is set to 6 seconds in this example. Such a short period is chosen to make
the extension's behavior more obvious, but this is not recommended in real life.
Note that in Chrome, alarms cannot be set for less than a minute. In Chrome:

* if you install this extension "unpacked", you'll see a warning
in the console, but the alarm will still go off after 6 seconds
* if you package the extension and install it, then the alarm will go off after
a minute.

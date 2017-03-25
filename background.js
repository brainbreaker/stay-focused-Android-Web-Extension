/*
DELAY is set to 6 seconds in this example. Such a short period is chosen to make
the extension's behavior more obvious, but this is not recommended in real life.
Note that in Chrome, alarms cannot be set for less than a minute. In Chrome:

* if you install this extension "unpacked", you'll see a warning
in the console, but the alarm will still go off after 6 seconds
* if you package the extension and install it, then the alarm will go off after
a minute.
*/
var DELAY = 0.1;
var defaultSettings = {
  dataTypes: "https://s-media-cache-ak0.pinimg.com/736x/af/32/a6/af32a6db6799496edd3e948efb07ed04.jpg"
};
var quoteURL = defaultSettings.dataTypes;
var facebookURLSubstring = "facebook";
var twitterURLSubstring = "twitter";
var youtubeSubstring = "youtube"; 

/*
Generic error logger.
*/
function onError(e) {
  console.error("Error: "+e);
}

/*
On startup, check whether we have stored settings of URL.
If we don't, then store the default quoteURL.
*/
function checkStoredSettings(storedSettings) {
  if (!storedSettings.dataTypes) {
    browser.storage.local.set(defaultSettings);
  }
}

const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(checkStoredSettings, onError);

/*
Restart alarm for the currently active tab, whenever background.js is run.
*/
var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
gettingActiveTab.then((tabs) => {
  restartAlarm(tabs[0].id);
});

/*
Restart alarm for the currently active tab, whenever the user navigates.
*/
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (!changeInfo.url) {
    return;
  }
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  gettingActiveTab.then((tabs) => {
    if (tabId == tabs[0].id) {
      restartAlarm(tabId);
    }
  });
});

/*
Restart alarm for the currently active tab, whenever a new tab becomes active.
*/
browser.tabs.onActivated.addListener((activeInfo) => {
  restartAlarm(activeInfo.tabId);
});

/*
restartAlarm: clear all alarms,
then set a new alarm for the given tab.
*/
function restartAlarm(tabId) {
  browser.pageAction.hide(tabId);
  browser.alarms.clearAll();
  var gettingTab = browser.tabs.get(tabId);
  gettingTab.then((tab) => {
    if ((tab.url.indexOf(facebookURLSubstring) != -1) || (tab.url.indexOf(twitterURLSubstring) != -1) 
      || (tab.url.indexOf(youtubeSubstring) != -1)) {
      browser.alarms.create("", {delayInMinutes: DELAY});
    }
  });
}

function focusMe(storedSettings) {
  quoteURL = storedSettings.dataTypes;
  console.log("quoteURL: "+ quoteURL);
  browser.tabs.update({url: quoteURL});
}
/*
On alarm, load the quote after fetching the URL from settings.
*/
browser.alarms.onAlarm.addListener((alarm) => {
  var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
  // browser.about.log("You did it!!");
  gettingActiveTab.then((tab) => {
    const gettingStoredSettings = browser.storage.local.get();
    gettingStoredSettings.then(focusMe, onError);
  });
});


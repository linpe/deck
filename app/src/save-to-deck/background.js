/* eslint-disable no-undef */
chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.sync.get('showing', function(data) {
    if (data.showing) {
      chrome.tabs.executeScript(null, {
        code:
          'document.getElementById("deck-entry-point") && document.getElementById("deck-entry-point").parentNode.removeChild(document.getElementById("deck-entry-point"))',
      });
      chrome.storage.sync.set({ showing: false });
    } else {
      chrome.tabs.executeScript(null, { file: './static/js/index.js' });
      chrome.storage.sync.set({ showing: true });
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.close) {
    chrome.tabs.executeScript(null, {
      code:
        'document.getElementById("deck-entry-point") && document.getElementById("deck-entry-point").parentNode.removeChild(document.getElementById("deck-entry-point"))',
    });
    chrome.storage.sync.set({ showing: false });
    sendResponse({ closed: true });
    return true;
  }
});

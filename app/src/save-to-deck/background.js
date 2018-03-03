/* eslint-disable no-undef */
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.executeScript(null, { file: './static/js/index.js' });
});

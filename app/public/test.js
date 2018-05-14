document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    chrome.storage.sync.set({
      uid: 1234,
    });
  });
});

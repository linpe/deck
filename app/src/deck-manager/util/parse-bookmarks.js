import toPairs from 'lodash/toPairs';

export function parseBookmark([linkId, link]) {
  return {
    ...link,
    id: linkId,
  };
}

export function parseBookmarks(bookmarks) {
  const bookmarkEntries = toPairs(bookmarks);
  return bookmarkEntries.map(([folder, links]) => [folder, Object.entries(links).map(parseBookmark)]);
}

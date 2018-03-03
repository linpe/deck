import toPairs from 'lodash/toPairs';

function parseBookmark([linkId, link]) {
  return {
    ...link,
    id: linkId,
  };
}

export default function parseBookmarks(bookmarks) {
  const bookmarkEntries = toPairs(bookmarks);
  return bookmarkEntries.map(([folder, links]) => [folder, Object.entries(links).map(parseBookmark)]);
}

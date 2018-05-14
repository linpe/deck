import React from 'react';
import PropTypes from 'prop-types';
import Card from '../components/card';
import CardList from '../components/card-list';
import { parseBookmark } from '../util/parse-bookmarks';

const FolderDetail = ({ bookmarks, match, onDeleteBookmarkClick }) => {
  const folder = match.url.slice(1)[0].toUpperCase() + match.url.slice(2);
  const bookmarkItems = Object.entries(bookmarks.items[folder]).map(parseBookmark);

  return (
    <CardList heading={folder} canGoBack>
      {bookmarkItems.map(link => (
        <Card {...link} folder={folder} key={link.id} onDeleteBookmarkClick={onDeleteBookmarkClick} />
      ))}
    </CardList>
  );
};

FolderDetail.propTypes = {
  bookmarks: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  onDeleteBookmarkClick: PropTypes.func.isRequired,
};

export default FolderDetail;

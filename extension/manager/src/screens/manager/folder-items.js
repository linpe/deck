import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import Title from '../../components/title';
import styles from './folder-items.css';

const FolderItems = ({ bookmarks, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h1 className={styles.title}>
        <Title>Your Deck</Title>
      </h1>
      <div className={styles.list}>{bookmarks.map((bookmark, index) => <Card {...bookmark} key={index} />)}</div>
    </div>
  );
};

FolderItems.propTypes = {
  bookmarks: PropTypes.array,
  show: PropTypes.bool,
};

FolderItems.defaultProps = {
  bookmarks: [],
  show: false,
};

export default FolderItems;

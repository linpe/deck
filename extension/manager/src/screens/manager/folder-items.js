import React from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import Title from '../../components/title';
import styles from './folder-items.css';

const FolderItems = ({ bookmarks, folder, onToggleSelected, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div>
      <h1 className={styles.title}>
        <Title>{folder}</Title>
      </h1>
      <div className={styles.list}>
        {bookmarks.map((bookmark, index) => <Card {...bookmark} key={index} onToggleSelected={onToggleSelected} />)}
      </div>
    </div>
  );
};

FolderItems.propTypes = {
  onToggleSelected: PropTypes.func.isRequired,
  bookmarks: PropTypes.array,
  folder: PropTypes.string,
  show: PropTypes.bool,
};

FolderItems.defaultProps = {
  bookmarks: [],
  folder: undefined,
  show: false,
};

export default FolderItems;

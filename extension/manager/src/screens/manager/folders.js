import React from 'react';
import PropTypes from 'prop-types';
import Folder from './folder';
import FolderPlaceholder from './folder-placeholder';
import Title from '../../components/title';
import styles from './folders.css';

const Folders = ({ folders, loading, onFolderClick, show }) => {
  if (!show) {
    return null;
  }

  let items;
  if (loading) {
    items = [1, 2, 3].map(index => <FolderPlaceholder key={index} />);
  } else {
    items = folders.map((folder, index) => <Folder key={index} label={folder} onClick={() => onFolderClick(folder)} />);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Title>Your Deck</Title>
      </h1>
      <div className={styles.list}>{items}</div>
    </div>
  );
};

Folders.propTypes = {
  folders: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  onFolderClick: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

Folders.defaultProps = {
  show: false,
};

export default Folders;

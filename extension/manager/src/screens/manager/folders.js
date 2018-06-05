import React from 'react';
import PropTypes from 'prop-types';
import Folder from './folder';
import Title from '../../components/title';
import styles from './folders.css';

const Folders = ({ folders, onFolderClick, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <Title>Your Deck</Title>
      </h1>
      <div className={styles.list}>
        {folders.map((folder, index) => <Folder key={index} label={folder} onClick={() => onFolderClick(folder)} />)}
      </div>
    </div>
  );
};

Folders.propTypes = {
  folders: PropTypes.array.isRequired,
  onFolderClick: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

Folders.defaultProps = {
  show: false,
};

export default Folders;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './folder.css';

const Folder = ({ label }) => (
  <div className={styles.folder}>
    <p className={styles.folderName}>{label}</p>
  </div>
);

Folder.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Folder;

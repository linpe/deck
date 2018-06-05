import React from 'react';
import PropTypes from 'prop-types';
import styles from './folder.css';

const Folder = ({ label, onClick }) => (
  <div className={styles.container}>
    <button className={styles.folder} onClick={onClick}>
      <p className={styles.label}>{label}</p>
    </button>
  </div>
);

Folder.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Folder;

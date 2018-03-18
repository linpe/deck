import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './folder.css';

const Folder = ({ label }) => (
  <Link className={styles.folder} to={`/${label.toLowerCase()}`}>
    <p className={styles.folderName}>{label}</p>
  </Link>
);

Folder.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Folder;

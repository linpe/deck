import React from 'react';
import PropTypes from 'prop-types';
import styles from './action-bar.css';

const ActionBar = ({ onDelete }) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <button className={styles.button} onClick={onDelete}>
        Delete
      </button>
    </div>
  </div>
);

ActionBar.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default ActionBar;

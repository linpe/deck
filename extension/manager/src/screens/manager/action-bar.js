import React from 'react';
import PropTypes from 'prop-types';
import styles from './action-bar.css';

const ActionBar = ({ deleteDisabled, onDelete }) => (
  <div className={styles.container}>
    <div className={styles.inner}>
      <button className={styles.button} disabled={deleteDisabled} onClick={onDelete}>
        Delete
      </button>
    </div>
  </div>
);

ActionBar.propTypes = {
  deleteDisabled: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ActionBar;

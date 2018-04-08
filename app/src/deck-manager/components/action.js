import React from 'react';
import PropTypes from 'prop-types';
import styles from './action.css';

const Action = ({ children, buttonLabel, onClick }) => (
  <div className={styles.action}>
    <button className={styles.actionButton} onClick={onClick}>
      {buttonLabel}
    </button>
    {children && <div className={styles.popout}>{children}</div>}
  </div>
);

Action.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

Action.defaultProps = {
  children: undefined,
};

export default Action;

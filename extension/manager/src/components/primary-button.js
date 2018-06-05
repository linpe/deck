import React from 'react';
import PropTypes from 'prop-types';
import styles from './primary-button.css';

const PrimaryButton = ({ children, disabled, onClick, type }) => (
  <button className={styles.button} disabled={disabled} onClick={onClick} type={type}>
    {children}
  </button>
);

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.string,
};

PrimaryButton.defaultProps = {
  disabled: false,
  onClick: () => {},
  type: 'submit',
};

export default PrimaryButton;

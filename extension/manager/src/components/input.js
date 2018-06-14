import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './input.css';

function inputClasses(value) {
  return classNames(styles.input, {
    [styles.inputFocused]: value.length > 0,
  });
}

const Input = ({ autoFocus, label, onChange, type, value }) => (
  <div className={styles.container}>
    <input autoFocus={autoFocus} className={inputClasses(value)} onChange={onChange} type={type} value={value} />
    <span className={styles.label}>{label}</span>
  </div>
);

Input.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
};

Input.defaultProps = {
  autoFocus: false,
};

export default Input;

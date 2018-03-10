import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './login.css';

function handleSubmit(onSubmit) {
  return event => {
    event.preventDefault();
    onSubmit();
  };
}

function inputClasses(value) {
  return classNames(styles.input, {
    [styles.inputFocus]: value.length > 0,
  });
}

const Login = ({ email, errors, loading, onChange, onSubmit, password }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.inputWrapper}>
      <input id="email" className={inputClasses(email)} onChange={onChange('email')} type="email" value={email} />
      <label htmlFor="email" className={styles.placeholder}>
        Email*
      </label>
    </div>
    <div className={styles.inputWrapper}>
      <input
        id="password"
        className={inputClasses(password)}
        onChange={onChange('password')}
        type="password"
        value={password}
      />
      <label htmlFor="password" className={styles.placeholder}>
        Password*
      </label>
    </div>
    <button className={styles.button} onClick={onSubmit} type="submit">
      {loading ? 'Signing in...' : 'Sign in'}
    </button>
    {errors.length > 0 && (
      <ul className={styles.errors}>{errors.map((error, index) => <li key={index}>{error}</li>)}</ul>
    )}
  </form>
);
Login.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  password: PropTypes.string,
};

Login.defaultProps = {
  email: '',
  errors: [],
  loading: false,
  password: '',
};

export default Login;

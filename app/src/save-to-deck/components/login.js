import React from 'react';
import PropTypes from 'prop-types';

function handleSubmit(onSubmit) {
  return event => {
    event.preventDefault();
    onSubmit();
  };
}

const Login = ({ errors, loading, onChange, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <input onChange={onChange('email')} placeholder="Email" type="email" />
    <input onChange={onChange('password')} placeholder="Password" type="password" />
    <button onClick={onSubmit} type="submit">
      {loading ? 'Signing in...' : 'Sign in'}
    </button>
    {errors && errors.map((errorMessage, index) => <div key={index}>{errorMessage}</div>)}
  </form>
);

Login.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
};

Login.defaultProps = {
  errors: [],
  loading: false,
};

export default Login;

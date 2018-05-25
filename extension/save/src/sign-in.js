import React from 'react';
import classNames from 'classnames';
import './sign-in.css';

function inputClasses(value) {
  return classNames('sign-in-input', {
    'is-focused': value.length > 0,
  });
}

function handleSubmit(event, onSignIn) {
  event.preventDefault();
  onSignIn();
}

const SignIn = ({ onChangeSignIn: onChange, signIn, onSignIn }) => {
  const buttonDisabled = !signIn.email || !signIn.password;
  let buttonLabel = signIn.sending ? 'Signing in...' : 'Sign in';

  return (
    <form onSubmit={event => handleSubmit(event, onSignIn)}>
      <h1 class="sign-in-header">Sign in</h1>
      <div className="sign-in-input-wrapper">
        <input
          className={inputClasses(signIn.email)}
          onChange={event => onChange('email', event.target.value)}
          type="email"
          value={signIn.email}
        />
        <span className="sign-in-label">Email</span>
      </div>
      <div className="sign-in-input-wrapper">
        <input
          className={inputClasses(signIn.password)}
          onChange={event => onChange('password', event.target.value)}
          type="password"
          value={signIn.password}
        />
        <span className="sign-in-label">Password</span>
      </div>
      <button className="sign-in-button" disabled={buttonDisabled}>
        {buttonLabel}
      </button>
    </form>
  );
};

export default SignIn;

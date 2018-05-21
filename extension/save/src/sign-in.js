import React from 'react';

function handleSubmit(event, onSignIn) {
  event.preventDefault();
  onSignIn();
}

const SignIn = ({ onChangeSignIn: onChange, signIn, onSignIn }) => {
  let buttonLabel = signIn.sending ? 'Signing in...' : 'Sign in';

  return (
    <form onSubmit={event => handleSubmit(event, onSignIn)}>
      <h1>Sign in</h1>
      <div>
        <span>Email</span>
        <input onChange={event => onChange('email', event.target.value)} type="email" value={signIn.email} />
      </div>
      <div>
        <span>Password</span>
        <input onChange={event => onChange('password', event.target.value)} type="password" value={signIn.password} />
      </div>
      <button>{buttonLabel}</button>
    </form>
  );
};

export default SignIn;

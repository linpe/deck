import React from 'react';
import Input from '../components/input';
import PrimaryButton from '../components/primary-button';
import Title from '../components/title';
import styles from './sign-in.css';

function handleSubmit(event, onSignIn) {
  event.preventDefault();
  onSignIn();
}

const SignIn = ({ onChangeSignIn: onChange, onSignIn, signIn }) => {
  const buttonDisabled = !signIn.email || !signIn.password;
  let buttonLabel = signIn.sending ? 'Signing in...' : 'Sign in';

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={event => handleSubmit(event, onSignIn)}>
        <h1 className={styles.title}>
          <Title>Sign in</Title>
        </h1>
        <Input
          label="Email"
          onChange={event => onChange('email', event.target.value)}
          type="email"
          value={signIn.email}
          autoFocus
        />
        <Input
          label="Password"
          onChange={event => onChange('password', event.target.value)}
          type="password"
          value={signIn.password}
        />
        <PrimaryButton disabled={buttonDisabled}>{buttonLabel}</PrimaryButton>
      </form>
    </div>
  );
};

export default SignIn;

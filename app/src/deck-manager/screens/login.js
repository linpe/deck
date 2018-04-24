import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import styles from '../../save-to-deck/components/login.css';

function inputClasses(value) {
  return classNames(styles.input, {
    [styles.inputFocus]: value.length > 0,
  });
}

class Login extends React.PureComponent {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    history: PropTypes.object.isRequired,
    logIn: PropTypes.func.isRequired,
  };

  state = {
    email: '',
    errors: [],
    loading: false,
    password: '',
  };

  componentDidMount = () => {
    if (this.props.authenticated) {
      this.props.history.push('/');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.authenticated) {
      this.props.history.push('/');
    }
  };

  onChange = fieldName => {
    return event => {
      this.setState({
        [fieldName]: event.target.value,
      });
    };
  };

  onSubmit = event => {
    event.preventDefault();

    if (this.state.email && this.state.password) {
      this.logIn(this.state.email, this.state.password);
    } else {
      this.setState({
        errors: ['Please enter an email address and password'],
      });
    }
  };

  logIn = (email, password) => {
    this.setState({ loading: true });

    this.props
      .logIn(email, password)
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          errors: ['Incorrect email or password'],
          loading: false,
        });
      });
  };

  render() {
    return (
      <div className={styles.loginContainer}>
        <form className={styles.login} onSubmit={this.onSubmit}>
          <div className={styles.inputWrapper}>
            <input
              id="email"
              className={inputClasses(this.state.email)}
              onChange={this.onChange('email')}
              type="email"
              value={this.state.email}
              autoFocus
            />
            <label htmlFor="email" className={styles.placeholder}>
              Email*
            </label>
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              className={inputClasses(this.state.password)}
              onChange={this.onChange('password')}
              type="password"
              value={this.state.password}
            />
            <label htmlFor="password" className={styles.placeholder}>
              Password*
            </label>
          </div>
          <button className={styles.button} onClick={this.onSubmit} type="submit">
            {this.state.loading ? 'Signing in...' : 'Sign in'}
          </button>
          {this.state.errors.length > 0 && (
            <ul className={styles.errors}>{this.state.errors.map((error, index) => <li key={index}>{error}</li>)}</ul>
          )}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);

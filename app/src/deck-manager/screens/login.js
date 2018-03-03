import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import isEmpty from 'lodash/isEmpty';

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
      this.props.history.push('/dashboard');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.authenticated) {
      this.props.history.push('/dashboard');
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
    const showErrors = !isEmpty(this.state.errors);

    return (
      <form onSubmit={this.onSubmit}>
        <label>
          <span>Email</span>
          <input onChange={this.onChange('email')} type="email" value={this.state.email} />
        </label>
        <label>
          <span>Password</span>
          <input onChange={this.onChange('password')} type="password" value={this.state.password} />
        </label>
        <button>{this.state.loading ? 'Signing in...' : 'Sign in'}</button>
        {showErrors && <div>{this.state.errors}</div>}
      </form>
    );
  }
}

export default withRouter(Login);

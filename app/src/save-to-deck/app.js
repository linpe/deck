import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import Add from './components/add';
import Login from './components/login';

class App extends React.PureComponent {
  static propTypes = {
    database: PropTypes.object.isRequired,
  };

  state = {
    folders: {},
    login: {
      email: '',
      password: '',
    },
    user: {},
    selectedFolder: {},
  };

  componentDidMount = async () => {
    try {
      const user = await this.getUserStatus();

      if (user) {
        this.getFolders();
      }
    } catch (error) {
      this.setState(state => ({
        ...state,
        user: {
          ...state.user,
          errors: ['We had an issue trying to verify you'],
        },
      }));
    }
  };

  getUserStatus = () => {
    this.setState({
      user: {
        loading: true,
      },
    });

    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          user: {
            loading: false,
            uid: user && user.uid,
          },
        });

        resolve(user);
      });
    });
  };

  getFolders = () => {
    this.setState({
      folders: {
        loading: true,
      },
    });

    this.props.database.ref(`/bookmarks/${this.state.user.uid}`).on('value', snapshot => {
      this.setState({
        folders: {
          items: Object.keys(snapshot.val()),
          loading: false,
        },
      });
    });
  };

  onLogInSubmit = () => {
    if (this.state.login.email && this.state.login.password) {
      this.logIn(this.state.login.email, this.state.login.password);
    } else {
      this.setState(state => ({
        ...state,
        login: {
          ...state.login,
          errors: ['Please enter an email address and password'],
        },
      }));
    }
  };

  onAddSubmit = () => {
    let folder;
    if (this.state.selectedFolder.value) {
      folder = this.state.selectedFolder.value;
    } else {
      folder = 'Uncategorised';
    }

    this.props.database.ref(`/bookmarks/${this.state.user.uid}/${folder}`).push({
      dateAdded: new Date().toISOString(),
      href: window.location.href,
      name: document.title,
    });
  };

  logIn = (email, password) => {
    this.setState(state => ({
      ...state,
      login: {
        ...state.login,
        loading: true,
      },
    }));

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(state => ({
          ...state,
          login: {
            ...state.login,
            loading: false,
          },
        }));
      })
      .catch(error => {
        this.setState(state => ({
          ...state,
          login: {
            ...state.login,
            loading: false,
            errors: ['Incorrect email or password'],
          },
        }));
      });
  };

  onChange = (slice, fieldName) => {
    return event => {
      event.persist();
      this.setState(state => ({
        ...state,
        [slice]: {
          ...state[slice],
          [fieldName]: event.target.value,
        },
      }));
    };
  };

  onSelectChange = selectedFolder => {
    this.setState({ selectedFolder });
  };

  render() {
    if (!this.state.user || this.state.user.loading) {
      return <div>Loading...</div>;
    }

    if (this.state.user.uid) {
      return (
        <Add
          folders={this.state.folders.items}
          loading={this.state.folders.loading}
          onChange={this.onSelectChange}
          onSubmit={this.onAddSubmit}
          selectedFolder={this.state.selectedFolder}
        />
      );
    }

    return (
      <Login
        {...this.state.login}
        onChange={fieldName => this.onChange('login', fieldName)}
        onSubmit={this.onLogInSubmit}
      />
    );
  }
}

export default App;

import React from 'react';
import firebase from 'firebase';
import Manager from './screens/manager';
import SignIn from './screens/sign-in';
import styles from './app.css';

const screens = {
  manager: Manager,
  'sign-in': SignIn,
};

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

class App extends React.PureComponent {
  state = {
    activeScreen: undefined,
    signIn: {
      email: '',
      error: undefined,
      password: '',
      sending: false,
    },
    user: undefined,
  };

  componentDidMount() {
    this.getStatus();
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getStatus = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.setState({
        activeScreen: user ? 'manager' : 'sign-in',
        user: user && user.uid,
      });
    });
  };

  onChangeSignIn = (field, value) => {
    this.setState(prevState => ({
      ...prevState,
      signIn: {
        ...prevState.signIn,
        [field]: value,
      },
    }));
  };

  signIn = () => {
    this.setState(prevState => ({
      ...prevState,
      signIn: {
        ...prevState.signIn,
        sending: true,
      },
    }));

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.signIn.email, this.state.signIn.password)
      .then(() => {
        this.setState(prevState => ({
          ...prevState,
          signIn: {
            ...prevState.signIn,
            sending: false,
          },
        }));
      })
      .catch(error => {
        this.setState(prevState => ({
          ...prevState,
          signIn: {
            ...prevState.signIn,
            error: error.message,
            sending: false,
          },
        }));
      });
  };

  signOut = () => {
    firebase.auth().signOut();
  };

  deleteBookmarks = () => {
    console.log('boop');
  };

  render() {
    let Screen;
    if (this.state.activeScreen) {
      Screen = screens[this.state.activeScreen];
    } else {
      Screen = () => <div>Placeholder</div>;
    }

    return (
      <div className={styles.app}>
        <Screen
          {...this.state}
          onChangeSignIn={this.onChangeSignIn}
          onDelete={this.deleteBookmarks}
          onSignIn={this.signIn}
          onSignOut={this.signOut}
        />
      </div>
    );
  }
}

export default App;

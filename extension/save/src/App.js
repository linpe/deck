import React from 'react';
import firebase from 'firebase';
import Placeholder from './placeholder';
import Save from './save';
import SignIn from './sign-in';
import './app.css';

const screens = {
  save: Save,
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
    folders: [],
    savedLink: {
      label: '',
      saved: false,
      saving: false,
      value: '',
    },
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
      this.setState(
        {
          activeScreen: user ? 'save' : 'sign-in',
          user: user && user.uid,
        },
        () => {
          this.getFolders();
        }
      );
    });
  };

  getFolders = () => {
    firebase
      .database()
      .ref(`/bookmarks/${this.state.user}`)
      .on('value', snapshot => {
        this.setState({
          folders: Object.keys(snapshot.val()),
        });
      });
  };

  onChangeSave = selectedFolder => {
    this.setState(prevState => ({
      ...prevState,
      savedLink: {
        ...prevState.savedLink,
        ...selectedFolder,
      },
    }));
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

  saveLink = event => {
    event.preventDefault();

    this.setState(prevState => ({
      ...prevState,
      savedLink: {
        ...prevState.savedLink,
        saving: true,
      },
    }));

    const folder = this.state.savedLink.value || 'Uncategorised';

    // eslint-disable-next-line
    chrome.tabs.query({ active: true, currentWindow: true }, ([currentTab]) => {
      firebase
        .database()
        .ref(`/bookmarks/${this.state.user}/${folder}`)
        .push({
          dateAdded: new Date().toISOString(),
          href: currentTab.url,
          name: currentTab.title,
        })
        .then(() => {
          this.setState(prevState => ({
            ...prevState,
            savedLink: {
              ...prevState.savedLink,
              saving: false,
            },
          }));
        });
    });
  };

  render() {
    let Screen;
    if (this.state.activeScreen) {
      Screen = screens[this.state.activeScreen];
    } else {
      Screen = Placeholder;
    }

    return (
      <div className="deck">
        <Screen
          {...this.state}
          onChangeSave={this.onChangeSave}
          onChangeSignIn={this.onChangeSignIn}
          onSaveLink={this.saveLink}
          onSignIn={this.signIn}
        />
      </div>
    );
  }
}

export default App;

import React from 'react';
import firebase from 'firebase';

const withUser = Component => {
  class WithUser extends React.PureComponent {
    state = {
      user: {},
    };

    componentDidMount = () => {
      this.getUserStatus();
    };

    getUserStatus = () => {
      this.setState({
        user: {
          loading: true,
        },
      });

      firebase.auth().onAuthStateChanged(user => {
        this.setState({
          user: {
            loading: false,
            uid: user && user.uid,
          },
        });
      });
    };

    logIn = (email, password) => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    logOut = () => {
      firebase.auth().signOut();
    };

    render() {
      return <Component {...this.props} user={this.state.user} logIn={this.logIn} logOut={this.logOut} />;
    }
  }

  return WithUser;
};

export default withUser;

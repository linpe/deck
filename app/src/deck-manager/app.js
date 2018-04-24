import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import withBookmarks from './containers/with-bookmarks';
import withFolders from './containers/with-folders';
import withUser from './containers/with-user';
import Home from './screens/home';
import Login from './screens/login';

const App = props => {
  if (isEmpty(props.user) || props.user.loading) {
    return 'Loading...';
  }

  const authenticated = !!props.user.uid;

  let screen;
  if (authenticated) {
    screen = <Home {...props} authenticated={authenticated} />;
  } else {
    screen = <Login authenticated={authenticated} logIn={props.logIn} />;
  }

  return <Router>{screen}</Router>;
};

export default flow([withFolders, withBookmarks, withUser])(App);

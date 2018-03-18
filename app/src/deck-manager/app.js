import React from 'react';
import { MemoryRouter as Router, Switch } from 'react-router-dom';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import withBookmarks from './containers/with-bookmarks';
import withFolders from './containers/with-folders';
import withUser from './containers/with-user';
import Home from './screens/home';
import Login from './screens/login';
import Route from './components/route';

const App = props => {
  if (isEmpty(props.user) || props.user.loading) {
    return 'Loading...';
  }

  const authenticated = !!props.user.uid;

  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} componentProps={{ ...props, authenticated }} />
        <Route path="/login" component={Login} componentProps={{ authenticated, logIn: props.logIn }} />
      </Switch>
    </Router>
  );
};

export default flow([withFolders, withBookmarks, withUser])(App);

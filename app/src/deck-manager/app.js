import React from 'react';
import PropTypes from 'prop-types';
import { MemoryRouter as Router, Switch } from 'react-router-dom';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import withBookmarks from './containers/with-bookmarks';
import withFolders from './containers/with-folders';
import withUser from './containers/with-user';
import Dashboard from './screens/dashboard';
import Home from './screens/home';
import Login from './screens/login';
import PrivateRoute from './components/private-route';
import Route from './components/route';

const App = ({
  addBookmark,
  bookmarks,
  deleteBookmark,
  deleteFolder,
  folders,
  getBookmarks,
  getFolders,
  logIn,
  logOut,
  user,
}) => {
  if (isEmpty(user) || user.loading) {
    return 'Loading...';
  }

  const authenticated = !!user.uid;

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} componentProps={{ authenticated }} />
        <Route path="/login" component={Login} componentProps={{ authenticated, logIn }} />
        <PrivateRoute
          path="/dashboard"
          authenticated={authenticated}
          component={Dashboard}
          componentProps={{
            addBookmark,
            bookmarks,
            deleteBookmark,
            deleteFolder,
            folders,
            getBookmarks,
            getFolders,
            logOut,
          }}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  addBookmark: PropTypes.func.isRequired,
  bookmarks: PropTypes.object.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  deleteFolder: PropTypes.func.isRequired,
  folders: PropTypes.object.isRequired,
  getBookmarks: PropTypes.func.isRequired,
  getFolders: PropTypes.func.isRequired,
  logIn: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default flow([withFolders, withBookmarks, withUser])(App);

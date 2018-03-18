import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import FolderDetail from './folder-detail';
import Header from '../components/header';
import PrivateRoute from '../components/private-route';

const Home = ({ authenticated, logOut, match, ...props }) => {
  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header onLogOutClick={logOut} />
      <Switch>
        <PrivateRoute
          exact
          path={match.url}
          component={Dashboard}
          componentProps={props}
          authenticated={authenticated}
        />
        <PrivateRoute
          path="/:folder"
          component={FolderDetail}
          componentProps={{ bookmarks: props.bookmarks }}
          authenticated={authenticated}
        />
      </Switch>
    </div>
  );
};

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  logOut: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};

export default Home;

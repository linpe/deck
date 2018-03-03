import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Route from './route';

const PrivateRoute = ({ authenticated, ...rest }) => {
  if (authenticated) {
    return <Route {...rest} />;
  }

  return <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default PrivateRoute;

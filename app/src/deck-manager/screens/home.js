import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const Home = ({ authenticated }) => {
  if (authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Redirect to="/login" />;
};

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default Home;

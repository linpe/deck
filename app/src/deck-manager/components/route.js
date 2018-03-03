import React from 'react';
import PropTypes from 'prop-types';
import { Route as BaseRoute } from 'react-router-dom';

const Route = ({ component: Component, componentProps, ...rest }) => (
  <BaseRoute {...rest} render={() => <Component {...componentProps} />} />
);

Route.propTypes = {
  component: PropTypes.func.isRequired,
  componentProps: PropTypes.object,
};

Route.defaultProps = {
  componentProps: {},
};

export default Route;

import React from 'react';
import PropTypes from 'prop-types';
import styles from './title.css';

const Title = ({ children }) => <span className={styles.title}>{children}</span>;

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;

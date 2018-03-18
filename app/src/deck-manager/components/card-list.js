import React from 'react';
import PropTypes from 'prop-types';
import styles from './card-list.css';

const CardList = ({ children, heading }) => (
  <div className={styles.body}>
    <h1 className={styles.heading}>{heading}</h1>
    <div className={styles.grid}>{children}</div>
  </div>
);

CardList.propTypes = {
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

export default CardList;

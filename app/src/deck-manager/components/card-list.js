import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './card-list.css';

const CardList = ({ canGoBack, children, heading }) => (
  <div className={styles.body}>
    <h1 className={styles.heading}>
      {canGoBack && (
        <div className={styles.backButtonContainer}>
          <Link className={styles.backButton} to="/" />
        </div>
      )}
      <span>{heading}</span>
    </h1>
    <div className={styles.grid}>{children}</div>
  </div>
);

CardList.propTypes = {
  canGoBack: PropTypes.bool,
  children: PropTypes.node.isRequired,
  heading: PropTypes.string.isRequired,
};

CardList.defaultProps = {
  canGoBack: false,
};

export default CardList;

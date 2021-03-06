import React from 'react';
import PropTypes from 'prop-types';
import styles from './header.css';

const Header = ({ onLogOutClick }) => (
  <header className={styles.header}>
    <div className={styles.headerInner}>
      <p className={styles.logo}>SiteDeck</p>
      <button className={styles.signOut} onClick={onLogOutClick}>
        Sign out
      </button>
    </div>
  </header>
);

Header.propTypes = {
  onLogOutClick: PropTypes.func.isRequired,
};

export default Header;

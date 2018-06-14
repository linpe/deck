import React from 'react';
import styles from './placeholder.css';

const Placeholder = () => (
  <div className={styles.container}>
    <div className={styles.header} />
    <div className={styles.body}>
      <div className={styles.title} />
    </div>
    <div className={styles.actionBar} />
  </div>
);

export default Placeholder;

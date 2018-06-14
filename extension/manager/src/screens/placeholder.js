import React from 'react';
import FolderPlaceholder from './manager/folder-placeholder';
import styles from './placeholder.css';

const Placeholder = () => (
  <div className={styles.container}>
    <div className={styles.header} />
    <div className={styles.body}>
      <div className={styles.titleContainer}>
        <div className={styles.title} />
      </div>
      <div className={styles.list}>
        <FolderPlaceholder />
        <FolderPlaceholder />
        <FolderPlaceholder />
      </div>
    </div>
    <div className={styles.actionBar} />
  </div>
);

export default Placeholder;

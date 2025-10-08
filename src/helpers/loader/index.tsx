import React from 'react';
import styles from './styles.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loader;
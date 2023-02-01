import React from 'react';
import styles from './banner.module.css';
import Image from 'next/image';
function Banner(props) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee Shop</span>
        <span className={styles.title2}>Locator</span>
      </h1>
      <p className={styles.subTitle}>Discover Coffee Store near by</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.handleOnClick}>
          {props.buttonText}
        </button>
      </div>
      
    </div>
  );
}

export default Banner;

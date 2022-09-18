import React from "react";
import styles from "../../styles/Home.module.css";
import image from "../../src/assets/3.png";
import Image from "next/image";

export default function Token(props) {
  return (
    <div className={styles.nft_page}>
      <h1 className={styles.heading}>Token Title here</h1>
      <div className={styles.nft_section}>
        <div className={styles.img}>
          <Image className={styles.img} src={image} />
        </div>
        <div className={styles.right}>
          <h2>NFT and Token Description</h2>
          <h4 className={styles.nft_desc}>
            {props.desc}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            nobis, tempora deleniti itaque provident, corrupti explicabo veniam
          </h4>

          <div className={styles.buy}>
            <h3>Purchase Token</h3>
            <label htmlFor="">Enter amount of your choice</label>
            <input type="number" />
            <label htmlFor="">You will recieve {props.token} 20 Tokens</label>
            <hr className={styles.hr} />
            <button className={`${styles.btn} ${styles.center}`}>
              Get Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

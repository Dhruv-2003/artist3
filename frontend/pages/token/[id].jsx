import React from "react";
import styles from "../../styles/Home.module.css";
import image from "../../src/assets/3.png";
import Image from "next/image";

export default function Token(props) {
  return (
    <div className={styles.nft_page}>
      <h1 className={styles.heading}>NFT title here</h1>
      <div className={styles.nft_section}>
        <div className={styles.img}>
          <Image className={styles.img} src={image} />
        </div>
        <div className={styles.right}>
          <h2>NFT Description</h2>
          <h4 className={styles.nft_desc}>
            {props.desc}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            nobis, tempora deleniti itaque provident, corrupti explicabo veniam
          </h4>

          <div className={styles.buy}>
            <h3>Purchase Fraction</h3>
            <label htmlFor="">You Pay</label>
            <input type="number" />
            <label htmlFor="">You Recieve</label>
            <input type="number" />
            <h4 htmlFor="">Estimated Gas + Fees = $ 0.235 {props.gasfee}</h4>
            <hr className={styles.hr} />
            <button className={`${styles.btn} ${styles.center}`}>
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

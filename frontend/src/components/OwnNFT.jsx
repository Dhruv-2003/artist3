import React, { useState } from "react";
import styles from "../css/Component.module.css";
import styles2 from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import image from "../assets/3.png";

export default function OwnNFT(props) {
  const [toggle, setToggle] = useState(false);
  return (
    <>
    
    <div className={styles.card}>
      <div className={styles.image}>
        <Image
          className={styles.image}
          //  src={ coverPhoto ? coverPhoto.url : image}
          src={image}
          alt="Property image"
          width={"300px"}
          height={"220px"}
        />
      </div>
      <div className={styles.card_content}>
        <h3>
          <u>NFT title here</u>
        </h3>
        <button
          onClick={() => {
            setToggle(!toggle);
          }}
          className={`${styles2.btn} ${styles2.center}`}
        >
          List Tokens
        </button>

      </div>
    </div>

    {toggle ? (
          <div className={styles2.buy}>
            <h3>Purchase Token</h3>
            <label htmlFor="">Enter number of tokens to release</label>
            <input className={styles.input} type="number" />
            <hr className={styles2.hr} />
            <button className={`${styles2.btn} ${styles2.center}`}>
              Publish Tokens
            </button>
          </div>
        ) : (
          ""
        )}
    </>
  );
}

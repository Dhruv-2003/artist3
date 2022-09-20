import React from "react";
import styles from "../css/Component.module.css";
import styles2 from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import image from "../assets/3.png";

export default function TokenCard(props) {
  const token = props.token;
  return (
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
          <u>NFT Token Title here</u>
        </h3>
        <h4>Token Price {token.price}</h4>
        <Link href={`/token/${token.tokenId}`}>
          <button className={`${styles2.btn} ${styles2.center}`}>
            Purchase Token
          </button>
        </Link>
      </div>
    </div>
  );
}

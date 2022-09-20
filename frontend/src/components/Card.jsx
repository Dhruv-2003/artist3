import React from "react";
import styles from "../css/Component.module.css";
import styles2 from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import image from "../assets/3.png";

export default function Card(props) {
  const nft = props.nft;
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
          <u>NFT title here</u>
        </h3>
        <h4>Price {nft.price}</h4>
        <Link href={`/nft/${nft.id}`}>
          <button className={`${styles2.btn} ${styles2.center}`}>
            NFT Details
          </button>
        </Link>
      </div>
    </div>
  );
}

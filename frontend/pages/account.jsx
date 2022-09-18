import React from 'react'
import styles from "../styles/Home.module.css";
import OwnNFT from '../src/components/OwnNFT'

export default function account() {
  return (
    <div className={styles.main}>
        <h1 className={styles.heading}>Owned NFTs</h1>
        <div className={styles.collection}>
          <OwnNFT/>
          <OwnNFT/>
        </div>
    </div>
  )
}

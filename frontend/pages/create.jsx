import React, { useState } from "react";
import styles from "../styles/Home.module.css";

export default function create() {
  const [musicCID, setMusicCID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Upload your NFT</h1>
      <div className={styles.create_form}>
        <label htmlFor="">NFT Title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="">Upload NFT</label>
        <input type="file" accept="image/*" />
        <label htmlFor="">Description of your ART</label>
        <textarea
          placeholder="Enter description for your NFT"
          className={styles.description}
          value={description}
          cols="100"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button className={styles.btn}>Publish NFT</button>
      </div>
    </div>
  );
}

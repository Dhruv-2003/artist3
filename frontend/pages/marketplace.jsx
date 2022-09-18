import { useState } from "react";
import Card from "../src/components/Card";
import TokenCard from "../src/components/TokenCard";
import styles from "../styles/Home.module.css";

export default function marketplace() {
  const [toggleState, setToggleState] = useState(1);

  function toggleTab(index) {
    setToggleState(index);
    console.log(index);
  }
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Marketplace</h1>
      <div className={styles.stats_section}>
        <div className={styles.tabs_section}>
          <div
            onClick={() => toggleTab(1)}
            className={
              toggleState === 1
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
          >
            NFT
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(2)}
          >
            Token
          </div>
        </div>

        <div className={styles.content_tabs}>
          <div
            className={
              toggleState === 1
                ? `${styles.tab1} ${styles.active_content}`
                : styles.tab1
            }
          >
            <div className={styles.collection}>
              <Card />
              <Card />
              <Card />
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.tab2} ${styles.active_content}`
                : styles.tab2
            }
          >
            <div className={styles.collection}>
              <TokenCard />
              <TokenCard />
              <TokenCard />
              <TokenCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

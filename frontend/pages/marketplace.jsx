import React from "react";
import Card from "../src/components/Card";
import styles from "../styles/Home.module.css";

export default function marketplace() {
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Marketplace</h1>
      <div className={styles.collection}>
        {/* {propertiesForRent &&
          propertiesForRent.map((property) =>
            property.title.toLowerCase().includes(name) ? (
              <Card key={property.id} property={property} />
            ) : (
              ""
            )
          )} */}
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

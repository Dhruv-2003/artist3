import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "../css/Layout.module.css";
import logo from "../assets/logo2.png";
import Image from "next/image";
import Link from "next/link";

import React, { useState } from "react";

export default function Layout({ children }) {
  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive(!isActive);
  }
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={"/"}>
            <Image src={logo} />
          </Link>
        </div>

        <ul
          className={
            isActive === false
              ? styles.navmenu
              : styles.navmenu + " " + styles.active
          }
        >
          {/* <li className={styles.navLink}>Home</li> */}
          <li className={styles.navLink}>
            <Link href={"/create"}>Create</Link>
          </li>
          <li className={styles.navLink}>
            <Link href={"/marketplace"}>Marketplace</Link>
          </li>
          <li className={styles.navLink}>
            <Link href={"/account"}>Account</Link>
          </li>

          <li className={`${styles.navLink} ${styles.small}`}>
            <ConnectButton />
          </li>
        </ul>
        <button
          onClick={handleClick}
          className={
            isActive === false
              ? styles.hamburger
              : styles.hamburger + " " + styles.active
          }
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </nav>
      {children}
      <footer className={styles.footer}>
        <h4>
          Built by{" "}
          <u>
            <a
              href="https://twitter.com/kushagrasarathe"
              target="_blankspace"
              rel="noreferrer"
            >
              Kushagra Sarathe
            </a>
          </u>
          <span> &#38; </span>
          <u>
            <a
              href="https://twitter.com/0xdhruva"
              target="_blankspace"
              rel="noreferrer"
            >
              Dhruv Agarwal
            </a>
          </u>
        </h4>
      </footer>
    </>
  );
}

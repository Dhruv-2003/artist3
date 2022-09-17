import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import styles from "../css/Layout.module.css";
import logo from '../assets/logo.png'
import Image from "next/image";
import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
            <Link href={'/'}>
        <Image src={logo} />
            </Link>
        </div>
        <ul>
          <li className={styles.navLink}>Home</li>
          <li className={styles.navLink}>About</li>
          <li className={styles.navLink}>Dashboard</li>
          <ConnectButton />
        </ul>
      </nav>
      {children}
      <footer>
        <h3>footer</h3>
      </footer>
    </>
  );
}

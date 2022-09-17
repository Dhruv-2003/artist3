import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <h2>navbar</h2>
        <ConnectButton />
      </nav>
      {children}
      <footer>
        <h2>footer</h2>
      </footer>
    </>
  );
}

import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import OwnNFT from "../src/components/OwnNFT";

import { Network, Alchemy } from "alchemy-sdk";
import { NFT_Contract_adddress } from "../src/constants";
import { useAccount, useProvider, useSigner } from "wagmi";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
const settings = {
  apiKey: "bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default function Account() {
  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      console.log("fetching the NFTs");
      // fetch with metadata
      const nftsForOwner = await alchemy.nft.getNftsForOwner(address, {
        withMetadata: true,
      });
      const filteredNFTs = [];
      for (const nft of nftsForOwner.ownedNfts) {
        // console.log(nft);
        if (
          nft.contract.address.toLowerCase() ==
          NFT_Contract_adddress.toLowerCase()
        ) {
          console.log(nft);
          filteredNFTs.push(nft);
        }
      }
      console.log(filteredNFTs);
      setNfts(filteredNFTs);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Owned NFTs</h1>
      <div className={styles.collection}>
        {nfts.map((nft) => {
          return <OwnNFT nft={nft} key={nft.tokenId} />;
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import OwnNFT from "../src/components/OwnNFT";
import Activefraction from "../src/components/activeFractional";
import { Network, Alchemy } from "alchemy-sdk";
import { NFT_Contract_adddress } from "../src/constants";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import {
  NFT_Fraction_Address,
  NFT_Fraction_abi,
  Token_abi,
} from "../src/constants";
import { Contract } from "ethers";
const settings = {
  apiKey: "bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};

const alchemy = new Alchemy(settings);

export default function Account() {
  const [nfts, setNfts] = useState([]);
  const [fractions, setFractions] = useState([]);

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Fraction_contract = useContract({
    addressOrName: NFT_Fraction_Address,
    contractInterface: NFT_Fraction_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    // fetchNFTs();
    fetchFractionals();
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

  const fetchFractionals = async () => {
    try {
      console.log("Fetching the Active Fractionals");
      const tokens = await Fraction_contract.getTokens();
      console.log(tokens);
      const promises = [];
      tokens.map(async (token) => {
        console.log(token);
        const Token_Contract = new Contract(token, Token_abi, signer);
        const ownerAddress = await Token_Contract.owner();
        console.log(ownerAddress);
        if (ownerAddress == address) {
          console.log(token);
          promises.push(token);
        }
      });

      const filteredTokens = await Promise.all(promises);
      console.log(filteredTokens);
      setFractions(filteredTokens);
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
      <h1 className={styles.heading}>Active Fractions</h1>
      <div className={styles.collection}>
        {fractions.map((fraction) => {
          return <Activefraction token={fraction} />;
        })}
      </div>
    </div>
  );
}

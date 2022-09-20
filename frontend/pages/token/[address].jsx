import styles from "../../styles/Home.module.css";
import image from "../../src/assets/3.png";
import Image from "next/image";

// import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import {
  NFT_Contract_adddress,
  NFT_Contract_abi,
  Token_abi,
} from "../../src/constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export default function Token(props) {
  // buy token
  const [tokenAddress, settokenAddress] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState("");
  const [data, setData] = useState({});

  const router = useRouter();
  const _tokenAddress = router.query.address;

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Token_Contract = useContract({
    addressOrName: tokenAddress,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  const NFT_Contract = useContract({
    addressOrName: NFT_Contract_adddress,
    contractInterface: NFT_Contract_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(async () => {
    if (_tokenAddress) {
      settokenAddress(_tokenAddress);
      await fetchTokenData(_tokenAddress);
    }
  }, []);

  useEffect(async () => {
    setAmount(qty * tokenPrice);
  }, [qty]);

  const fetchTokenData = async (_tokenAddress) => {
    try {
      const data = await Token_Contract.tokenId();
      const tokenId = parseInt(data.hex._value);

      const response = await NFT_Contract.tokenURI(tokenId);
      console.log(response);
      /// filter the NFT URI from the link and then

      const _price = await Token_Contract.tokenPrice();
      const price = parseInt(_price.hex._value);
      setTokenPrice(price);

      const metadata = await fetch(response);
      const metadataJSON = await metadata.json();
      console.log(metadataJSON);
      setData(metadataJSON);
    } catch (err) {
      console.log(err);
    }
  };

  const buyTokens = async () => {
    try {
      console.log("Buying tokens for the NFT");
      const tx = await Token_Contract.buyToken(qty, {
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      console.log("Tokens bought");
    } catch (err) {
      console.log(err);
    }
  };

  /// data is set for now , we can just set all the details after it is fetched properly
  return (
    <div className={styles.nft_page}>
      <h1 className={styles.heading}>Token Title here</h1>
      <div className={styles.nft_section}>
        <div className={styles.img}>
          <Image className={styles.img} src={image} />
        </div>
        <div className={styles.right}>
          <h2>NFT and Token Description</h2>
          <h4 className={styles.nft_desc}>
            {props.desc}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            nobis, tempora deleniti itaque provident, corrupti explicabo veniam
          </h4>

          <div className={styles.buy}>
            <h3>Purchase Token</h3>
            <label htmlFor="">Enter amount of your choice</label>
            <input
              type="number"
              onChange={(e) => setQty(e.target.value)}
              value={qty}
            />
            <label htmlFor="">
              You will recieve {props.token} {qty} Tokens
            </label>
            <hr className={styles.hr} />
            <button
              onClick={buyTokens}
              className={`${styles.btn} ${styles.center}`}
            >
              Get Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import styles from "../../styles/Home.module.css";
import image from "../../src/assets/3.png";
import Image from "next/image";

// import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import { NFT_Contract_adddress, Token_abi } from "../../src/constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useRouter } from "next/router";
// import {
//   useContract,
//   useContractRead,
//   useContractWrite,
// } from "@thirdweb-dev/react";

export default function Token(props) {
  // buy token
  const [tokenAddress, settokenAddress] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState("");
  const [data, setData] = useState({});
  const router = useRouter();
  const _tokenAddress = router.query.tokenContract;

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Token_Contract = useContract({
    addressOrName: tokenAddress,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  // const { NFT_contract } = useContract(
  //   "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  // );

  useEffect(async () => {
    if (_tokenAddress) {
      settokenAddress(_tokenAddress);
      await fetchTokenData(_tokenAddress);
    }
  }, []);

  useEffect(async () => {
    setAmount(qty * tokenPrice);
  }, [qty]);

  const fetchTokenData = async ({ _tokenAddress }) => {
    try {
      const data = await Token_Contract.tokenId();
      const tokenId = parseInt(data.hex._value);

      // const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);

      console.log(response);
      /// filter the NFT URI from the link and then

      const _price = await Token_Contract.tokenPrice();
      const price = parseInt(_price.hex._value);
      setTokenPrice(price);

      const metadata = await fetch(tokenURI);
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
            <input type="number" />
            <label htmlFor="">You will recieve {props.token} 20 Tokens</label>
            <hr className={styles.hr} />
            <button className={`${styles.btn} ${styles.center}`}>
              Get Tokens
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

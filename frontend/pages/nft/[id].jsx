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

export default function NFT(props) {
  // buy nft

  const [tokenAddress, settokenAddress] = useState("");
  const [nfPrice, setnfPrice] = useState(0);
  const [price, setPrice] = useState("");
  const [data, setData] = useState({});

  const router = useRouter();
  const nftAddress = router.query.nftContract;
  const tokenId = router.query.tokenId;

  // const { NFT_contract } = useContract(
  //   "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  // );
  // const { Fraction_contract } = useContract(
  //   "0x787FD6F86c692B8FbB0452B399fd5302201BFf79"
  // );

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Token_Contract = useContract({
    addressOrName: tokenAddress,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  const FetchTokenData = async ({ _tokenAddress }) => {
    try {
      // const { address } = useContractRead(
      //   Fraction_contract,
      //   "getAddress",
      //   nftAddress,
      //   tokenId
      // );

      // filter the address first
      settokenAddress(address);

      // const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
      console.log(response);
      /// filter the NFT URI from the link and then

      const metadata = await fetch(tokenURI);
      const metadataJSON = await metadata.json();
      console.log(metadataJSON);
      setData(metadataJSON);

      const _price = await Token_Contract.salePrice();
      const price = parseInt(_price.hex._value);
      setnfPrice(price);
    } catch (err) {
      console.log(err);
    }
  };

  const BuyNFT = async () => {
    try {
      console.log("Buying NFT .. ");
      const tx = await Token_Contract.purchaseNFT({
        value: ethers.utils.parseEther(price),
      });
      await tx.wait();
      console.log("NFT purchase complete");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.nft_page}>
      <h1 className={styles.heading}>NFT title here</h1>
      <div className={styles.nft_section}>
        <div className={styles.img}>
          <Image className={styles.img} src={image} />
        </div>
        <div className={styles.right}>
          <h2>NFT Description</h2>
          <h4 className={styles.nft_desc}>
            {props.desc}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            nobis, tempora deleniti itaque provident, corrupti explicabo veniam
          </h4>

          <div className={styles.buy}>
            <h3>Purchase NFT</h3>
            <label htmlFor="">You Pay</label>
            <input type="number" />
            <label htmlFor="">You Recieve</label>
            <input type="number" />
            <h4 htmlFor="">Estimated Gas + Fees = $ 0.235 {props.gasfee}</h4>
            <hr className={styles.hr} />
            <button className={`${styles.btn} ${styles.center}`}>
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

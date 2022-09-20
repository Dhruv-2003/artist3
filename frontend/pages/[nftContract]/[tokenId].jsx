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
  NFT_Fraction_Address,
  NFT_Fraction_abi,
} from "../../src/constants";
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
  const [tokenId, setTokenId] = useState(0);
  const [nftAddress, setNftAddress] = useState("");
  const [nfPrice, setnfPrice] = useState(0);
  const [price, setPrice] = useState("");
  const [data, setData] = useState({});

  const router = useRouter();
  const _nftAddress = router.query.nftContract;
  const _tokenId = router.query.tokenId;

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Token_Contract = useContract({
    addressOrName: tokenAddress,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  const Fraction_contract = useContract({
    addressOrName: NFT_Fraction_Address,
    contractInterface: NFT_Fraction_abi,
    signerOrProvider: signer || provider,
  });

  const NFT_Contract = useContract({
    addressOrName: NFT_Contract_adddress,
    contractInterface: NFT_Contract_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    setNftAddress(_nftAddress);
    setTokenId(_tokenId);
    fetchAddress(_nftAddress, _tokenId);
    fetchTokenData();
  }, []);

  const fetchAddress = async (_collectionAddress, _tokenId) => {
    try {
      const data = await Fraction_contract.getAddress(
        _collectionAddress,
        _tokenId
      );
      console.log(data);
      const Token_address = data;
      settokenAddress(Token_address);
      return Token_address;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTokenData = async () => {
    try {
      const response = await NFT_Contract.tokenURI(tokenId);
      console.log(response);
      /// filter the NFT URI from the link and then

      const metadata = await fetch(response);
      const metadataJSON = await metadata.json();
      console.log(metadataJSON);
      setData(metadataJSON);

      const _price = await Token_Contract.salePrice();
      const price_ = parseInt(_price.hex._value);
      setnfPrice(price_);
    } catch (err) {
      console.log(err);
    }
  };

  const buyNFT = async () => {
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
            <input
              type="text"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
            {/* <label htmlFor="">You Recieve</label>
            <input type="number" /> */}
            <h4 htmlFor="">Estimated Gas + Fees = $ 0.235 {props.gasfee}</h4>
            <hr className={styles.hr} />
            <button
              onClick={buyNFT}
              className={`${styles.btn} ${styles.center}`}
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

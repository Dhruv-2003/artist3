import React, { useState, useEffect } from "react";
import styles from "../css/Component.module.css";
import styles2 from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import image_ from "../assets/3.png";
/// same collection address for all the NFTs created by the artists
import {
  NFT_Contract_adddress,
  NFT_Contract_abi,
  NFT_Fraction_Address,
  NFT_Fraction_abi,
  Token_abi,
} from "../constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { Contract, ethers } from "ethers";

export default function Activefraction(props) {
  const [tokenId, settokenId] = useState(0);
  const [amount, setAmount] = useState(0);

  const [tokenAddress, setTokenAddress] = useState("");
  const [nftPrice, setNftPrice] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");

  const [tokenSale, setTokenSale] = useState(false);
  const [nftSale, setNftSale] = useState(false);
  const [intialized, setIntialized] = useState(false);

  const token = props.token;
  const [toggle, setToggle] = useState(false);

  let image = nft.rawMetadata.image;
  image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Fraction_contract = useContract({
    addressOrName: NFT_Fraction_Address,
    contractInterface: NFT_Fraction_abi,
    signerOrProvider: signer || provider,
  });

  const Token_Contract = useContract({
    addressOrName: token,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(async () => {
    setTokenAddress(token);
    checkStatus();
  }, [token]);

  const checkStatus = async () => {
    try {
      //   const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

      const _intialized = await Token_Contract.initialized();
      setIntialized(_intialized);

      if (intialized) {
        const tokenSaleStarted = await Token_Contract.tokenSaleStarted();
        setTokenSale(tokenSaleStarted);

        const nftSaleStarted = await Token_Contract.saleStarted();
        setNftSale(nftSaleStarted);
      } else {
        console.log("Not yet intialized");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const startTokenSale = async () => {
    try {
      //   const Token_Contract = new Contract(tokenAddress, Token_abi, signer);
      console.log("Starting the sale for the tokens...");
      const _price = ethers.utils.parseEther(tokenPrice);
      const tx = await Token_Contract.initializeSale(_price);
      await tx.wait();
      console.log("Token Sale started");
    } catch (err) {
      console.log(err);
    }
  };

  const startNFTSale = async () => {
    try {
      console.log("Starting the sale for the NFTs...");
      const _price = ethers.utils.parseEther(nftPrice);
      const tx = await Token_Contract.putForSale(_price);
      await tx.wait();
      console.log("NFT Sale started");
    } catch (err) {
      console.log(err);
    }
  };

  const closeTokenSale = async () => {
    try {
      console.log("Closing the token sale for the tokens...");
      const tx = await Token_Contract.CloseTokenSale();
      await tx.wait();
      console.log("Token Sale closed");
    } catch (err) {
      console.log(err);
    }
  };

  const withdraw = async () => {
    try {
      console.log("Withdrawing the ETH amount");
      const tx = await Token_Contract.withdraw();
      await tx.wait();
      console.log("Withdrawl completed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            className={styles.image}
            //  src={ coverPhoto ? coverPhoto.url : image}
            src={image ? image : image_}
            alt="Property image"
            width={"300px"}
            height={"220px"}
          />
        </div>
        <div className={styles.card_content}>
          <h3>
            <u>{nft.title}</u>
          </h3>
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
            className={`${styles2.btn} ${styles2.center}`}
          >
            Check more
          </button>
        </div>
      </div>

      {toggle ? (
        <div className={styles2.buy}>
          <h3>Control Sales</h3>
          <hr className={styles2.hr} />
          <button
            onClick={handlefractionalize}
            className={`${styles2.btn} ${styles2.center}`}
          >
            Publish Tokens
          </button>
          {intialized ? (
            <div>
              {!nftSale ? (
                <>
                  <button
                    onClick={() => startNFTSale(tokenAddress)}
                    className={`${styles2.btn} ${styles2.center}`}
                  >
                    Start NFT Sale
                  </button>
                  <input
                    className={styles.input}
                    type="text"
                    value={nftPrice}
                    onChange={(e) => setNftPrice(e.target.value)}
                  />
                </>
              ) : (
                <a></a>
              )}
              {!tokenSale ? (
                <>
                  <button
                    onClick={() => startTokenSale(tokenAddress)}
                    className={`${styles2.btn} ${styles2.center}`}
                  >
                    Start Token Sale
                  </button>
                  <input
                    className={styles.input}
                    type="text"
                    value={tokenPrice}
                    onChange={(e) => setTokenPrice(e.target.value)}
                  />
                </>
              ) : (
                <a></a>
              )}
            </div>
          ) : (
            <a></a>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

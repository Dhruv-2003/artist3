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

export default function OwnNFT(props) {
  const [tokenId, settokenId] = useState(0);
  const [amount, setAmount] = useState(0);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [nftPrice, setNftPrice] = useState("");
  const [tokenPrice, setTokenPrice] = useState("");

  const [tokenSale, setTokenSale] = useState(false);
  const [nftSale, setNftSale] = useState(false);
  const [intialized, setIntialized] = useState(false);

  const nft = props.nft;
  const [toggle, setToggle] = useState(false);

  let image = nft.rawMetadata.image;
  image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const NFT_Collection_Contract = useContract({
    addressOrName: NFT_Contract_adddress,
    contractInterface: NFT_Contract_abi,
    signerOrProvider: signer || provider,
  });

  const Fraction_contract = useContract({
    addressOrName: NFT_Fraction_Address,
    contractInterface: NFT_Fraction_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(async () => {
    // settokenId(nft.tokenId);
    // checkOwner();
    // await fetchAddress();
    // checkStatus(tokenAddress);
  }, [nft]);

  const handlefractionalize = async () => {
    try {
      if (isOwner) {
        // console.log(name, symbol, NFT_Contract_adddress, tokenId, amount);
        await fractionalizeNFT(
          name,
          symbol,
          NFT_Contract_adddress,
          tokenId,
          amount
        );
        const Token_address = await fetchAddress(
          NFT_Contract_adddress,
          tokenId
        );
        await requestApproval(address, Token_address);
        await intiateFractionalization(
          Token_address,
          NFT_Contract_adddress,
          tokenId,
          amount
        );
        await checkStatus(Token_address);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkOwner = async () => {
    try {
      const tokenOwner = await NFT_Collection_Contract.ownerOf(tokenId);
      console.log(tokenOwner);
      if (tokenOwner.toLowerCase() !== address.toLowerCase()) {
        console.log("You are not the Owner of the NFT");
        setIsOwner(false);
      } else {
        setIsOwner(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // first approval needs to be given for the contract minted to be able to send the NFT
  const fractionalizeNFT = async (
    _name,
    _symbol,
    _collectionAddress,
    _tokenId,
    _amount
  ) => {
    try {
      console.log("fractionalizing the NFT");
      console.log(_name, _symbol, _collectionAddress, _tokenId, _amount);
      const tx = await Fraction_contract.createToken(
        _name,
        _symbol,
        _collectionAddress,
        _tokenId,
        _amount
      );
      await tx.wait();
      console.log(tx);
      /// need to get the address of the minted contract returned
      console.log("fractionalization complete");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddress = async (_collectionAddress, _tokenId) => {
    try {
      const data = await Fraction_contract.getAddress(
        _collectionAddress,
        _tokenId
      );
      console.log(data);
      const Token_address = data;
      setTokenAddress(Token_address);
      return Token_address;
    } catch (err) {
      console.log(err);
    }
  };

  const requestApproval = async (_address, _tokenAddress) => {
    try {
      // console.log(_tokenAddress);
      const isApproved = await NFT_Collection_Contract.isApprovedForAll(
        _address,
        _tokenAddress
      );
      console.log(isApproved);
      if (!isApproved) {
        console.log("Requesting approval over NFTs...");

        // Send approval transaction to NFT contract
        const approvalTxn = await NFT_Collection_Contract.setApprovalForAll(
          _tokenAddress,
          true
        );
        console.log("NFT Transfer Approval completed");
        console.log(approvalTxn);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const intiateFractionalization = async (
    _tokenAddress,
    _collectionAddress,
    _tokenId,
    _amount
  ) => {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

      console.log("initiating");

      const intializetx = await Token_Contract.initialize(
        _collectionAddress,
        _tokenId,
        _amount
      );

      await intializetx.wait();
      console.log("Token Intialized");
    } catch (err) {
      console.log(err);
    }
  };

  const checkStatus = async (_tokenAddress) => {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

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

  const startTokenSale = async (_tokenAddress) => {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);
      console.log("Starting the sale for the tokens...");
      const _price = ethers.utils.parseEther(tokenPrice);
      const tx = await Token_Contract.initializeSale(_price);
      await tx.wait();
      console.log("Token Sale started");
    } catch (err) {
      console.log(err);
    }
  };

  const startNFTSale = async (_tokenAddress) => {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);
      console.log("Starting the sale for the NFTs...");
      const _price = ethers.utils.parseEther(nftPrice);
      const tx = await Token_Contract.putForSale(_price);
      await tx.wait();
      console.log("NFT Sale started");
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
            List Tokens
          </button>
        </div>
      </div>

      {toggle ? (
        <div className={styles2.buy}>
          <h3>Purchase Token</h3>
          <label htmlFor="">Enter number of tokens to release</label>
          <input
            className={styles.input}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="">Enter name of the token </label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Enter symbol of the token</label>
          <input
            className={styles.input}
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
          />
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

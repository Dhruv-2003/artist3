import React, { useState, useEffect } from "react";
import Card from "../src/components/Card";
import TokenCard from "../src/components/TokenCard";
import styles from "../styles/Home.module.css";
import {
  NFT_Contract_adddress,
  Token_abi,
  NFT_Fraction_Address,
  NFT_Fraction_abi,
} from "../src/constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { Contract, ethers } from "ethers";

export default function Marketplace() {
  const [toggleState, setToggleState] = useState(1);

  function toggleTab(index) {
    setToggleState(index);
    console.log(index);
  }

  // fetch Tokens

  const [tokens, setTokens] = useState([]);

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const Fraction_Contract = useContract({
    addressOrName: NFT_Fraction_Address,
    contractInterface: NFT_Fraction_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    if (toggleState == 1) {
      fetchNFTs();
    } else if (toggleState == 2) {
      fetchTokens();
    }
  }, [toggleState]);

  /// tokens

  async function fetchTokens() {
    try {
      const data = await Fraction_Contract.getTokens();
      // array of all the addresses
      const promises = [];
      data.map((token) => {
        // console.log(token);
        const response = CheckToken(token);
        if (response == true) {
          const data = FetchTokenData(token);
          promises.push(data);
        }
      });
      const _tokens = await Promise.all(promises);

      /// filtered and all the needed data is fetched and stored as objects in the array of NFT
      // console.log(_tokens);
      setTokens(_tokens);
    } catch (err) {
      console.log(err);
    }
  }

  const FetchTokenData = async (_tokenAddress) => {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

      // fetch the tokenId
      const data = await Token_Contract.tokenId();
      const tokenId = parseInt(data.hex._value);
      console.log(data);

      const _price = await Token_Contract.tokenPrice();
      const price_ = parseInt(_price.hex._value);

      const _sold = await Token_Contract.sold();
      const sold_ = parseInt(_sold.hex._value);

      const _total = await Token_Contract.total();
      const total_ = parseInt(_total.hex._value);

      // filter the address first
      const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
      console.log(response);
      /// filter the NFT URI from the link and then

      const metadata = await fetch(tokenURI);
      const metadataJSON = await metadata.json();
      console.log(metadataJSON);

      const Token = {
        name: metadataJSON.name,
        description: metadataJSON.description,
        image: metadataJSON.image,
        price: ethers.utils.formatEther(price_),
        sold: sold_,
        total: total_,
        tokenAddress: _tokenAddress,
        tokenId: tokenId,
        collectionAddress: NFT_Contract_adddress,
      };
      return Token;
    } catch (err) {
      console.log(err);
    }
  };

  const CheckToken = async (_tokenAddress) => {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

      const data = await Token_Contract.tokenSaleStarted();
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const [nfts, setNfts] = useState([]);

  async function fetchNFTs() {
    try {
      const data = await Fraction_Contract.getTokens();
      // array of all the addresses
      const promises = [];
      data.map((nft) => {
        const response = CheckNFT(nft);
        if (response == true) {
          const data = FetchNFTData(nft);
          promises.push(data);
        }
      });
      const _nfts = await Promise.all(promises);

      /// filtered and all the needed data is fetched and stored as objects in the array of NFT
      console.log(_nfts);
      setNfts(_nfts);
    } catch (err) {
      console.log(err);
    }
  }

  async function FetchNFTData({ _tokenAddress }) {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

      // fetch the tokenId
      const data = await Token_Contract.tokenId();
      const tokenId = parseInt(data.hex._value);

      /// price is stored in form of wei
      const _price = await Token_Contract.salePrice();
      const price_ = parseInt(_price.hex._value);
      // filter the address first
      const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
      console.log(response);
      /// filter the NFT URI from the link and then
      const metadata = await fetch(tokenURI);
      const metadataJSON = await metadata.json();
      console.log(metadataJSON);

      const NFT = {
        name: metadataJSON.name,
        description: metadataJSON.description,
        image: metadataJSON.image,
        price: ethers.utils.formatEther(price_),
        tokenAddress: _tokenAddress,
        tokenId: tokenId,
        collectionAddress: NFT_Contract_adddress,
      };

      return NFT;
    } catch (err) {
      console.log(err);
    }
  }

  async function CheckNFT({ _tokenAddress }) {
    try {
      const Token_Contract = new Contract(_tokenAddress, Token_abi, signer);

      const data = await Token_Contract.saleStarted();

      /// return whether true or not
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Marketplace</h1>
      <div className={styles.stats_section}>
        <div className={styles.tabs_section}>
          <div
            onClick={() => toggleTab(1)}
            className={
              toggleState === 1
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
          >
            NFT
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.tabs} ${styles.active_tab}`
                : styles.tabs
            }
            onClick={() => toggleTab(2)}
          >
            Token
          </div>
        </div>

        <div className={styles.content_tabs}>
          <div
            className={
              toggleState === 1
                ? `${styles.tab1} ${styles.active_content}`
                : styles.tab1
            }
          >
            <div className={styles.collection}>
              {nfts.map((nft) => {
                return <Card nft={nft} key={nft.tokenId} />;
              })}
            </div>
          </div>

          <div
            className={
              toggleState === 2
                ? `${styles.tab2} ${styles.active_content}`
                : styles.tab2
            }
          >
            <div className={styles.collection}>
              {tokens.map((token) => {
                return <TokenCard token={token} key={token.tokenId} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

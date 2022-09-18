import React, { useState, useEffect } from "react";
import Card from "../src/components/Card";
import TokenCard from "../src/components/TokenCard";
import styles from "../styles/Home.module.css";

// import { useContract } from "@thirdweb-dev/react";
import { NFT_Contract_adddress, Token_abi } from "../src/constants";
import { isAddress } from "ethers/lib/utils";
// import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useContract, useContractRead } from "@thirdweb-dev/react";

// import { useContract } from "@thirdweb-dev/react";
// import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
// import { NFT_Contract_adddress, Token_abi } from "../constants";
// import { useProvider, useSigner, useContract, useAccount } from "wagmi";
// import { useContract, useContractRead } from "@thirdweb-dev/react";
// import { ethers } from "ethers";

export default function Marketplace() {
  const [toggleState, setToggleState] = useState(1);

  function toggleTab(index) {
    setToggleState(index);
    console.log(index);
  }

  // fetch Tokens

  const [tokens, setTokens] = useState([]);

  // const { NFT_contract } = useContract(
  //   "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  // );
  // const { Fraction_contract } = useContract(
  //   "0x787FD6F86c692B8FbB0452B399fd5302201BFf79"
  // );

  // const { address, isConnected } = useAccount();
  // const provider = useProvider();
  // const { data: signer } = useSigner();

  // useEffect(async () => {}, []);

  // async function fetchNFTs() {
  //   try {
  //     const { data, isLoading } = useContractRead(
  //       Fraction_contract,
  //       "getTokens"
  //     );
  //     // array of all the addresses
  //     const promises = [];
  //     data.map((token) => {
  //       const response = checkToken(token);
  //       if (response == true) {
  //         const data = fetchTokenData(token);
  //         promises.push(data);
  //       }
  //     });
  //     const _tokens = await Promise.all(promises);

  //     /// filtered and all the needed data is fetched and stored as objects in the array of NFT
  //     console.log(_nfts);
  //     setTokens(_tokens);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // const fetchTokenData = async ({ _tokenAddress }) => {
  //   try {
  //     const Contract = useContract({
  //       addressOrName: _tokenAddress,
  //       contractInterface: Token_abi,
  //       signerOrProvider: signer || provider,
  //     });

  //     // fetch the tokenId
  //     const data = await Contract.tokenId();
  //     const tokenId = parseInt(data.hex._value);

  //     const _price = await Token_Contract.tokenPrice();
  //     const price_ = parseInt(_price.hex._value);

  //     const _sold = await Token_Contract.sold();
  //     const sold_ = parseInt(_sold.hex._value);

  //     const _total = await Token_Contract.total();
  //     const total_ = parseInt(_total.hex._value);

  //     // filter the address first
  //     const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
  //     console.log(response);
  //     /// filter the NFT URI from the link and then

  //     const metadata = await fetch(tokenURI);
  //     const metadataJSON = await metadata.json();
  //     console.log(metadataJSON);

  //     const Token = {
  //       name: metadataJSON.name,
  //       description: metadataJSON.description,
  //       image: metadataJSON.image,
  //       price: ethers.utils.formatEther(price_),
  //       sold: sold_,
  //       total: total_,
  //       tokenAddress: _tokenAddress,
  //       tokenId: tokenId,
  //       collectionAddress: NFT_Contract_adddress,
  //     };

  //     return Token;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const checkToken = async ({ _tokenAddress }) => {
  //   try {
  //     const Token_Contract = useContract({
  //       addressOrName: _tokenAddress,
  //       contractInterface: Token_abi,
  //       signerOrProvider: signer || provider,
  //     });

  //     const data = await Token_Contract.tokenSaleStarted();

  //     /// return whether true or not
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // // fetch NFTs

  // const [nfts, setNfts] = useState([]);

  // useEffect(async () => {}, []);

  // async function fetchNFTs() {
  //   try {
  //     const { data, isLoading } = useContractRead(
  //       Fraction_contract,
  //       "getTokens"
  //     );
  //     // array of all the addresses
  //     const promises = [];
  //     data.map((nft) => {
  //       const response = checkToken(nft);
  //       if (response == true) {
  //         const data = fetchTokenData(nft);
  //         promises.push(data);
  //       }
  //     });
  //     const _nfts = await Promise.all(promises);

  //     /// filtered and all the needed data is fetched and stored as objects in the array of NFT
  //     console.log(_nfts);
  //     setNfts(_nfts);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function fetchTokenData({ _tokenAddress }) {
  //   try {
  //     const Contract = useContract({
  //       addressOrName: _tokenAddress,
  //       contractInterface: Token_abi,
  //       signerOrProvider: signer || provider,
  //     });

  //     // fetch the tokenId
  //     const data = await Contract.tokenId();
  //     const tokenId = parseInt(data.hex._value);

  //     /// price is stored in form of wei
  //     const _price = await Token_Contract.salePrice();
  //     const price_ = parseInt(_price.hex._value);
  //     // filter the address first
  //     const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
  //     console.log(response);
  //     /// filter the NFT URI from the link and then
  //     const metadata = await fetch(tokenURI);
  //     const metadataJSON = await metadata.json();
  //     console.log(metadataJSON);

  //     const NFT = {
  //       name: metadataJSON.name,
  //       description: metadataJSON.description,
  //       image: metadataJSON.image,
  //       price: ethers.utils.formatEther(price_),
  //       tokenAddress: _tokenAddress,
  //       tokenId: tokenId,
  //       collectionAddress: NFT_Contract_adddress,
  //     };

  //     return NFT;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async function checkToken({ _tokenAddress }) {
  //   try {
  //     const Token_Contract = useContract({
  //       addressOrName: _tokenAddress,
  //       contractInterface: Token_abi,
  //       signerOrProvider: signer || provider,
  //     });

  //     const data = await Token_Contract.saleStarted();

  //     /// return whether true or not
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

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
              <Card />
              <Card />
              <Card />
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
              <TokenCard />
              <TokenCard />
              <TokenCard />
              <TokenCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

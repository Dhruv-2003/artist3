// import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import { NFT_Contract_adddress, Token_abi } from "../constants";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
// import { useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export const FetchNFTs = async () => {
  const [nfts, setNfts] = useState([]);
  // const { NFT_contract } = useContract(
  //   "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  // );
  // const { Fraction_contract } = useContract(
  //   "0x787FD6F86c692B8FbB0452B399fd5302201BFf79"
  // );

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(async () => {}, []);

  const FetchNFT = async () => {
    try {
      // const { data, isLoading } = useContractRead(
      //   Fraction_contract,
      //   "getTokens"
      // );
      // array of all the addresses
      const promises = [];
      data.map((nft) => {
        const response = checkToken(nft);
        if (response == true) {
          const data = fetchTokenData(nft);
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
  };

  const FetchTokenData = async ({ _tokenAddress }) => {
    try {
      const Contract = useContract({
        addressOrName: _tokenAddress,
        contractInterface: Token_abi,
        signerOrProvider: signer || provider,
      });

      // fetch the tokenId
      const data = await Contract.tokenId();
      const tokenId = parseInt(data.hex._value);

      /// price is stored in form of wei
      const _price = await Token_Contract.salePrice();
      const price_ = parseInt(_price.hex._value);
      // // filter the address first
      // const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
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
  };

  const CheckToken = async ({ _tokenAddress }) => {
    try {
      const Token_Contract = useContract({
        addressOrName: _tokenAddress,
        contractInterface: Token_abi,
        signerOrProvider: signer || provider,
      });

      const data = await Token_Contract.saleStarted();

      /// return whether true or not
      return data;
    } catch (err) {
      console.log(err);
    }
  };
};

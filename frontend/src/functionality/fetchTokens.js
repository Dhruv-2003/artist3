// import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import { NFT_Contract_adddress, Token_abi } from "../constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { ethers } from "ethers";
// import { useContractRead } from "@thirdweb-dev/react";

export const BuyToken = async () => {
  const [tokens, setTokens] = useState([]);

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

  const FetchNFTs = async () => {
    try {
      // const { data, isLoading } = useContractRead(
      //   Fraction_contract,
      //   "getTokens"
      // );
      // array of all the addresses
      const promises = [];
      data.map((token) => {
        const response = checkToken(token);
        if (response == true) {
          const data = fetchTokenData(token);
          promises.push(data);
        }
      });
      const _tokens = await Promise.all(promises);

      /// filtered and all the needed data is fetched and stored as objects in the array of NFT
      console.log(_nfts);
      setTokens(_tokens);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTokenData = async ({ _tokenAddress }) => {
    try {
      // const Contract = useContract({
      //   addressOrName: _tokenAddress,
      //   contractInterface: Token_abi,
      //   signerOrProvider: signer || provider,
      // });

      // fetch the tokenId
      const data = await Contract.tokenId();
      const tokenId = parseInt(data.hex._value);

      const _price = await Token_Contract.tokenPrice();
      const price_ = parseInt(_price.hex._value);

      const _sold = await Token_Contract.sold();
      const sold_ = parseInt(_sold.hex._value);

      const _total = await Token_Contract.total();
      const total_ = parseInt(_total.hex._value);

      // // filter the address first
      // const { response } = useContractRead(NFT_contract, "tokenURI", tokenId);
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

  const checkToken = async ({ _tokenAddress }) => {
    try {
      // const Token_Contract = useContract({
      //   addressOrName: _tokenAddress,
      //   contractInterface: Token_abi,
      //   signerOrProvider: signer || provider,
      // });

      const data = await Token_Contract.tokenSaleStarted();

      /// return whether true or not
      return data;
    } catch (err) {
      console.log(err);
    }
  };
};

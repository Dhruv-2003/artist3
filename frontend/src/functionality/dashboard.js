// import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import { NFT_Contract_adddress, Token_abi } from "../constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";

export const Dashboard = async () => {
  const [_tokenAddress, set_tokenAddress] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [NFTPrice, setNFTPrice] = useState(0);

  const Token_Contract = useContract({
    addressOrName: _tokenAddress,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const startTokenSale = async () => {
    try {
      console.log("Starting the sale for the tokens...");
      const tx = await Token_Contract.initializeSale(tokenPrice);
      await tx.wait();
      console.log("Token Sale started");
    } catch (err) {
      console.log(err);
    }
  };

  const startNFTSale = async () => {
    try {
      console.log("Starting the sale for the NFTs...");
      const tx = await Token_Contract.putForSale(NFTPrice);
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
};

// import { useContract } from "@thirdweb-dev/react";
import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import { NFT_Contract_adddress, Token_abi } from "../constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export const BuyToken = async () => {
  const [tokenAddress, settokenAddress] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [amount, setAmount] = useState("");
  const [data, setData] = useState({});
  const router = useRouter();
  const _tokenAddress = router.query.tokenContract;

  const Token_Contract = useContract({
    addressOrName: tokenAddress,
    contractInterface: Token_abi,
    signerOrProvider: signer || provider,
  });

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  useEffect(async () => {
    if (_tokenAddress) {
      settokenAddress(_tokenAddress);
      await fetchTokenData(_tokenAddress);
    }
  }, []);

  useEffect(async () => {
    setAmount(qty * tokenPrice);
  }, [qty]);

  const FetchTokenData = async ({ _tokenAddress }) => {
    try {
      const data = await Token_Contract.tokenId();
      const tokenId = parseInt(data.hex._value);
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
};

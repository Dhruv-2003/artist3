import React, { useState, useEffect } from "react";
/// same collection address for all the NFTs created by the artists
import { NFT_Contract_adddress, Token_abi } from "../constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export const FetchNFTData = async () => {
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

  useEffect(async () => {
    if (_tokenAddress) {
      settokenAddress(_tokenAddress);
      await fetchTokenData(_tokenAddress);
    }
  }, []);

  const FetchTokenData = async ({ _tokenAddress }) => {
    try {
      // const { address } = useContractRead(
      //   Fraction_contract,
      //   "getAddress",
      //   _collectionAddress,
      //   _tokenId
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

      // const Token_Contract = useContract({
      //   addressOrName: tokenAddress,
      //   contractInterface: Token_abi,
      //   signerOrProvider: signer || provider,
      // });

      const _price = await Token_Contract.salePrice();
      const price = parseInt(_price.hex._value);
      setnfPrice(price);
    } catch (err) {
      console.log(err);
    }
  };
};

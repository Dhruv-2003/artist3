import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ethers, utils } from "ethers";
// import { useContract } from "@thirdweb-dev/react";
import { StoreData } from "./storeData";
import { DeployData } from "./storeNFT";

export const Mint = async () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const [ipfsImageURI, setIpfsImageURI] = useState("");
  const [ipfsUri, setIpfsUri] = useState("");

  //   const provider = useProvider();
  //   const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  //   const NFT_contract = useContract({
  //     addressOrName: ,
  //     contractInterface: ,
  //     signerOrProvider: signer || provider,
  //   });

  const { contract } = useContract(
    "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  );
  const { mutateAsync: mintTo, isLoading } = useContractWrite(
    contract,
    "mintTo"
  );

  const uploadImage = async () => {
    try {
      console.log("Uploading the image to IPFS via Web3.storage");
      const cid = await StoreData(files);
      const URL = `https://ipfs.io/ipfs/${cid}`;
      console.log(URL);
      console.log("Image uploaded to IPFS");
      setIpfsImageURI(URL);
      uploadData(URL);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const uploadData = async ({ _name, _description, _imageURI }) => {
    try {
      console.log("Deploying the Data to IPFS via Lighthouse.storage");
      const URI = await DeployData(_name, _description, _imageURI);
      console.log(URI);
      setIpfsUri(URI);
      mintNFT(address, URI);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // mints the NFT for the user
  const mintNFT = async ({ _to, _tokenURI }) => {
    try {
      const data = await mintTo([_to, _tokenURI]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };
};

import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useAccount, useProvider, useSigner } from "wagmi";
import { ethers, utils } from "ethers";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { StoreData } from "../src/functionality/storeData";
import { DeployData } from "../src/functionality/storeNFT";
import { StoreMetadata } from "../src/functionality/StoreMetadata";

export default function create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const [ipfsImageURI, setIpfsImageURI] = useState("");
  const [ipfsUri, setIpfsUri] = useState("");

  const { address, isConnected } = useAccount();

  const { contract } = useContract(
    "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  );
  const { mutateAsync: mintTo } = useContractWrite(contract, "mintTo");

  const uploadMetadata = async () => {
    try {
      const metadata = await StoreMetadata(image, name, description);
      const uri = metadata.url;
      setIpfs(uri);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
      setIpfsUri(url);
      console.log("NFT metadata uploaded to IPFS");
      window.alert(
        "NFT metadata uploaded to ipfs , Click on IPFS link to use the data"
      );
      mintNFT(address, url);
    } catch (err) {
      console.log(err);
    }
  };

  // const uploadImage = async () => {
  //   try {
  //     console.log(image);
  //     console.log("Uploading the image to IPFS via Web3.storage");
  //     const cid = await StoreData(image);
  //     const URL = `https://ipfs.io/ipfs/${cid}`;
  //     console.log(URL);
  //     console.log("Image uploaded to IPFS");
  //     setIpfsImageURI(URL);
  //     await uploadData(URL);
  //   } catch (err) {
  //     console.error("contract call failure", err);
  //   }
  // };

  // const uploadData = async ({ _name, _description, _imageURI }) => {
  //   try {
  //     console.log("Deploying the Data to IPFS via Lighthouse.storage");
  //     const obj = { name: _name, description: _description, image: _imageURI };
  //     const blob = new Blob([JSON.stringify(obj)], {
  //       type: "application/json",
  //     });
  //     const files = [new File([blob], "metadata.json")];
  //     console.log(files);

  //     const URI = await DeployData(files);
  //     console.log(URI);
  //     setIpfsUri(URI);
  //     // mintNFT(address, URI);
  //   } catch (err) {
  //     console.error("contract call failure", err);
  //   }
  // };

  // mints the NFT for the user
  const mintNFT = async ({ _to, _tokenURI }) => {
    try {
      const data = await mintTo([_to, _tokenURI]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Upload your NFT</h1>
      <div className={styles.create_form}>
        <label htmlFor="">NFT Title</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <label htmlFor="">Upload NFT</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files)}
        />
        <label htmlFor="">Description of your ART</label>
        <textarea
          placeholder="Enter description for your NFT"
          className={styles.description}
          value={description}
          cols="100"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={uploadMetadata} className={styles.btn}>
          Publish NFT
        </button>
      </div>
    </div>
  );
}

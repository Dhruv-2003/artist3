import styles from "../styles/Home.module.css";
import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
// import { ethers, utils } from "ethers";
// import { StoreData } from "../src/functionality/storeData";
// import { DeployData } from "../src/functionality/storeNFT";
import { StoreMetadata } from "../src/functionality/StoreMetadata";
import { NFT_Contract_abi, NFT_Contract_adddress } from "../src/constants";

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const [ipfsUri, setIpfsUri] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address } = useAccount();

  // const { contract } = useContract(
  //   "0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470"
  // );
  // const { mutateAsync: mintTo } = useContractWrite(contract, "mintTo");

  const NFT_Contract = useContract({
    addressOrName: NFT_Contract_adddress,
    contractInterface: NFT_Contract_abi,
    signerOrProvider: signer || provider,
  });

  const uploadMetadata = async () => {
    try {
      const metadata = await StoreMetadata(image, name, description);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`;
      console.log(url);
      setIpfsUri(url);
      console.log("NFT metadata uploaded to IPFS");
      await mintNFT(url);
    } catch (err) {
      console.log(err);
    }
  };

  // mints the NFT for the user
  const mintNFT = async (_tokenURI) => {
    try {
      const data = await NFT_Contract.mintTo(address, _tokenURI);
      await data.wait();
      console.info("NFT minted");
    } catch (err) {
      console.error("contract call failure", err);
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

  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Upload your ART</h1>
      <div className={styles.create_form}>
        <label htmlFor="">NFT Title</label>
        <input
          type="text"
          value={name}
          placeholder="Name for the NFT"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="">Upload NFT</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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

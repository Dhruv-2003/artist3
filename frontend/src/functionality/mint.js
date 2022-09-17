import React, { useEffect, useState } from "react";
import { useAccount, useContract, useProvider, useSigner } from "wagmi";
import { ethers, utils } from "ethers";

export const mint = async () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState([]);

  const [ipfsImageURI, setIpfsImageURI] = useState("");
  const [ipfsUri, setIpfsUri] = useState("");

  const provider = useProvider();
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const NFT_contract = useContract({
    addressOrName: ContractA,
    contractInterface: Grants_ABI,
    signerOrProvider: signer || provider,
  });
};

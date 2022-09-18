import React from "react";
import axios from "axios";
import { ethers } from "ethers";
import lighthouse from "@lighthouse-web3/sdk";

export const DeployData = async ({ files }) => {
  // Sign message for authentication
  // const signingResponse = await sign_message();

  // // Get a bearer token
  // const accessToken = (
  //   await axios.post(`https://api.lighthouse.storage/api/auth/verify_signer`, {
  //     publicKey: signingResponse.address,
  //     signedMessage: signingResponse.signedMessage,
  //   })
  // ).data.accessToken;

  const accessToken = "dee943e1-f731-4b29-8893-5db9584cfe74";

  // Push file to lighthouse node
  const output = await lighthouse.deploy(files, accessToken);
  console.log("File Status:", output);
  /*
  output:
    {
      Name: "filename.txt",
      Size: 88000,
      Hash: "QmWNmn2gr4ZihNPqaC5oTeePsHvFtkWNpjY3cD6Fd5am1w"
    }
  Note: Hash in response is CID.
*/

  const metadatURI = `https://ipfs.io/ipfs/${output.Hash}`;
  console.log("Visit at https://ipfs.io/ipfs/" + output.Hash);

  return metadatURI;
};

const sign_message = async () => {
  window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
    console.log("Account Connected: " + res[0]);
  });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const address = await signer.getAddress(); //users public key
  const messageRequested = (
    await axios.get(
      `https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`
    )
  ).data; //Get message
  const signedMessage = await signer.signMessage(messageRequested); //Sign message
  return {
    signedMessage: signedMessage,
    address: address,
  };
};

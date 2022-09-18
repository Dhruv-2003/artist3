// import React, { useState, useEffect } from "react";
// /// same collection address for all the NFTs created by the artists
// import { NFT_Contract_adddress, Token_abi } from "../constants";
// import { isAddress } from "ethers/lib/utils";
// import { useProvider, useSigner, useContract, useAccount } from "wagmi";
// import { useContractRead, useContractWrite } from "@thirdweb-dev/react";

// export const Fractionalization = async () => {
//   const [tokenId, settokenId] = useState(0);
//   const [amount, setAmount] = useState(0);
//   const [name, setName] = useState("");
//   const [symbol, setSymbol] = useState("");
//   const [tokenAddress, setTokenAddress] = useState("");
//   const [isOwner, setIsOwner] = useState(false);

//   const { Fraction_contract } = useContract(
//     "0x787FD6F86c692B8FbB0452B399fd5302201BFf79"
//   );
//   // to create the token
//   const { mutateAsync: createToken } = useContractWrite(
//     Fraction_contract,
//     "createToken"
//   );

//   const { NFTCollection_contract } = useContract(NFT_Contract_adddress);

//   // to approve the
//   const { mutateAsync: setApprovalForAll } = useContractWrite(
//     NFTCollection_contract,
//     "setApprovalForAll"
//   );

//   const { address, isConnected } = useAccount();
//   const provider = useProvider();
//   const { data: signer } = useSigner();

//   const handlefractionalize = async () => {
//     try {
//       await checkOwner();
//       if (isOwner) {
//         const Token_address = await fractionalize(
//           name,
//           symbol,
//           NFT_Contract_adddress,
//           tokenId,
//           amount
//         );
//         setTokenAddress(Token_address);
//         if (!isAddress(tokenAddress)) {
//           await fetchAddress();
//           await requestApproval(address, Token_address);
//           await intiateFractionalization();
//         } else {
//           await requestApproval(address, Token_address);
//           await intiateFractionalization();
//         }
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const checkOwner = async () => {
//     try {
//       const { tokenOwner } = useContractRead(
//         NFTCollection_contract,
//         "ownerOf",
//         tokenId
//       );
//       if (tokenOwner.toLowerCase() !== address.toLowerCase()) {
//         console.log("You are not the Owner of the NFT");
//         setIsOwner(false);
//       } else {
//         setIsOwner(true);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // first approval needs to be given for the contract minted to be able to send the NFT
//   const fractionalize = async ({
//     _name,
//     _symbol,
//     _collectionAddress,
//     _tokenId,
//     _amount,
//   }) => {
//     try {
//       console.log("fractionalizing the NFT");
//       const data = await createToken([
//         _name,
//         _symbol,
//         _collectionAddress,
//         _tokenId,
//         _amount,
//       ]);
//       console.info("contract call successs", data);
//       /// need to get the address of the minted contract returned
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchAddress = async ({ _collectionAddress, _tokenId }) => {
//     try {
//       const { data } = await useContractRead(
//         Fraction_contract,
//         "getAddress",
//         _collectionAddress,
//         _tokenId
//       );

//       // filter the token_address
//       const Token_address = data;
//       setTokenAddress(Token_address);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const requestApproval = async ({ address, _tokenAddress }) => {
//     try {
//       const { isApproved } = useContractRead(
//         contract,
//         "isApprovedForAll",
//         address,
//         _tokenAddress
//       );
//       if (!isApproved) {
//         console.log("Requesting approval over NFTs...");

//         // Send approval transaction to NFT contract
//         const approvalTxn = await setApprovalForAll(_tokenAddress, true);
//         console.log("NFT Transfer Approval completed");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const intiateFractionalization = async ({
//     _tokenAddress,
//     _collectionAddress,
//     _tokenId,
//     _amount,
//   }) => {
//     try {
//       const Token_Contract = useContract({
//         addressOrName: _tokenAddress,
//         contractInterface: Token_abi,
//         signerOrProvider: signer || provider,
//       });

//       const intializetx = await Token_Contract.initialize(
//         _collectionAddress,
//         _tokenId,
//         _amount
//       );

//       await intializetx.wait();
//       console.log("Token Intialized");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const intialiseSale = async () => {
//     try {
//       const Token_Contract_Address = useContract({
//         addressOrName: _tokenAddress,
//         contractInterface: Token_abi,
//         signerOrProvider: signer || provider,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
// };

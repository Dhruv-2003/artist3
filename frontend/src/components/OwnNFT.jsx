import React, { useState, useEffect } from "react";
import styles from "../css/Component.module.css";
import styles2 from "../../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import image_ from "../assets/3.png";
/// same collection address for all the NFTs created by the artists
import {
  NFT_Contract_adddress,
  NFT_Contract_abi,
  NFT_Fraction_Address,
  NFT_Fraction_abi,
  Token_abi,
} from "../constants";
import { isAddress } from "ethers/lib/utils";
import { useProvider, useSigner, useContract, useAccount } from "wagmi";

export default function OwnNFT(props) {
  const [tokenId, settokenId] = useState(0);
  const [amount, setAmount] = useState(0);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [price, setPrice] = useState(0);

  const nft = props.nft;
  const [toggle, setToggle] = useState(false);

  let image = nft.rawMetadata.image;
  image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const NFT_Collection_Contract = useContract({
    addressOrName: NFT_Contract_adddress,
    contractInterface: NFT_Contract_abi,
    signerOrProvider: signer || provider,
  });

  const Fraction_contract = useContract({
    addressOrName: NFT_Fraction_Address,
    contractInterface: NFT_Fraction_abi,
    signerOrProvider: signer || provider,
  });

  useEffect(() => {
    settokenId(nft.tokenId);
    checkOwner();
  }, [nft]);

  const handlefractionalize = async () => {
    try {
      if (isOwner) {
        await fractionalize(
          name,
          symbol,
          NFT_Contract_adddress,
          tokenId,
          amount
        );

        // console.log(Token_address);
        // setTokenAddress(Token_address);
        // if (!isAddress(tokenAddress)) {
        //   await fetchAddress();
        //   await requestApproval(address, Token_address);
        //   await intiateFractionalization();
        // } else {
        //   await requestApproval(address, Token_address);
        //   await intiateFractionalization();
        // }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkOwner = async () => {
    try {
      const tokenOwner = await NFT_Collection_Contract.ownerOf(tokenId);
      console.log(tokenOwner);
      if (tokenOwner.toLowerCase() !== address.toLowerCase()) {
        console.log("You are not the Owner of the NFT");
        setIsOwner(false);
      } else {
        setIsOwner(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // first approval needs to be given for the contract minted to be able to send the NFT
  const fractionalize = async ({
    _name,
    _symbol,
    _collectionAddress,
    _tokenId,
    _amount,
  }) => {
    try {
      console.log("fractionalizing the NFT");
      const tx = await Fraction_contract.createToken(
        _name,
        _symbol,
        _collectionAddress,
        _tokenId,
        _amount
      );

      await tx.wait();
      console.log(tx);
      /// need to get the address of the minted contract returned
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAddress = async ({ _collectionAddress, _tokenId }) => {
    try {
      const data = await Fraction_contract.getAddress(
        _collectionAddress,
        _tokenId
      );
      console.log(data);
      // filter the token_address
      const Token_address = data;
      setTokenAddress(Token_address);
    } catch (err) {
      console.log(err);
    }
  };

  const requestApproval = async ({ address, _tokenAddress }) => {
    try {
      const isApproved = await NFT_Collection_Contract.isApprovedForAll(
        address,
        _tokenAddress
      );
      if (!isApproved) {
        console.log("Requesting approval over NFTs...");

        // Send approval transaction to NFT contract
        const approvalTxn = await setApprovalForAll(_tokenAddress, true);
        console.log("NFT Transfer Approval completed");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const intiateFractionalization = async ({
    _tokenAddress,
    _collectionAddress,
    _tokenId,
    _amount,
  }) => {
    try {
      const Token_Contract = useContract({
        addressOrName: _tokenAddress,
        contractInterface: Token_abi,
        signerOrProvider: signer || provider,
      });

      const intializetx = await Token_Contract.initialize(
        _collectionAddress,
        _tokenId,
        _amount
      );

      await intializetx.wait();
      console.log("Token Intialized");
    } catch (err) {
      console.log(err);
    }
  };

  const intialiseSale = async () => {
    try {
      const Token_Contract = useContract({
        addressOrName: _tokenAddress,
        contractInterface: Token_abi,
        signerOrProvider: signer || provider,
      });

      const tx = await Token_Contract.putForSale(price);
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.image}>
          <Image
            className={styles.image}
            //  src={ coverPhoto ? coverPhoto.url : image}
            src={image_}
            alt="Property image"
            width={"300px"}
            height={"220px"}
          />
        </div>
        <div className={styles.card_content}>
          <h3>
            <u>{nft.title}</u>
          </h3>
          <button
            onClick={() => {
              setToggle(!toggle);
            }}
            className={`${styles2.btn} ${styles2.center}`}
          >
            List Tokens
          </button>
        </div>
      </div>

      {toggle ? (
        <div className={styles2.buy}>
          <h3>Purchase Token</h3>
          <label htmlFor="">Enter number of tokens to release</label>
          <input
            className={styles.input}
            type="number"
            onClick={(e) => setAmount(e.target.value)}
          />
          <label htmlFor="">Enter name of the token </label>
          <input
            className={styles.input}
            type="text"
            onClick={(e) => setName(e.target.value)}
          />
          <label htmlFor="">Enter symbol of the token</label>
          <input
            className={styles.input}
            type="text"
            onClick={(e) => setSymbol(e.target.value)}
          />
          <hr className={styles2.hr} />
          <button
            onClick={handlefractionalize}
            className={`${styles2.btn} ${styles2.center}`}
          >
            Publish Tokens
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

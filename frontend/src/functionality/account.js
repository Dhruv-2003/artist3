import { Network, Alchemy } from "alchemy-sdk";
import { NFT_Contract_adddress } from "../constants";
// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};
// import { useContract } from "@thirdweb-dev/react";
import {
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

const alchemy = new Alchemy(settings);

export const Account = async () => {
  const { contract } = useContract(
    "0x50d41B2a3450f18815880DB8E2faE35d8D7DA06E"
  );
  const { mutateAsync: createToken, isLoading } = useContractWrite(
    contract,
    "createToken"
  );

  const { address, isConnected } = useAccount();
  const [nfts, setNfts] = useState([]);

  const fetchNFTs = async () => {
    try {
      console.log("fetching the NFTs");
      // fetch with metadata
      const nftsForOwner = await alchemy.nft.getNftsForOwner(address, {
        withMetadata: true,
      });
      const filteredNFTs = [];
      for (const nft of nftsForOwner.ownedNfts) {
        console.log("contract address:", nft.contract.address);
        if (nft.contract.address == NFT_Contract_adddress) {
          filteredNFTs.push(nft);
        }
      }
      console.log(filteredNFTs);
      setNfts(filteredNFTs);
    } catch (err) {
      console.log(err);
    }
  };
};

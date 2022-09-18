import { Network, Alchemy } from "alchemy-sdk";
import { NFT_Contract_adddress } from "../constants";
// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
  apiKey: "bZFiL-IFAMe4QAh9Q30gDQ7m1vxEss4u", // Replace with your Alchemy API Key.
  network: Network.MATIC_MUMBAI, // Replace with your network.
};
import { useContract } from "@thirdweb-dev/react";

const alchemy = new Alchemy(settings);

export const account = async () => {
  const { contract } = useContract(
    "0x50d41B2a3450f18815880DB8E2faE35d8D7DA06E"
  );
  const { mutateAsync: createToken, isLoading } = useContractWrite(
    contract,
    "createToken"
  );

  const { address, isConnected } = useAccount();

  const fractionalize = async ({
    _name,
    _symbol,
    _collectionAddress,
    _tokenId,
    _amount,
  }) => {
    try {
      console.log("fractionalize the NFT");
      const data = await createToken([
        _name,
        _symbol,
        _collectionAddress,
        _tokenId,
        _amount,
      ]);
      console.info("contract call successs", data);
    } catch (err) {
      console.log(err);
    }
  };
};

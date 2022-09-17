// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";
import "@thirdweb-dev/contracts/extension/Ownable.sol";

/// Custom collection contract done and checked
/// Deployed already on Polygon Mumbai

/// Common NFT collection for all the NFTs to be minted by the artists

contract Artist3 is ERC721Base {
    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}

    /// use mintTo(_to , _uri ) function from the contract to enter the customized URI for the respective token Mint
    function mintTo(address _to, string memory _tokenURI)
        public
        virtual
        override
    {
        _setTokenURI(nextTokenIdToMint(), _tokenURI);
        _safeMint(_to, 1, "");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

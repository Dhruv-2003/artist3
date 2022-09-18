// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./TokenforNFT.sol";

contract NFTFraction {
    /// mapping from contract => token ID => TokenContract
    mapping(address => mapping(uint256 => TokensforNFT))
        public fractionalizedTokens;

    // stores all the tokensintialized
    TokensforNFT[] public _tokensintialized;

    /// create a new token for the NFT  , check approval before and then allow it
    function createToken(
        string memory _name,
        string memory _symbol,
        address _collectionAddress,
        uint256 _tokenId,
        uint256 _amount
    ) public returns (address) {
        TokensforNFT _token = new TokensforNFT(_name, _symbol);
        fractionalizedTokens[_collectionAddress][_tokenId] = _token;
        _tokensintialized.push(_token);
        return address(_token);
    }

    function getAddress(address _collectionAddress, uint256 _tokenId)
        public
        view
        returns (address)
    {
        return address(fractionalizedTokens[_collectionAddress][_tokenId]);
    }

    // returns all the token intialized , to be filtered in the frontend
    function getTokens() public view returns (TokensforNFT[] memory) {
        return _tokensintialized;
    }

    // function changeContract(
    //     address _collectionAddress,
    //     uint256 _tokenId,
    //     address _newTokenContract
    // ) public {
    //     fractionalizedTokens[_collectionAddress][_tokenId] = _newTokenContract;
    // }
}

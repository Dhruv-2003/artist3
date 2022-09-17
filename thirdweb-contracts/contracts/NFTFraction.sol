// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./Token.sol";

contract NFTFraction {
    /// mapping from contract => token ID => TokenContract
    mapping(address => mapping(uint256 => Token)) public fractionalizedTokens;

    function createToken(
        string memory _name,
        string memory _symbol,
        address _collectionAddress,
        uint256 _tokenId,
        uint256 _amount
    ) public {
        Token _token = new Token(
            _name,
            _symbol,
            _collectionAddress,
            _tokenId,
            _amount
        );
        fractionalizedTokens[_collectionAddress][_tokenId] = _token;
    }

    function getAddress(address _collectionAddress, uint256 _tokenId)
        public
        view
        returns (address)
    {
        return address(fractionalizedTokens[_collectionAddress][_tokenId]);
    }
}

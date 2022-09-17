// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.7.3/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts@4.7.3/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts@4.7.3/access/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/token/ERC721/utils/ERC721Holder.sol";

/// can control the sale of a single token from a contract at a time

contract MyToken is ERC20, Ownable, ERC721Holder {
    IERC721 public collectionAddress;
    uint256 public tokenId;
    bool public initialized = false;
    bool public saleStarted = false;
    bool public tokenSaleStarted = false;
    bool public canRedeem = false;
    uint256 public sold;
    uint256 public total;
    uint256 public salePrice;
    uint256 public tokenPrice;

    constructor() ERC20("MyToken", "MTK") {}

    function initialize(
        address _collectionAddress,
        uint256 _tokenId,
        uint256 _amount,
        uint256 _tokenPrice
    ) external onlyOwner {
        require(!initialized, "Already initalized");
        collectionAddress = IERC721(_collectionAddress);
        collectionAddress.safeTransferFrom(msg.sender, address(this), _tokenId);
        tokenId = _tokenId;
        initialized = true;
        tokenSaleStarted = true;
        tokenPrice = _tokenPrice;
        total = _amount;
    }

    function putForSale(uint256 price) external onlyOwner {
        require(tokenSaleStarted, "Token sale not completed yet");
        salePrice = price;
        saleStarted = true;
    }

    function purchaseNFT() external payable {
        require(saleStarted, "Not for sale!");
        require(msg.value >= salePrice, "Not enough amount sent");
        collectionAddress.transferFrom(address(this), msg.sender, tokenId);
        saleStarted = false;
        canRedeem = true;
    }

    /// function to buy the tokens / fractions of the NFT
    function buyToken(uint256 _amount) external payable {
        require(tokenSaleStarted, "Not for sale!");
        require(_amount <= total, "Token amount incorrect");
        require(msg.value >= tokenPrice * _amount, "Not enough amount sent");
        _sold += _amount;
        _mint(msg.sender, _amount);
    }

    function closeTokenSale() external onlyOwner {
        tokenSaleStarted = false;
    }

    function redeem(uint256 _amount) external {
        require(canRedeem, "You cannot redeem");
        uint256 etherInContract = address(this).balance;
        uint256 toRedeem = (_amount * etherInContract) / totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(toRedeem);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

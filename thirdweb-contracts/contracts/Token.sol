// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@thirdweb-dev/contracts/Base/ERC20Base.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC721A.sol";
import "@thirdweb-dev/contracts/extension/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

/// can control the sale of a single token from a contract at a time
/// fractionalization

contract Token is ERC20Base, Ownable, ERC721Holder {
    IERC721A public collectionAddress;
    uint256 public tokenId;

    bool public initialized = false;
    bool public saleStarted = false;
    bool public tokenSaleStarted = false;
    bool public canRedeem = false;

    uint256 public sold;
    uint256 public total;
    uint256 public salePrice;
    uint256 public tokenPrice;

    event tokenCreated(
        string name,
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount
    );
    event tokenSaleStart(uint256 tokenPrice);
    event tokenBought(uint256 amount);
    event tokenSaleEnded();

    event NFTsaleStart(uint256 NFTPrice);
    event NFTsold(uint256 _price, address buyer);

    constructor(
        string memory _name,
        string memory _symbol,
        address _collectionAddress,
        uint256 _tokenId,
        uint256 _amount
    ) ERC20(_name, _symbol) {
        require(!initialized, "Already initalized");
        collectionAddress = IERC721A(_collectionAddress);
        collectionAddress.safeTransferFrom(msg.sender, address(this), _tokenId);
        tokenId = _tokenId;
        initialized = true;
        total = _amount;
        emit tokenCreated(_name, _collectionAddress, _tokenId, _amount);
    }

    // intialize the token sale for the NFT
    function initializeSale(uint256 _tokenPrice) external onlyOwner {
        tokenSaleStarted = true;
        tokenPrice = _tokenPrice;
        emit tokenSaleStart(_tokenPrice);
    }

    /// function to buy the tokens / fractions of the NFT
    /// amount to be sent by the buyer to the contract to complete the minting of token
    function buyToken(uint256 _amount) external payable {
        require(tokenSaleStarted, "Not for sale!");
        require(_amount <= total, "Token amount incorrect");
        require(msg.value >= tokenPrice * _amount, "Not enough amount sent");
        _sold += _amount;
        _mint(msg.sender, _amount);
        emit tokenBought(_amount);
    }

    /// close tokenSale
    function CloseTokenSale() external onlyOwner {
        require(tokenSaleStarted, "Token sale already closed");
        tokenSaleStarted = false;
        emit tokenSaleEnded();
    }

    // to put the NFT on sale
    function putForSale(uint256 price) external onlyOwner {
        require(tokenSaleStarted, "Token sale not completed yet");
        salePrice = price;
        saleStarted = true;
        emit NFTsaleStart(price);
    }

    // to purchase the NFT by any user for the amount to be greater than the salePrice
    function purchaseNFT() external payable {
        require(saleStarted, "Not for sale!");
        require(msg.value >= salePrice, "Not enough amount sent");
        collectionAddress.transferFrom(address(this), msg.sender, tokenId);
        saleStarted = false;
        canRedeem = true;
        emit NFTsold(msg.value, msg.sender);
    }

    /// buyers can reedem the amount if they want to
    function redeem(uint256 _amount) external {
        require(canRedeem, "You cannot redeem");
        uint256 etherInContract = address(this).balance;
        uint256 toRedeem = (_amount * etherInContract) / totalSupply();

        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(toRedeem);
    }

    // if owner wants to mint any contract via their dashboard
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}

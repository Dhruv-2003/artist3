// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@thirdweb-dev/contracts/Base/ERC20Base.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC721A.sol";
import "@thirdweb-dev/contracts/extension/Ownable.sol";
import "@openzeppelin/contracts@4.7.3/token/ERC721/utils/ERC721Holder.sol";

/// can control single NFT from a contract for it's fraction at a time
/// fractionalize the NFT and store it
/// allows sale of tokens via frontend and redemption of the same later
/// Single NFT sale is also allowed to be sold
/// The reedem is activated after the NFT is sold
/// Token holders can profit from the same

contract Token is ERC20Base, Ownable, ERC721Holder {
    IERC721A public collectionAddress;
    uint256 public tokenId;

    /// to check the states and the conditions in the contract
    bool public initialized = false;
    bool public saleStarted = false;
    bool public tokenSaleStarted = false;
    bool public canRedeem = false;

    /// for totalsupply and bought
    uint256 public sold;
    uint256 public total;

    /// for the price of tokens and the NFTs
    uint256 public salePrice;
    uint256 public tokenPrice;

    /// Events for the Tokens/ fractions created
    event tokenCreated(
        string name,
        address _contractAddress,
        uint256 _tokenId,
        uint256 _amount
    );
    event tokenSaleStart(uint256 tokenPrice);
    event tokenBought(uint256 amount);
    event tokenSaleEnded();

    /// Events for the NFTs
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

    ///@dev - intialize the token sale for the NFT
    ///@param _tokenPrice -the price of the single token owner wants to set
    function initializeSale(uint256 _tokenPrice) external onlyOwner {
        require(initialized, "Token not initialized yet");
        tokenSaleStarted = true;
        tokenPrice = _tokenPrice;
        emit tokenSaleStart(_tokenPrice);
    }

    ///@dev - to buy the tokens / fractions of the NFT
    ///@dev - amount to be sent by the buyer to the contract to complete the minting of token
    ///@param _amount - amount of the token to be bought
    function buyToken(uint256 _amount) external payable {
        require(tokenSaleStarted, "Not for sale!");
        require(_amount <= total, "Token amount incorrect");
        require(msg.value >= tokenPrice * _amount, "Not enough amount sent");
        _sold += _amount;
        _mint(msg.sender, _amount);
        emit tokenBought(_amount);
    }

    ///@dev - close the tokenSale
    ///@dev - can be controlled by tht owner only
    function CloseTokenSale() external onlyOwner {
        require(tokenSaleStarted, "Token sale already closed");
        tokenSaleStarted = false;
        emit tokenSaleEnded();
    }

    ///@dev - to put the NFT on sale
    ///@dev - onlyOwner can after the tokenPresale is completed
    ///@param price -  Minm. Price of the NFT the owner wants to set
    function putForSale(uint256 price) external onlyOwner {
        require(tokenSaleStarted, "Token sale not completed yet");
        salePrice = price;
        saleStarted = true;
        emit NFTsaleStart(price);
    }

    ///@dev- to purchase the NFT by any user for the amount greater than the salePrice
    function purchaseNFT() external payable {
        require(saleStarted, "Not for sale!");
        require(msg.value >= salePrice, "Not enough amount sent");
        collectionAddress.transferFrom(address(this), msg.sender, tokenId);
        saleStarted = false;
        canRedeem = true;
        emit NFTsold(msg.value, msg.sender);
    }

    ///@dev - buyers can reedem the amount by burning the tokens the own
    ///@dev - activated only when the NFT is sold
    function redeem(uint256 _amount) external {
        require(canRedeem, "You cannot redeem");
        uint256 etherInContract = address(this).balance;
        uint256 toRedeem = (_amount * etherInContract) / totalSupply();
        _burn(msg.sender, _amount);
        payable(msg.sender).transfer(toRedeem);
    }

    ///@dev - mint tokens for onlyOwner , can be called from their dashboard
    ///@param to - address to which tokens are to be minted
    ///@param amount - amount of the tokens to be minted
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    ///@dev - withdraw the remaining amount in the contract
    ///@dev - will work when all the tokens are burnt
    function withdraw() public onlyOwner {
        require(totalSupply() == 0, "All token holders have not claimed yet");
        address _owner = msg.sender;
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    /// Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

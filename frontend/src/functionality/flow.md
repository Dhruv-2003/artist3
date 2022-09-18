## NFT creation and minting

1. First of all the image for the artist is uploaded to the IPFS via web3.storage
2. Then we pass this CID to Lighthouse storage component that then store the metadata files to IPFS
3. Message is signed and then the NFT is minted

## Account page

1. Show all the NFTs created by the user
2. Show options to fractionalize the NFT and open a dashboard for the selected contract and the tokenId
3. Take input of name , symbol of token , total supply
4. show option to control token sale , NFT sale , withdraw

## NFT Fractionalization(Component)

1. after entering the required details set the NFT transfer approval for all
2. then create the token and transfer the NFT to it
3. then sale can be started on stopped of tokens and the NFTs

## NFT Selling page

1. Show all the NFTs whose NFT sale started status is true
2. Listings of the NFTs
3. Redirect to the page of the NFT for buying

## NFT page

1. Show the details of the NFT to be bought by the end user
2. Show image , description , name , the minm price quoted
3. Give option to enter the price and intiate the transaction
4. After Sold , remove the NFT from the page

## Token Sale Page(Token Marketplace)

1. Show all the tokens where the token sale is started
2. give option to choose the no of tokens to be minted and calculate the value
3. Intiate the tx and deduct the amount calculated and calling mint from the contract

## Token page

1. Show details of the tokens

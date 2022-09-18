# Artist3

Artist3 is a NFT marketplace for artists using which artists can upload their work as NFTs, the best part is they can also decide to sell the NFT in **fractions**, all on a single platform.

Features
- All assets stored on decentralized storage like IPFS
- Own a art piece , NFT just for fractions of the cost
- Earn a wholesome profit from holding tokens for a short period of time
- Mint Digital Proof as NFT for your Artwork for free in under 60 secs
- Control the Sale of NFT and tokens for your artwork
- Buy tokens/fractions of the NFTs and NFTs at the same platform

http://artist3.vercel.app/


## How we built it
There are three main pages in the app: 
1. Create page, where you can upload your art by filling a form
2. Marketplace, all the live token and NFTs are lisited here
3. Accounts , you can see all your NFTs in account page from where you can choose how you want to list the NFT in the marketplace, choosing from two options , either publish as NFT or publish as fractions.

## Challenges we ran into
1. Designing the UX, we wanted to keep the UX simple so that anyone can use the app, we had 2 choice for this, either we implement some similar functionalities in single page or keep them separate, we choose the later one, because this way we saved some time in integration and could focus on other problems.

2. Implementing the thirdweb release and deploy feature in our dApp , we have used thirdweb for the first time so we ran into issue while configuring with the frontend SDK

3. Understanding and implementing the NFT Fraction logic and the marketplace idea of how to sell NFT and token together

4. Using lighthouse for the first time , made us get into bunch of issues , and after trying we were not able to resolve it

### What's next for project
We want to build the marketplace section first and enable the trading of NFT and Tokens together on the same platform

## Features

* All assets stored on decentralized storage like IPFS
* Own a art piece , NFT just for fractions of the cost
* Earn a wholesome profit from holding tokens for a short period of time
* Mint Digital Proof as NFT for your Artwork for free in under 60 secs
* Control the Sale of NFT and tokens for your artwork
* Buy tokens/fractions of the NFTs and NFTs at the same platfor

## How is it Built

**Front-end**
* HTML
* CSS
* NextJS
* Canva
* IPFS - To store Art data on decentralized storage
* lighthouse - Store data permanently on IPFS after getting signed by the user https://lighthouse-1.gitbook.io/lighthouse-1/lighthouse-sdk/code-examples/browser-frontend/browser
* nft.storage - store the details of the NFT on IPFS directly
* ThirdwebSDK: Used to integrate our frontend with the blockchain and the contracts and implement the funcctionality

**Backend**
* 
* Solidity - For smart-contracts development and creation of the Smart contracts
* NFT Collection Contract
* NFT Fractions Manager
* TokensForNFT contrat - NFT fractionalization
* ThirdWeb contract deploy , release - To Release the NFT Fractionalization token and deploy all the contracts in just one click
* Thirdweb Dashboard - to control all the feature in the contracts deployed and manage the Backend code of the same

Links for thirdweb track one custom contracts + bonus (release)
   - https://thirdweb.com/0xe22ecbba8fb9c0124eecb6afe0bf6a487424989f
   - https://thirdweb.com/0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f/TokensforNFT/1.0.1
   - https://thirdweb.com/0xe22eCBbA8fB9C0124eeCb6AfE0bf6A487424989f/Artist3/1.0.0
https://thirdweb.com/mumbai/0xF99FcE9c34d8ed38108425Ce39B6D4d4Cd3cb470/

## Team Members
[**Dhruv Agarwal** ](https://twitter.com/0xdhruva)- Backend and Integration

[**Kushagra Sarathe** ](https://twitter.com/kushagrasarathe) - Front-end

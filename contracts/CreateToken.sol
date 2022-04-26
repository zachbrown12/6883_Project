// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;
import "../client/node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../client/node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "./BaseTransaction.sol";

//tutorial http://adilmoujahid.com/posts/2021/05/intro-nfts-solidity/
// https://docs.secondstate.io/oasis-network-ethereum-runtime/tutorial-mint-and-transfer-your-own-erc-721-nft-tokens


contract nftContract is ERC721 {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() public ERC721("my NFT will", "DW") {}

   function mintNFT(string memory tokenURI) public returns (uint256) {
       _tokenIds.increment();
       uint256 newItemId = _tokenIds.current();
       _safeMint(msg.sender, newItemId);
       _setTokenURI(newItemId, tokenURI);
       return newItemId;
   }
}
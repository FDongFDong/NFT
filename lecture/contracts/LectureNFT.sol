//SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract LectureNFT is ERC721 {
    constructor() ERC721("LectureNFT", "LEC"){
        for (uint i = 0;i<10;i++){
            _safeMint(msg.sender, i+1);
        }
    }
    
    function _baseURI() internal view override returns (string memory){
        return "ipfs://QmP8ACNAB6AVU3tJP13V6FKzpfeqqm9CyMvVP3iRymw1CP";
    }
}
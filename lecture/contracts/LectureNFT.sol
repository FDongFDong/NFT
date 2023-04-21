//SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract LectureNFT is ERC721, Ownable{
    uint256 MAX_SUPPLY = 100;
    bool isSaleActive;
    uint256 totalSupply;
    using Strings for uint256;

    mapping(uint256 => uint256) tokenMetadataNo;

    constructor() ERC721("LectureNFT", "LEC"){
        
    }

    function _baseURI() internal view override returns (string memory){
        return "ipfs://QmP8ACNAB6AVU3tJP13V6FKzpfeqqm9CyMvVP3iRymw1CP";
    }
    function setSale(bool active) external onlyOwner {
        isSaleActive = active;
    }
    // count : 민팅할 개수
    function mintPlanet(uint256 count ) external payable{
        // 판매기간일때만 판매하기 위함
        require(isSaleActive, "not on sale");
        // 민팅 한번에 0.001 eth를 받기 위함
        require(msg.value >= 1000000000000000 * count);
        // 한번에 최대 10개까지만 발행 가능하도록
        require(count <= 10, "mint maximum 10 nfts at once");

        for (uint i =0 ;i<count;i++){
            require(totalSupply < MAX_SUPPLY, "max supply exceeded");
            // 마지막 블록의 hash 값(bytes 단위이기에 형변환 필요)
            // 1부터 8까지의 랜덤한 값
            tokenMetadataNo[totalSupply]= 1+ uint256(blockhash(block.number))%8;
            _safeMint(msg.sender, totalSupply++);
        }
    }
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        return string(abi.encodePacked(baseURI, tokenMetadataNo[tokenId].toString()));
    }

    function withdraw() external onlyOwner {
        // msg.sender 주소를 payable형으로 변경해줘야 해당 주소가 이더를 받을 수 있다.
        payable(msg.sender).transfer(address(this).balance);
    }
}
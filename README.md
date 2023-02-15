
# ERC-721

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721{
  string private _name;
  string private _symbol;

  mapping(uint256 => string) private _tokenInfo;
  mapping(uint256 => address) private _owners;
  mapping(address => uint256) private _balances;
  mapping(uint256 => address) private _tokenApprovals;
  mapping(address => mapping(address =>bool)) private _operatorApprovals;

  uint private totalSupply;

  event Transfer(address from, address to, uint tokenId);
  event Approval(address from, address to, uint tokenId);
  event ApprovalForAll(address from, address operator, bool approval);
  constructor(string memory name_, string memory symbol_) {
    _name = name_;
    _symbol = symbol_;
  }
  function balanceOf(address owner) public view returns (uint256){

  }
  function ownerOf(uint256 tokenId) public view returns (address){

  }
  function name() public view returns(string memory) {
    
  }
  function symbol() public view returns(string memory){

  }
  function tokenURI(uint256 tokenId) public view returns(string memory) {

  }
  function getApproved(uint256 tokenId) public view returns(address){

  }
  function isApprovedForAll(address owner, address operator) public view returns(bool){

  }
  function transferFrom( address from, address to, uint256 tokenId) public {

  }
  function mint(address to, uint256 tokenId, string memory url) public {

  }
  function burn(uint256 tokenId) public {

  }
  function transfer(address to, uint256 tokenId) public {
    
  }
  function approve(address to, uint256 tokenId) public {

  }
  function setApprovalForAll(address owner,address operator, bool approved) public {

  }
}
```

## Token URI

파일이 위치한 정보 및 파일의 정보들이 저장된 URI

metadata.json 파일이 json 형태로 저장되어있으며 이미지의 URI와 관련 속성들이 함께 저장되어 있다.

직접 블록에 이미지, 동영상 관련 정보를 넣게되면 용량도 크고 블록체인에 무리를 주게되기에 대안으로 파일이 위치한 TokenURI를 올리는 것이다.

1. IPFS를 통해 이미지를 업로드한다.
2. 

## 변수

### _tokenInfo : tokenIdD값으로 토큰 정보를 담는 mapping

```solidity
mapping(uint256 => string) private _tokenInfo;
```

### _owners : tokenID의 값으로 토큰 주인의 주소를 담는 mapping

```solidity
mapping(uint256 => address) private _owners;
```

### _balances : 사용자의 주소로 token 개수를 담는 mapping

```solidity
mapping(address => uint256) private _balances;
```

### _tokenApprovals : Token ID로 해당 토큰에 설정된 권한을 가진 주소를 담는 mapping

```solidity
mapping(uint256 => address) private _tokenApprovals;
```

### _operatorApprovals : from, to, bool

```solidity
mapping(address => mapping(address =>bool)) private _operatorApprovals;
```

## 생성자

- ERC20과는 달리 이름과 심볼만 받는다.

```solidity
constructor(string memory name_, string memory symbol_) {
    _name = name_;
    _symbol = symbol_;
}
```

## 함수

### mint() : 토큰 발행

```solidity
function mint(address to, uint256 tokenId, string memory url) public {
    // to 사용자의 NFT 토큰 개수
    _balances[to] += 1;
    // NFT 토큰 주인 설정
    _owners[tokenId] = to;
    // 토큰 정보에 url 정보가 함께 들어간다.
    _tokenInfo[tokenId] = url;
    // 전체 발행량을 업데이트한다.
    totalSupply += 1;
    // 발행 정보 표시
    emit Transfer(address(0), to, tokenId);
  }
```

### burn() : 토큰 소각

```solidity
function burn(uint256 tokenId) public {
    // 토큰 Id 값으로 owner를 찾아온다.
    address owner = _owners[tokenId];
    // 기존에 권한 설정한 값이 있으면 해당 설정 값도 초기화해준다.
    // 해주지 않으면 권한을 뺏을 수 있다.
    delete _tokenApprovals[tokenId];
    // owner의 발행량을 하나 제거해준다.
    _balances[owner] -= 1;
    // tokenID의 owner 정보를 초기화한다.
    delete _owners[tokenId];
    // 소각 정보 표시
    emit Transfer(owner, address(0), tokenId);
}
```

### transfer() : 토큰을 전송한다.

```solidity
function transfer(address to, uint256 tokenId) public {
    //  전송을 요청한 사람이 해당 토큰의 owner인지 확인한다.
    require(_owners[tokenId] == msg.sender, "eIncorrect Owner");
    // 기존 사용자의 권한을 삭제한다.
    delete _tokenApprovals[tokenId];
    _balances[msg.sender] -= 1;
    _balances[to] += 1;
    // owner가 변경되었기 때문에 수정해준다.
    _owners[tokenId] = to;
    emit Transfer(msg.sender, to, tokenId);
  }
```

1. 전송을 하려는 사용자가 해당 토큰의 owner인지 확인한다.
2. 토큰에 등록된 사용자의 이동 권한을 모두 삭제한다.
3. 전송을 하려는 사용자의 토큰을 1개 제거하고 받는 자(to)의 토큰을 1개 추가한다.
4. 토큰의 주인을 받는 자(to)의 주소로 변경한다.
5. 전송이 완료되었다는 이벤트를 출력한다.

### balanceOf() : 사용자의 토큰 개수를 확인한다.

```solidity
function balanceOf(address owner) public view returns (uint256){
    // 사용자의 잔액 정보 확인
    return _balances[owner];
}
```

### ownerOf() : 토큰의 주인을 확인할 수 있다.

```solidity
function ownerOf(uint256 tokenId) public view returns (address){
    // 해당 토큰의 주인을 확인하기 위함
    return _owners[tokenId];
}
```

### name() : 해당 컨트랙트의 이름을 확인한다.

```solidity
function name() public view returns(string memory) {
    return _name;
}
```

### symbold() : 해당 컨트랙트의 심볼을 확인한다.

```solidity
function symbol() public view returns(string memory){
    return _symbol;
}
```

### tokenURI() : 토큰이 가지고 있는 정보를 확인할 수 있다.

```solidity
function tokenURI(uint256 tokenId) public view returns(string memory) {
    return _tokenInfo[tokenId];
}
```

### getApproved() : 토큰에 설정된 권한을 가진 자의 주소를 확인할 수 있다.

```solidity
function getApproved(uint256 tokenId) public view returns(address){
    return _tokenApprovals[tokenId];
  }
```

### approve() :  특정 계정에게 자신이 소유한 NFT 1개를 사용할 수 있도록 권한을 주는 함수

```solidity
function approve(address to, uint256 tokenId) public {
    require(_owners[tokenId] == msg.sender, "Incorrect Owner");
    _tokenApprovals[tokenId] = to;
    emit Approval(_owners[tokenId], to, tokenId);
  }
```

### isApprovedForAll(() : 특정 주소에 이동 권한을 넘겨줬는지 체크하는 함수

```solidity
function isApprovedForAll(address owner, address operator) public view returns(bool){
    return _operatorApprovals[owner][operator];
}
```

### setApprovalForAll() : 특정 주소에 내가가진 모든 NFT 권한을 넘겨주는 함수

```
function setApprovalForAll(address owner,address operator, bool approved) public {
    // owner가 가진 모든 NFT의 권한을 operator에게 허용한다.
    _operatorApprovals[owner][operator] = approved;
    emit ApprovalForAll(owner, operator, approved);
}
```

- approve 여러개를 사용한 효과

### transferFrom () : tokenID를 가진 NFT를 from주소에서 to 주소로 옮긴다.

- Opensea나 거래소가 사용한다.
- 해당함수는 받는 주소가 NFT를 받을 수 있는 주소인지 확인하지 못하므로 safeTransferFrom() 함수를 사용하여 받는 주소가 받을 수 있는 상태인지 확인하여 전송하는 함수이다.

```solidity
function transferFrom( address from, address to, uint256 tokenId) public {
    // 토큰의 소유자 정보를 가져온다.
    address owner = _owners[tokenId];
    // 보내고자 하는 사용자가 owner인지 확인
    // 보내고자 하는 사용자가 전송할 수 있는 권한을 가지고 있는지 확인
    // 토큰에 설정된 권한이 msg.sender인지 확인
    require((msg.sender == owner), "Not Approved");
    require(isApprovedForAll(owner, msg.sender),  "Not Approved");
    require(getApproved(tokenId)== msg.sender, "Not Approved");
    delete _tokenApprovals[tokenId];
    _balances[from] -= 1;
    _balances[to] += 1;
    // owner가 변경되었기 때문에 수정해준다.
    _owners[tokenId] = to;
    emit Transfer(from, to, tokenId);
  }
```

# 전체 코드

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721{
  string private _name;
  string private _symbol;

  mapping(uint256 => string) private _tokenInfo;
  mapping(uint256 => address) private _owners;
  mapping(address => uint256) private _balances;
  mapping(uint256 => address) private _tokenApprovals;
  mapping(address => mapping(address =>bool)) private _operatorApprovals;

  uint private totalSupply;

  event Transfer(address from, address to, uint tokenId);
  event Approval(address from, address to, uint tokenId);
  event ApprovalForAll(address from, address operator, bool approval);
  constructor(string memory name_, string memory symbol_) {
    _name = name_;
    _symbol = symbol_;
  }

  function balanceOf(address owner) public view returns (uint256){
    // 사용자의 잔액 정보 확인
    return _balances[owner];
  }

  function ownerOf(uint256 tokenId) public view returns (address){
    // 해당 토큰의 주인을 확인하기 위함
    return _owners[tokenId];
  }

  function name() public view returns(string memory) {
    return _name;
  }

  function symbol() public view returns(string memory){
    return _symbol;
  }

  function tokenURI(uint256 tokenId) public view returns(string memory) {
    return _tokenInfo[tokenId];
  }

  function getApproved(uint256 tokenId) public view returns(address){
    return _tokenApprovals[tokenId];
  }

  function isApprovedForAll(address owner, address operator) public view returns(bool){
    return _operatorApprovals[owner][operator];
  }

  function transferFrom( address from, address to, uint256 tokenId) public {
    // tokenID를 가진 NFT를 from주소에서 to 주소로 옮긴다.
    // 토큰의 소유자 정보를 가져온다.
    address owner = _owners[tokenId];
    // 보내고자 하는 사용자가 owner인지 확인
    // 보내고자 하는 사용자가 전송할 수 있는 권한을 가지고 있는지 확인
    // 토큰에 설정된 권한이 msg.sender인지 확인
    require((msg.sender == owner), "Not Approved");
    require(isApprovedForAll(owner, msg.sender),  "Not Approved");
    require(getApproved(tokenId)== msg.sender, "Not Approved");
    delete _tokenApprovals[tokenId];
    _balances[from] -= 1;
    _balances[to] += 1;
    // owner가 변경되었기 때문에 수정해준다.
    _owners[tokenId] = to;
    emit Transfer(from, to, tokenId);
  }
    
  function mint(address to, uint256 tokenId, string memory url) public {
    // to 사용자의 NFT 토큰 개수
    _balances[to] += 1;
    // NFT 토큰 주인 설정
    _owners[tokenId] = to;
    // 토큰 정보에 url 정보가 함께 들어간다.
    _tokenInfo[tokenId] = url;
    // 전체 발행량을 업데이트한다.
    totalSupply += 1;
    // 발행 정보 표시
    emit Transfer(address(0), to, tokenId);
  }

  function burn(uint256 tokenId) public {
    // 토큰 Id 값으로 owner를 찾아온다.
    address owner = _owners[tokenId];
    // 기존에 권한 설정한 값이 있으면 해당 설정 값도 초기화해준다.
    // 해주지 않으면 권한을 뺏을 수 있다.
    delete _tokenApprovals[tokenId];
    // owner의 발행량을 하나 제거해준다.
    _balances[owner] -= 1;
    // tokenID의 owner 정보를 초기화한다.
    delete _owners[tokenId];
    // 소각 정보 표시
    emit Transfer(owner, address(0), tokenId);
  }

  function transfer(address to, uint256 tokenId) public {
    //  전송을 요청한 사람이 해당 토큰의 owner인지 확인한다.
    require(_owners[tokenId] == msg.sender, "Incorrect Owner");
    // 기존 사용자의 권한을 삭제한다.
    delete _tokenApprovals[tokenId];
    _balances[msg.sender] -= 1;
    _balances[to] += 1;
    // owner가 변경되었기 때문에 수정해준다.
    _owners[tokenId] = to;
    emit Transfer(msg.sender, to, tokenId);
  }

  function approve(address to, uint256 tokenId) public {
    // 특정 계정에게 자신이 소유한 NFT 1개를 사용할 수 있도록 권한을 주는 함수
    require(_owners[tokenId] == msg.sender, "Incorrect Owner");
    _tokenApprovals[tokenId] = to;
    emit Approval(_owners[tokenId], to, tokenId);
  }

  function setApprovalForAll(address owner,address operator, bool approved) public {
    // owner가 가진 모든 NFT의 권한을 operator에게 허용한다.
    _operatorApprovals[owner][operator] = approved;
    emit ApprovalForAll(owner, operator, approved);
  }
}
```

# ERC721 - openzeppelin

```solidity
//Contract based on [<https://docs.openzeppelin.com/contracts/3.x/erc721>](<https://docs.openzeppelin.com/contracts/3.x/erc721>)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFTs is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
```

# ERC721 발행 - Opensea Testnet

https://testnets.opensea.io/assets/goerli/0xa9768c3c78332b9085ab20de8dcaceb9de02f5bf/2

![image](https://user-images.githubusercontent.com/20445415/218996701-f54be2e6-ee33-48ff-a9a1-c191e041e0ef.png)


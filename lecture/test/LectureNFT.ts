import { ethers } from 'hardhat';
import { Signer } from 'ethers';
import { expect } from 'chai';

describe('LectureNFT', () => {
  let owner: Signer;
  // 지갑 하나만 가져오기
  //befor 함수는 테스트 코드가 실행되기 전에 실행된다.
  before(async () => {
    [owner] = await ethers.getSigners();
  });
  it('should have 10 nfts', async () => {
    // 컨트랙트 배포
    const LectureNFT = await ethers.getContractFactory('LectureNFT');
    // 생성자의 파라미터를 입력할 수 있다.
    const contract = await LectureNFT.deploy();
    // 컨트랙트가 배포되기 까지 기다리기 위함
    await contract.deployed();
    // owner의 nft 개수는 10개여야 한다.
    expect(await contract.balanceOf(owner.getAddress())).to.be.equal(10);
  });
});

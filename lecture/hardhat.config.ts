import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const ALCHEMY_API_KEY = 'I7dn3danb00dfgjxCfVNfmDOcwXMwLbY';
const PRIVATE_KEY =
  'b43112fd82593f95dea3ba1a25eed28a6a75d6763677a42560b5d7815fea7977';
const config: HardhatUserConfig = {
  solidity: '0.8.18',
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.7",
  networks: {
    mumbai: {
      url: `${process.env.ALCHEMY_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    hardhat: {
      forking: {
        url: "https://polygon-mumbai.g.alchemy.com/v2/HKZZG7EIshTTOUMWT9fKyFxa2E3chbmr",
        chainId: 80001,
      }
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  }
};

require('@nomiclabs/hardhat-waffle');
require('dotenv').config();
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  solidity: "0.8.7",
  networks: {
    mumbai: {
      url: `${process.env.ALCHEMY_URL}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY,
  }
};

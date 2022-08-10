// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const { Wallet } = require("ethers");
const { ethers } = require("hardhat");

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const wallet = new ethers.Wallet("0xffd569bc97f8d6cfb04a3a17ba634d14ae07e5bbd669ac9f0a334c753c9662c2", provider);

async function main() {

  const MumbaiFantasy = await hre.ethers.getContractFactory("MumbaiFantasy");
  const mumbai = await MumbaiFantasy.deploy();

  await mumbai.deployed();

  console.log("Address", mumbai.address);

  console.log(wallet);

  const buy = await mumbai.buyIn({ value: ethers.utils.parseEther("0.1") });

  console.log(buy);

  const chainlink = await mumbai.requestFirstId();

  console.log(chainlink);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

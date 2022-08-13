//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

contract MumbaiFantasy is ChainlinkClient, ConfirmedOwner {

  mapping(address => string) public teamOwners;
  string[] public playersThatHaveBought;
  string public topPlayer;
  uint public validatedWinnerCount = 0;

  using Chainlink for Chainlink.Request;

  string public id;

  uint256 public volume;
  bytes32 private jobId;
  uint256 private fee;

  event RequestFirstId(bytes32 indexed requestId, string id);

  // Chainlink Oracle testnet: 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3
  //

  constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = '7d80a6386ef543a3abb52817f6707e3b';
        // https://docs.chain.link/docs/multi-variable-responses/#response-types
        // https://docs.polygon.technology/docs/develop/oracles/chainlink/
        // https://docs.chain.link/docs/api-array-response/
        fee = 0.2 * 10 ** 18; // 0,1 * 10**18 (Varies by network and job)
    }


  function buyIn(string memory _teamName) external payable {
    require(msg.value == 0.1 ether, "Buy in is 50 MATIC");
    playersThatHaveBought.push(_teamName);
    teamOwners[msg.sender] = _teamName;
  }


  function returnBoughtInPlayers() public view returns(string[] memory) {
    // return array of players (string format) that have bought in
    return playersThatHaveBought;
  }

  function verifyWinner() public {
    // Must be a person who's bought in
    // If they are, requires 3 people to validate the winner is correct
    require(bytes(teamOwners[msg.sender]).length > 0);
    validatedWinnerCount += 1;
  }

  function retrieveWinnings() public {
    require(keccak256(abi.encodePacked(teamOwners[msg.sender])) == keccak256(abi.encodePacked(topPlayer)));
    require(validatedWinnerCount >= 1);
    (bool sent, ) = (msg.sender).call{value: address(this).balance}("");
    require(sent, "Failed to send MATIC");
  }

  function requestFirstId() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    req.add('get', 'https://fantasy.premierleague.com/api/leagues-classic/583326/standings/');

    req.add('path', 'standings,results,0,entry_name');

    return sendChainlinkRequest(req, fee);
  }

  function fulfill(bytes32 _requestId, string memory _id) public recordChainlinkFulfillment(_requestId) {
        emit RequestFirstId(_requestId, _id);
        id = _id;
        topPlayer = _id;
    }

  function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), 'Unable to transfer');
    }

}

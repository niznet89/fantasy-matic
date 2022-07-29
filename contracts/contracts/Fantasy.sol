//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../node_modules/hardhat/console.sol";
import '../node_modules/@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '../node_modules/@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

contract Fantasy is ChainlinkClient, ConfirmedOwner {

  mapping(address => string) public teamOwners;
  address[3] public topThree;
  address public topPlayer;

  constructor()  {
        setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        setChainlinkOracle(0xf3FBB7f3391F62C8fe53f89B41dFC8159EE9653f);
        jobId = '53f9755920cd451a8fe46f5087468395';
        // https://docs.chain.link/docs/multi-variable-responses/#response-types
        // https://docs.polygon.technology/docs/develop/oracles/chainlink/
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }


  function buyIn(string _teamName) external payable {
    require(msg.value == 50 ether, "Buy in is 50 MATIC");

    teamOwners[_teamName] = msg.sender;
  }

  function getTopPlayer() external {
    // Get the top person in league
  }

  function returnBoughtInPlayers public view returns([]) {
    // return array of players (string format) that have bought in
  }

  function verifyWinner(string _winner) public {
    // Must be a person who's bought in
    // If they are, requires 3 people to validate the winner is correct
  }

}

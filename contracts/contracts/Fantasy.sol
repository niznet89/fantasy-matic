//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "../node_modules/hardhat/console.sol";
import '../node_modules/@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '../node_modules/@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';

contract Fantasy is ChainlinkClient, ConfirmedOwner {

  mapping(address => string) public teamOwners;
  string[] public playersThatHaveBought;
  address public topPlayer;

  using Chainlink for Chainlink.Request;

  string public id;

  uint256 public volume;
  bytes32 private jobId;
  uint256 private fee;

  event RequestFirstId(bytes32 indexed requestId, string id);

  constructor()  {
        setChainlinkToken(0x01BE23585060835E02B77ef475b0Cc51aA1e0709);
        setChainlinkOracle(0xf3FBB7f3391F62C8fe53f89B41dFC8159EE9653f);
        jobId = '53f9755920cd451a8fe46f5087468395';
        // https://docs.chain.link/docs/multi-variable-responses/#response-types
        // https://docs.polygon.technology/docs/develop/oracles/chainlink/
        // https://docs.chain.link/docs/api-array-response/
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }


  function buyIn(string memory _teamName) external payable {
    require(msg.value == 50 ether, "Buy in is 50 MATIC");
    playersThatHaveBought.push(_teamName);
    teamOwners[_teamName] = msg.sender;
  }

  function getTopPlayer() external {
    // Get the top person in league
  }

  function returnBoughtInPlayers() public view returns(string[]) {
    // return array of players (string format) that have bought in
    return playersThatHaveBought;
  }

  function verifyWinner(string _winner) public {
    // Must be a person who's bought in
    // If they are, requires 3 people to validate the winner is correct
  }

  function retrieveWinnings() public {
    require(msg.sender == topPlayer);
  }

  function requestLeader() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

    req.add('get', 'https://fantasy.premierleague.com/api/leagues-classic/583326/standings');

    req.add('path', 'standings,results,0');

    return sendChainlinkRequest(req, fee);
  }

  function fulfill(bytes32 _requestId, string memory _id) public recordChainlinkFulfillment(_requestId) {
        emit RequestFirstId(_requestId, _id);
        id = _id;
    }

}

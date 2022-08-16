import "./index.scss";
import bootstrap from 'bootstrap';
import { ethers } from "ethers";
import MumbaiABI from "./abis/mumbai.json";
import Web3Modal from "web3modal";
require('dotenv').config()


document.addEventListener("DOMContentLoaded", async () => {
  const baseURL = 'https://fantasy.premierleague.com/api/';
  const api = 'https://api.allorigins.ml/raw?url=';
  const address = "0x4CeF4b22a1ebacE4E28c3088D8344741043E74Db";

  const jsonObject = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://fantasy.premierleague.com/api/leagues-classic/583326/standings/')}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {return JSON.parse(data.contents)});

  const returnBoughtInPlayers = async() => {
    const provider = new ethers.providers.AlchemyProvider("maticmum", process.env.ALCHEMY_KEY);
    const fantasyContract = new ethers.Contract(address, MumbaiABI.abi, provider);

    // Hit Function to return Array of peeps who HAVE bought in
    const arrayOfBoughtIn = await fantasyContract.returnBoughtInPlayers();
    ARRAYOFBOUGHTIN = await arrayOfBoughtIn;
  }

  returnBoughtInPlayers();
  let ARRAYOFBOUGHTIN = [];


  const returnButtonToBuy = (teamName) => {
    console.log(ARRAYOFBOUGHTIN);
    if (ARRAYOFBOUGHTIN.includes(teamName)) {
      return "";
    } else {
      return `<a class="btn btn-outline-danger" onClick=${clickToBuy(teamName)} href="#" role="button">Buy In</a>`
    }
  }

  const clickToBuy = async(teamName) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // Need the address for contract & ABI
    const contract = new ethers.Contract(address, MumbaiABI.abi, provider);
    // Hit contract function to deposit
  }

  const arrayOfStandings = jsonObject.standings.results;

  for (let i = 0; i < arrayOfStandings.length; i++) {
    document.getElementById("standings-table").insertAdjacentHTML('beforeend', `<tr>
      <td>${i + 1}</td>
      <td>${arrayOfStandings[i].player_name}</td>
      <td>${arrayOfStandings[i].entry_name}</td>
      <td>${returnButtonToBuy(arrayOfStandings[i].entry_name)}</td>
    </tr>`);
  }

  const provideTopPlayer = async()=> {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // Need the address for contract & ABI
    const contract = new ethers.Contract(address, MumbaiABI.abi, provider);
    const updateTopPlayer = await contract.addTopPlayer(jsonObject.standings.results[0].entry_name);
  }
});


document.getElementByID("get-top-player").addEventListener("onClick", async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  // Need the address for contract & ABI
  const contract = new ethers.Contract(address, MumbaiABI.abi, provider);
  const updateTopPlayer = await contract.addTopPlayer(jsonObject.standings.results[0].entry_name);
});

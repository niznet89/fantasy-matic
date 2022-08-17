import "./index.scss";
import bootstrap from 'bootstrap';
import { ethers } from "ethers";
import MumbaiABI from "./abis/mumbai.json";
import Web3Modal from "web3modal";
require('dotenv').config()


document.addEventListener("DOMContentLoaded", async () => {
  const baseURL = 'https://fantasy.premierleague.com/api/';
  const api = 'https://api.allorigins.ml/raw?url=';
  const address = "0xB44f03Da01848b585B3C2e43FFeb905A98998ED8";

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
    return arrayOfBoughtIn;
  }


  let ARRAYOFBOUGHTIN = await returnBoughtInPlayers().then((response) => {
    return response;
  });


  const returnButtonToBuy = (teamName) => {
    if (ARRAYOFBOUGHTIN.includes(teamName)) {
      return "";
    } else {
      return `<a class="btn btn-outline-danger" id="${teamName.toString()}" role="button">Buy In</a>`;
    }
  }

  const clickToBuy = async(teamName) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // Need the address for contract & ABI
    const contract = new ethers.Contract(address, MumbaiABI.abi, provider.getSigner());
    const buyIn = await contract.buyIn(teamName, { value: ethers.utils.parseEther("0.1") });

    console.log(await buyIn.wait());
    if(confirm("You just staked your MATIC for Bondi Sandz! Good luck with the season. Click OK to refresh screen.")){
      window.location.reload();
  }
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

  document.querySelectorAll('.btn-outline-danger').forEach(item => {
    item.addEventListener('click', event => {
      //handle click
      clickToBuy(event.path[0].id);
    })
  })

  document.getElementById("get-top-player").addEventListener("click", async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // Need the address for contract & ABI
    const contract = new ethers.Contract(address, MumbaiABI.abi, provider.getSigner());
    const updateTopPlayer = await contract.requestFirstId();
    console.log(await updateTopPlayer.wait());
  });
});

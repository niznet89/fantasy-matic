import "./index.scss";
import bootstrap from 'bootstrap';
import { ethers } from "ethers";


document.addEventListener("DOMContentLoaded", async () => {
  const baseURL = 'https://fantasy.premierleague.com/api/';
  const api = 'https://api.allorigins.ml/raw?url=';

  // const doCORSRequest = async (url) => {
  //   const response = await fetch(api + encodeURIComponent(baseURL + url));
  //   const myJson = await response.json();
  //   return myJson
  // }
  const jsonObject = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://fantasy.premierleague.com/api/leagues-classic/583326/standings/')}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {return JSON.parse(data.contents)});

  const returnBoughtInPlayers = async() => {
    const defaultProvider = await ethers.getDefaultProvider();
    const fantasyContract = new ethers.Contract(address, abi, defaultProvider);
    console.log(fantasyContract);
    // Hit Function to return Array of peeps who HAVE bought in
    const arrayOfBoughtIn = await fantasyContract.returnBoughtInPlayers();

    return arrayOfBoughtIn;
  }

  const arrayOfBoughtIn = returnBoughtInPlayers();
  console.log(arrayOfBoughtIn);

  const returnButtonToBuy = async (teamName) => {
    if (arrayOfBoughtIn.includes(teamName)) {
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
    const contract = new ethers.Contract(address, abi, provider);
    // Hit contract function to deposit
  }


  console.log(jsonObject.standings.results);
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
    const contract = new ethers.Contract(address, abi, provider);
    const updateTopPlayer = await contract.addTopPlayer(jsonObject.standings.results[0].entry_name);
  }
});


document.getElementByID("get-top-player").addEventListener("onClick", async () => {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  // Need the address for contract & ABI
  const contract = new ethers.Contract(address, abi, provider);
  const updateTopPlayer = await contract.addTopPlayer(jsonObject.standings.results[0].entry_name);
});

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
    // Hit Function to return Array of peeps who HAVE bought in
    const arrayOfBoughtIn;
    return arrayOfBoughtIn;
  }

  function returnButtonToBuy(teamName) {
    const arrayOfBoughtIn = returnBoughtInPlayers();
    if (arrayOfBoughtIn.includes(teamName)) {
      return "";
    } else {
      return `<a class="btn btn-outline-danger" onClick=${clickToBuy(teamName)} href="#" role="button">Buy In</a>`
    }
  }

  function clickToBuy(teamName) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    // Need the address for contract & ABI
    const contract = new ethers.Contract(address, abi, provider);
    // Hit contract function to deposit
  }
  returnBoughtInPlayers();

  console.log(jsonObject.new_entries.results);
  const testArray = ["Put My Willian", "Crunch"];

  for (let i = 0; i < testArray.length; i++) {
    document.getElementById("standings-table").insertAdjacentHTML('beforeend', `<tr>
      <td>${i + 1}</td>
      <td>${returnFullname(testArray[i])}</td>
      <td>${testArray[i]}</td>
      <td>${returnButtonToBuy(testArray[i])}</td>
    </tr>`);
  }

  function returnFullname(teamName) {
    const resultsArray = jsonObject.new_entries.results;
    let fullName;
    for (let i = 0; i < resultsArray.length; i++) {
      if (resultsArray[i].entry_name === teamName) {
        fullName = resultsArray[i].player_first_name + " " + resultsArray[i].player_last_name;
      }
    }
    return fullName;
  }
});

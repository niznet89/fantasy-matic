import "./index.scss";


document.addEventListener("DOMContentLoaded", async () => {
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const baseURL = 'https://fantasy.premierleague.com/api/';
  const api = 'https://api.allorigins.ml/raw?url=';

  // const doCORSRequest = async (url) => {
  //   const response = await fetch(api + encodeURIComponent(baseURL + url));
  //   const myJson = await response.json();
  //   return myJson
  // }
  const test = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://fantasy.premierleague.com/api/leagues-classic/583326/standings/')}`)
      .then(response => {
        if (response.ok) return response.json()
        throw new Error('Network response was not ok.')
      })
      .then(data => {return JSON.parse(data.contents)});

  // let test = await doCORSRequest("leagues-classic/583326/standings/").then((data) => {return data.standings.results});
  console.log(test);

  // console.log(test);
});

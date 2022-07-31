import "./index.scss";


document.addEventListener("DOMContentLoaded", () => {

  fetch("https://fantasy.premierleague.com/api/leagues-classic/583326/standings", {mode: 'no-cors', headers: {
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  }}).then((response) => {
        return response;
      }).then((data) => {
        console.log(data);
      })
});

const { default: axios } = require("axios");



getOpenseaItems()

  async function getOpenseaItems() {
    var tokenidjson = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../tokenid.json",
        'dataType': "json",
        'success': function (data) {
            tokenidjson = data;
        }
    });
/*
    fetch("../tokenid.json")
    .then(res => {
       return res.json();
    })
    .then(jsondata => console.log(jsondata));
*/
    const osContainer = document.getElementById('openseaItems')
/*
    const items = await fetch(`https://api.opensea.io/api/v1/assets?owner=${window.userAddress}&order_direction=desc&offset=0&limit=50`)
      .then((res) => res.json())
      .then((res) => {
        return res.assets
      })
      .catch((e) => {
        console.error(e)
        console.error('Could not talk to OpenSea')
        return null
      })
*/


const options = {
  method: 'GET',
  url: 'https://api.nftport.xyz/v0/accounts/0xb69DE347b3c5b65C4d50a2401344F9930023E604',
  params: {chain: 'polygon'},
  headers: {
    'Content-Type': 'application/json',
    Authorization: '27cf1d72-f453-4b4a-b03a-03a1e3c1a88a'
  }
};


const data =  axios.request(options);



console.log(data)


  }
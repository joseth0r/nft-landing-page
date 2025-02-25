//import missingdatajson from "/missingdatajson.json" assert { type: "json" };

const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963";
const AUTH = "6430d63c-639c-47ee-8999-7371d633b0f0";
const chain = "polygon";
const include = "metadata";

wallet="0x1a327f38f151679c945a072960bf68e55c4193A6";
var continuation = "";
let page = 1

//const missingdatajson = require('../missingdatajson.json'); 

const getOwnedNfts = async (wallet, page) => {
  const url = `https://api.nftport.xyz/v0/accounts/${wallet}?`; // quitar / aqui
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH
    }
  };
  const query = new URLSearchParams({
chain,
continuation

  });

  let editions = [];
  let nftname=[];
  let nftimage=[];
    try {
    const data = await fetchData(url + query, options);

    console.log(`Wallet: ${wallet}`);
    console.log(data)
    console.log(`Recieved page ${page}`);

    const total = data.total;
    const pages = Math.ceil(total / 50);
    continuation=data.continuation;
    console.log(continuation)
    data.nfts.forEach(nft => {
      //&& (tokenarray.includes(nft.token_id)==true)
      
      if(nft.contract_address === CONTRACT && (tokenarray.includes(nft.token_id)==true)) {
        editions.push(nft.token_id);
        if (nft.name===""){
          var missingdata = missingdatajson.filter( element => element.tokenid == nft.token_id);
          nftname.push(missingdata[0].name);
          nftimage.push(missingdata[0].image);
  
          }
          else{       
            nftname.push(nft.name);
            nftimage.push(nft.file_url);
  
          }
      }
    })

    return {
      isOwner: editions.length > 0 ? true : false,
      editions,
      nftname,
      nftimage,
      next_page: +page === pages ? null : +page + 1,
      continuation
    }
  } catch(err) {
    console.log(`Catch: ${JSON.stringify(err)}`)
    return {
      error: err
    }
  }
}

async function fetchData(url, options) {
  return new Promise((resolve, reject) => {
    return fetch(url, options).then(res => {
      const status = res.status;            

      if(status === 200) {
        return resolve(res.json());
      } else {
        console.log(`Fetch failed with status ${status}`);
        return reject(res.json());
      }        
    }).catch(function (error) { 
      reject(error)
    });
  });
}
getOwnedNfts(wallet,page)

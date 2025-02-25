const fetch = require('node-fetch')
//import missingdatajson from "/missingdatajson.json" assert { type: "json" };

const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963";
const AUTH = process.env.NFTPORT_API_KEY;
const chain = "polygon";
const include = "metadata";
const tokenarray = require('../tokenarray.json'); //para comprobar los CH
const missingdatajson = require('../missingdatajson.json'); //para comprobar los CH

//const missingdatajson = require('../missingdatajson.json'); 

exports.handler = async (event, context) => {
  const wallet = event.queryStringParameters && event.queryStringParameters.wallet
  const page = event.queryStringParameters && event.queryStringParameters.page
  const continuation = event.queryStringParameters && event.queryStringParameters.continuation

  const isOwner = (wallet) => {
    if(!wallet) {
      return {
        isOwner: false
      }
    } else {
      return getOwnedNfts(wallet, page,continuation)
    }
  }

  const response = await isOwner(wallet)

  return {
    'statusCode': 200,
    'headers': {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    'body': JSON.stringify(response)
  }
}

const getOwnedNfts = async (wallet, page,continuation) => {
  const url = `https://api.nftport.xyz/v0/accounts/${wallet}?`;
  
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: AUTH
    }
  };
  const query = new URLSearchParams({
    chain,
    include,
    continuation
  });

  let editions = [];
  let nftname=[];
  let nftimage=[];
    try {
    const data = await fetchData(url + query, options);
    console.log(`Recieved page ${page}`);

    console.log(`Wallet: ${wallet}`);
    const continuation = data.continuation;
    console.log(continuation)

    const total = data.total;
    const pages = Math.ceil(total / 50);
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
      continuation,
      next_page: +page === pages ? null : +page + 1,
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

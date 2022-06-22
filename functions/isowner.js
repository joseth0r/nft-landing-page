const fetch = require('node-fetch')

const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963";
const AUTH = process.env.NFTPORT_API_KEY;
const chain = "polygon";
const include = "metadata";

//const tokenarray=["62020157288306137204262585601212871537268194779568533209731806292692472692737","62020157288306137204262585601212871537268194779568533209731806159651565731841"];


const tokenarray = require('../tokenarray.json');

exports.handler = async (event, context) => {
  const wallet = event.queryStringParameters && event.queryStringParameters.wallet
  const page = event.queryStringParameters && event.queryStringParameters.page

  const isOwner = (wallet) => {
    if(!wallet) {
      return {
        isOwner: false
      }
    } else {
      return getOwnedNfts(wallet, page)
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

const getOwnedNfts = async (wallet, page) => {
  const url = `https://api.nftport.xyz/v0/accounts/${wallet}/?`;
  
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
    page_number: page
  });

  let editions = [];
  let nftname=[];
  let nftimage=[];
  try {
    const data = await fetchData(url + query, options)
    console.log(`Recieved page ${page}`)
    const total = data.total;
    const pages = Math.ceil(total / 50);
    data.nfts.forEach(nft => {
      
      //if(nft.contract_address === CONTRACT && (tokenid_data.tokenid.includes(nft.token_id)==true)) { //esto no funciona
      if(nft.contract_address === CONTRACT && (tokenarray.includes(nft.token_id)==true)) { //esto funciona
        editions.push(nft.token_id);
        if (nftname==""){
          missingname_image (tokenid)
          nftname=nftname_missing
          nftname=nftimage_missing

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




//new
async function missingname_image (tokenid){

  const options = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': 'bafa0d3c02b54c3dbaf92c66ac2bb250'}
  };
  
  const infomissing= await fetch(`https://api.opensea.io/api/v2/metadata/matic/${CONTRACT}/${tokenid}`, options)
    .then(response => response.json())  
    .catch(err => console.error(err))
  
  console.log(infomissing.name)
  console.log(infomissing.image)
  
  nftname_missing=infomissing.name
  nftimage=infomissing.image
  
  return{
    nftname_missing,
    nftimage_missing
  }
  
  }
//
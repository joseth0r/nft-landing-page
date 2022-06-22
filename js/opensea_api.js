
const tokenid= "62020157288306137204262585601212871537268194779568533209731806372956821520385"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"
var nftimage_missing=[]

const options_os = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': 'bafa0d3c02b54c3dbaf92c66ac2bb250'}
  };



  const getOwnedNfts = async () => {
   
    try {
      const data = await fetchData(tokenid);
      console.log(data)
      console.log(data.name)
    }  catch(err) {
      console.log(`Catch: ${JSON.stringify(err)}`)
      return {
        error: err
      }
    }
  }

async function fetchData(tokenid){
  var url_os=`https://api.opensea.io/api/v2/metadata/matic/${CONTRACT}/${tokenid}`;

//const responsemissing=await fetch(url_os,options_os).then(response => response.json());
return new Promise((resolve, reject) => {
  return fetch(url_os, options_os).then(res => {
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

//missing(tokenid).then(val =>  test=val)

//missing(tokenid).then(val => console.log(val))




getOwnedNfts()
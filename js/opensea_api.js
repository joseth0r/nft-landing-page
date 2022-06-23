
const tokenid= "62020157288306137204262585601212871537268194779568533209731806372956821520385"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"
const WALLET_ADDRESS= ""
var nftimage_missing=[]
const nftname2=""
const options_os = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': 'bafa0d3c02b54c3dbaf92c66ac2bb250'}
  };
  let nftname=[];


async function getmissingdata(tokenid) {

    var url_os=`https://api.opensea.io/api/v2/metadata/matic/${CONTRACT}/${tokenid}`;
  return fetch(url_os, options_os)
  .then(response => response.json())
  .catch(err => console.error(err))
  ;
   
  }
const datamissing = await getmissingdata(tokenid);
console.log(datamissing)




/*
var missingdata;
(async () => {
  missingdata = await getmissingdata(tokenid)
  // handle the tags result here
console.log(missingdata)

})()
// if you try use tags here it will be undefined

console.log(nftname)
*/

/*
hola=fetchOwnCollection()
  console.log(hola)*/
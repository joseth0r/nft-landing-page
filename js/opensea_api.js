
const tokenid= "62020157288306137204262585601212871537268194779568533209731806372956821520385"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"
const WALLET_ADDRESS= ""
var nftimage_missing=[]
let nftname=["hola"];
const options = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': 'bafa0d3c02b54c3dbaf92c66ac2bb250'}
  };


async function getmissingdata(tokenid) {

    var url_os=`https://api.opensea.io/api/v2/metadata/matic/${CONTRACT}/${tokenid}`;

    const collectionResponse = await fetch(
      url_os,
      options,
    );
    
    return collectionResponse.json();
  }

  getmissingdata(tokenid)
  .then(function(result){

          nftname2=result.name
          nftname.push(nftname2)
          console.log(nftname)
        })


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
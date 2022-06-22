
const tokenid= "62020157288306137204262585601212871537268194779568533209731806372956821520385"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"
var nftimage_missing=[]



fetchMissingData2(tokenid)

//new
async function fetchMissingData2 (tokenid){

  const options_os = {
    method: 'GET',
    headers: {Accept: 'application/json', 'X-API-KEY': 'bafa0d3c02b54c3dbaf92c66ac2bb250'}
  };
  
  const infomissing= await fetch(`https://api.opensea.io/api/v2/metadata/matic/${CONTRACT}/${tokenid}`, options_os)
    .then(response => response.json())  
    .catch(err => console.error(err))
    console.log(response)  
  }
//

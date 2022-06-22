
const tokenid= "62020157288306137204262585601212871537268194779568533209731806372956821520385"
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963"

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

nftname=infomissing.name
nftimage=infomissing.image

return{
  nftname,
  nftimage
}

}

nftnamenew= missingname_image(tokenid)
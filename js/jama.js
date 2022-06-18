

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


const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://api.nftport.xyz/v0/accounts/0xb69DE347b3c5b65C4d50a2401344F9930023E604?chain=polygon&contract_address=0x2953399124f0cbb46d2cbacd8a89cf0599974963",
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
      "Authorization": "27cf1d72-f453-4b4a-b03a-03a1e3c1a88a"
    }
  };
  
  $.ajax(settings).done(function (response) {
   // console.log(response);
console.log(tokenidjson.Students[1].tokenid)
    if (response.length === 0) { return }

    
    response.nfts.forEach((nft) => { //recorremos nft del owner.
        const {contract_address,token_id, name, file_url } = nft;

        for (var i=0; i<response.nfts.length;i++){

            for(var j=0; j<tokenidjson.Students.length; j++){
      
              if (response.nfts[i].token_id===tokenidjson.Students[j].tokenid){
                  console.log("hola")
                  
                  const newElement = document.createElement('div')
                  newElement.innerHTML = `
                    <a href='https://opensea.io/assets/matic/${contract_address}/${token_id}' target="_blank">
                      <div class='flex flex-col mx-4'>
                        <img
                          src='${file_url}'
                          class='w-full rounded-lg' />
                        <div class='flex-col w-full space-y-1 '>
                          <p class='text-gray-800 text-lg'>${name}</p>
                        </div>
                      </div>
                    </a>
                  `
                  osContainer.appendChild(newElement)
      
                  
                }
      
      
            }
          }
      
    })



for (var i=0; i<response.nfts.length;i++){

      for(var j=0; j<tokenidjson.Students.length; j++){

        if (response.nfts[i].token_id===tokenidjson.Students[j].tokenid){
            console.log("hola")
            
            const newElement = document.createElement('div')
            newElement.innerHTML = `
              <a href='https://opensea.io/assets/matic/${contract_address}/${token_id}' target="_blank">
                <div class='flex flex-col mx-4'>
                  <img
                    src='${file_url}'
                    class='w-full rounded-lg' />
                  <div class='flex-col w-full space-y-1 '>
                    <p class='text-gray-800 text-lg'>${name}</p>
                  </div>
                </div>
              </a>
            `
            osContainer.appendChild(newElement)

            
          }


      }
    }


   




  });

 



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
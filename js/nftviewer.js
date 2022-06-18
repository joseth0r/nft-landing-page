let accounts;
const TIMEOUT = 1000;
const COLLECTION_NAME = 'CryptoHasbulla';
let editions = [];
let nftname=[];
let nftimage=[];
let dots = 1;

const welcomeP = document.getElementById("welcomeP");
welcomeP.innerHTML = "Connect your wallet to check your discount please";


// METAMASK CONNECTION falla esto:
window.addEventListener("DOMContentLoaded", async () => {
  

    const menuWallet = document.getElementById("menuwallet");
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      checkChain();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
  
    if (window.web3) {
      // Check if User is already connected by retrieving the accounts
      await window.web3.eth.getAccounts().then(async (addr) => {
        accounts = addr;
      });
    }
  
  
    updateConnectStatus();
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum.on("accountsChanged", (newAccounts) => {
        accounts = newAccounts;
        updateConnectStatus();
      });
    }
  });
  




const updateConnectStatus = async () => {
  const onboarding = new MetaMaskOnboarding();

  //const onboardButton = document.querySelector("connectWallet"); //modifying
  const onboardButton = document.getElementById("connectWallet");
  const onboardButtonM = document.getElementById("connectWalletM");


  const onboardButtonConnected = document.getElementById("walletConnected");
  const onboardButtonConnectedM=document.getElementById("walletConnectedM");





  const notConnected = document.querySelector('.not-connected');
  const spinner = document.getElementById("spinner");
  const changenetworkP = document.getElementById("changenetworkP");
  const changenetworkPtext = document.getElementById("changenetworkPtext");

  if (!window.ethereum) {
    console.log("pas de metamask");
          // HIDE SPINNER

    spinner.classList.add('hidden');
    notConnected.classList.remove('hidden');
    notConnected.classList.add('show-not-connected');

    onboardButton.innerText = "Install Metamask 🦊";
    onboardButton.onclick = () => {
    onboardButton.innerText = "Connecting...";
    onboardButton.disabled = true;
    onboarding.startOnboarding();
    };
//works new
    onboardButtonM.innerText = "Install Metamask 🦊";
    onboardButtonM.onclick = () => {
    onboardButtonM.innerText = "Connecting...";
    onboardButtonM.disabled = true;
    onboarding.startOnboarding();
    };

//

  }


   else if (accounts && accounts.length > 0) {
    onboardButtonConnected.classList.remove('hidden');
    onboardButtonConnected.innerText = `🟢 Connected as 0x..${accounts[0].slice(-4)}`;
    onboardButtonConnectedM.classList.remove('hidden');
    onboardButtonConnectedM.innerText = `🟢 Connected as 0x..${accounts[0].slice(-4)}`;
    
    $menu.removeClass('is-active');

    window.address = accounts[0];
    onboardButtonConnected.disabled = true;
    onboardButtonConnectedM.disabled = true;

    onboarding.stopOnboarding();
    notConnected.classList.remove('show-not-connected');
    notConnected.classList.add('hidden');
    // SHOW SPINNER
    //spinner.classList.remove('hidden');



    //window.contract = new web3.eth.Contract(abi, contractAddress);
    console.log("hola1112")
    checkOwner(accounts[0]);




  } else {
    //menuconnetwallet.classList.add('hidden'); //cerramos menu


    onboardButton.innerText = "🦊 Metamask";
    onboardButtonM.innerText = "🦊 Metamask";

    // HIDE SPINNER
    spinner.classList.add('hidden');
    notConnected.classList.remove('hidden');
    notConnected.classList.add('show-not-connected');

    onboardButton.onclick = async () => {
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(function (accts) {
          onboardButtonConnected.classList.remove('hidden');
          onboardButtonConnected.innerText = `🟢 Connected as 0x..${accts[0].slice(-4)}`;
          onboardButtonConnectedM.classList.remove('hidden');
          onboardButtonConnectedM.innerText = `🟢 Connected as 0x..${accts[0].slice(-4)}`;
          $menu.removeClass('is-active');

          notConnected.classList.remove('show-not-connected');
          notConnected.classList.add('hidden');
          // SHOW SPINNER
          spinner.classList.remove('hidden');
          onboardButtonConnected.disabled = true;

          onboardButtonConnectedM.disabled = true;
          window.address = accts[0];
          accounts = accts;
          //window.contract = new web3.eth.Contract(abi, contractAddress);
          console.log("hola100")

        });
    };
    onboardButtonM.onclick = async () => {
      await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then(function (accts) {
          onboardButtonConnected.classList.remove('hidden');
          onboardButtonConnected.innerText = `🟢 Connected as 0x..${accts[0].slice(-4)}`;
          onboardButtonConnectedM.classList.remove('hidden');
          onboardButtonConnectedM.innerText = `🟢 Connected as 0x..${accts[0].slice(-4)}`;
          $menu.removeClass('is-active');

          notConnected.classList.remove('show-not-connected');
          notConnected.classList.add('hidden');
          // SHOW SPINNER
          spinner.classList.remove('hidden');
          onboardButtonConnected.disabled = true;

          onboardButtonConnectedM.disabled = true;
          window.address = accts[0];
          accounts = accts;
          //window.contract = new web3.eth.Contract(abi, contractAddress);
          checkOwner(accounts[0]);
          console.log("hola30")

        });
    };

  }
};

async function checkChain() {
  const changenetworkP = document.getElementById("changenetworkP");
  const changenetworkPtext = document.getElementById("changenetworkPtext");

  let chainId = 0;
  if(chain === 'rinkeby') {
    chainId = 4;
  } else if(chain === 'polygon') {
    chainId = 137;
  }
  if (window.ethereum.networkVersion !== chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: web3.utils.toHex(chainId) }],
      });
      updateConnectStatus();
    } catch (err) {
      //changenetworkP.innerHTML=changenetwork;
      changenetworkP.classList.remove('hidden');
      changenetworkP.innerText = "Change the network to Polygon to mint please";
      changenetworkPtext.classList.remove('hidden');

      changenetworkPtext.innerText="Refresh the page when you change the network.";

      console.log('change network pls');
        // This error code indicates that the chain has not been added to MetaMask.
      if (err.code === 4902) {
        try {
          if(chain === 'rinkeby') {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Rinkeby Test Network',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
                  rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                },
              ],
            });
          } else if(chain === 'polygon') {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainName: 'Polygon Mainnet',
                  chainId: web3.utils.toHex(chainId),
                  nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                  rpcUrls: ['https://polygon-rpc.com/'],
                },
              ],
            });
          }
          updateConnectStatus();
        } catch (err) {
          console.log(err);

        }
      }
    }
  }
}






const checkOwner = async (account) => {
    
    if(account) {
      let isOwner = false;
      let page = 1
      
      const data = await fetchWithRetry(`/.netlify/functions/isowner/?wallet=${account}&page=${page}`);
      console.log(data)
      isOwner = !isOwner ? data.isOwner : isOwner;
      updateStatusText(isOwner, true)
      



      editions = [...data.editions]
      nftname = [...data.nftname]

      nftimage = [...data.nftimage]

     console.log(nftname)
//
const osContainer = document.getElementById('openseaItems')
data.forEach((nft) => {
    const {editions,nftname, nftimage} = nft;
    const newElement = document.createElement('div')
        
            console.log("hpppppppppppp")
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

          


})
//

      let nextPage = data.next_page
  
      while(nextPage) {
        page = nextPage
        const data = await fetchWithRetry(`/.netlify/functions/isowner/?wallet=${account}&page=${page}`);
  
        isOwner = !isOwner ? data.isOwner : isOwner;
        updateStatusText(isOwner, true)
        
        editions = [...editions, ...data.editions]

        nftname = [...nftname,...data.nftname]
        nftimage = [...nftimage,...data.nftimage]

        nextPage = data.next_page
      }
      
      updateStatusText(isOwner, false)


      
    }
  }






function getOpenseaItems(isOwner) {


    const osContainer = document.getElementById('openseaItems')
    response.nfts.forEach((nft) => {
        const {contract_address,token_id, name, file_url,description} = nft;
        const newElement = document.createElement('div')
            if (nft.description=="Crypto Hasbulla is a collection of 10,000 unique hand-drawn NFTs available on the Ethereum blockchain. One Crypto Hasbulla token is your ticket to future drops, events, and much much more. Join the community today at www.Cryptohasbullanft.com"){
                console.log("hpppppppppppp")
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
    
  

    })



  }








  function updateStatusText(isOwner, checking) {
    const spinner = document.getElementById("spinner");

    const statusText = document.querySelector('.owner-status');
    const welcomeConnectedText= document.getElementById("welcomeTextConnected");
    spinner.classList.add('hidden');

    if(checking) {
        
        //welcomeTextConnected.innerText=`Hello ${accounts[0]}`;
      if(isOwner) {
        statusText.innerText = `You do own ${COLLECTION_NAME}!! 😻 Let's see how many${renderDots(dots)}`;
      } else {
        statusText.innerText = `Checking to see if you own any ${COLLECTION_NAME} 😻${renderDots(dots)}`;
      }
    } else {
      if(isOwner) {
        statusText.innerText = `You own ${editions.length} ${COLLECTION_NAME}!! 😻`;
        
      } else {
        statusText.innerText = `You don't own any ${COLLECTION_NAME} 😿`;
      }
    }
    dots = dots === 3 ? 1 : dots + 1;
  }
  
  

function renderDots(dots) {
  let dotsString = '';
  for (let i = 0; i < dots; i++) {
    dotsString += '.';
  }
  return dotsString;
}

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function fetchWithRetry(url)  {
  await timer(TIMEOUT);
  return new Promise((resolve, reject) => {
    const fetch_retry = (_url) => {
      return fetch(_url).then(async (res) => {
        const status = res.status;

        if(status === 200) {
          return resolve(res.json());
        }            
        else {
          console.error(`ERROR STATUS: ${status}`)
          console.log('Retrying')
          await timer(TIMEOUT)
          fetch_retry(_url)
        }            
      })
      .catch(async (error) => {  
        console.error(`CATCH ERROR: ${error}`)  
        console.log('Retrying')    
        await timer(TIMEOUT)    
        fetch_retry(_url)
      }); 
    }
    return fetch_retry(url);
  });
}


let accounts;
const TIMEOUT = 1000;
const COLLECTION_NAME = 'CryptoHasbulla';
let editions = [];
let nftname=[];
let nftimage=[];
let dots = 1;
const CONTRACT = "0x2953399124f0cbb46d2cbacd8a89cf0599974963";

const welcomeP = document.getElementById("welcomeP");
welcomeP.innerHTML = "Connect your wallet to contact us. It doesnt matter if you dont hold any Cryptohasbulla NFT. ";





// METAMASK CONNECTION falla esto:
window.addEventListener("DOMContentLoaded", async () => {
  

    const menuWallet = document.getElementById("menuwallet");
    
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
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
 // const spinner = document.getElementById("spinner");
  const changenetworkP = document.getElementById("changenetworkP");
  const changenetworkPtext = document.getElementById("changenetworkPtext");

  if (!window.ethereum) {
    console.log("pas de metamask");
          // HIDE SPINNER

  //  spinner.classList.add('hidden');
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
    //checkOwner(accounts[0]); //
    updateStatusText();



  } else {
    //menuconnetwallet.classList.add('hidden'); //cerramos menu


    onboardButton.innerText = "🦊 Metamask";
    onboardButtonM.innerText = "🦊 Metamask";

    // HIDE SPINNER
   // spinner.classList.add('hidden');
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
         // spinner.classList.remove('hidden');
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
        //  spinner.classList.remove('hidden');
          onboardButtonConnected.disabled = true;

          onboardButtonConnectedM.disabled = true;
          window.address = accts[0];
          accounts = accts;
          //window.contract = new web3.eth.Contract(abi, contractAddress);
         // checkOwner(accounts[0]);
          updateStatusText();
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












  function updateStatusText() {
    //const spinner = document.getElementById("spinner");

    const statusText = document.querySelector('.owner-status');
    const welcomeConnectedText= document.getElementById("welcomeTextConnected");
    //spinner.classList.add('hidden');
    const contactform = document.getElementById("contactform");

   
     

        statusText.innerText = `Hey ${accounts[0]}!`;


        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

    document.getElementById("ethaddressform").value = accounts[0];

    document.getElementById("timedateform").value = dateTime;
        contactform.classList.remove('hidden');




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


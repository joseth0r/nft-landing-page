let accounts;
const TIMEOUT = 1000;
const COLLECTION_NAME = 'Cryptohasbulla';
let editions = [];
let dots = 1;



// METAMASK CONNECTION falla esto:
window.addEventListener("DOMContentLoaded", async () => {
  

  const menuWallet = document.getElementById("menuwallet");


 



  
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    //checkChain();
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



  const menuWallet = document.getElementById("menuwallet");


  const notConnected = document.querySelector('.not-connected');

  if (!window.ethereum) {
    console.log("pas de metamask");
          // HIDE SPINNER

   // spinner.classList.add('hidden');
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
    
    menuWallet.classList.remove('is-active');
    menuWallet.classList.remove('togglemenu');

    
    window.address = accounts[0];
    onboardButtonConnected.disabled = true;
    onboardButtonConnectedM.disabled = true;

    onboarding.stopOnboarding();
    notConnected.classList.remove('show-not-connected');
    notConnected.classList.add('hidden');
    // SHOW SPINNER
   // spinner.classList.remove('hidden');
    //window.contract = new web3.eth.Contract(abi, contractAddress);

    //checkOwner(accounts[0]);
  } else {
    //menuconnetwallet.classList.add('hidden'); //cerramos menu


    onboardButton.innerText = "🦊 Metamask";
    onboardButtonM.innerText = "🦊 Metamask";

    // HIDE SPINNER
    //spinner.classList.add('hidden');
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
          menuWallet.classList.remove('is-active');
          menuWallet.classList.remove('togglemenu');
          notConnected.classList.remove('show-not-connected');
          notConnected.classList.add('hidden');
          // SHOW SPINNER
        //  spinner.classList.remove('hidden');
          onboardButtonConnected.disabled = true;

          onboardButtonConnectedM.disabled = true;
          window.address = accts[0];
          accounts = accts;
          //window.contract = new web3.eth.Contract(abi, contractAddress);
          //checkOwner(accounts[0]);
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
          menuWallet.classList.remove('is-active');
          menuWallet.classList.remove('togglemenu');

          notConnected.classList.remove('show-not-connected');
          notConnected.classList.add('hidden');
          // SHOW SPINNER
          //spinner.classList.remove('hidden');
          onboardButtonConnected.disabled = true;

          onboardButtonConnectedM.disabled = true;
          window.address = accts[0];
          accounts = accts;
          //window.contract = new web3.eth.Contract(abi, contractAddress);
          //checkOwner(accounts[0]);
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
};















//


//card:
/*
async function cardview(data) {
const cardContainer = document.getElementById('cardContainer')

data.forEach((nft) => {
  const { nftname } = nft

  const newElement = document.createElement('div')
  newElement.innerHTML = `
      <div class='flex flex-col'>
       
        <div class='flex-col w-full space-y-1'>
          <p class='text-gray-800 text-lg'>${nftname}</p>
        </div>
      </div>
    </a>
  `

  cardContainer.appendChild(newElement)
})

};*/
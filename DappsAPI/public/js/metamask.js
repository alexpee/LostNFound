
var ERC20Address = '0x7608cd54178b8e8a865c09b9001f47210bd7d71e'// '0x59ef2c684e17aa228cad459f2a0af3ab3233b349';
var LNFAddress = '0x241dd0f41ffbda0cf9da6b9e6e18e310ea323c27'//'0x7890dd303277521be5d521b2491c85b0bdea4d35';
var abiERC20= {};
var ERC20Contract ={};
var ERC20Instance = {};


var abiLNF= {};
var LNFContract ={};
var LNFInstance = {}


var Account ='';


function iniMetamask()
{
	
$.getJSON("js/contracts/LNFMatch.json", function (data) {
    $.each(data, function (index, value) {
		if(index =='abi')
		{
		  abiLNF = (value);
		  LNFContract = web3.eth.contract(abiLNF);
	      LNFInstance = LNFContract.at(LNFAddress);
		}
    });
});

	
$.getJSON("js/contracts/ERC20Token.json", function (data) {
    $.each(data, function (index, value) {
		if(index =='abi')
		{
		 abiERC20 = (value);
		 ERC20Contract = web3.eth.contract(abiERC20);
	     ERC20Instance = ERC20Contract.at(ERC20Address);
    
		}
    });
});


window.addEventListener("load", function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log("No web3? You should consider trying MetaMask!");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      window.web3 = new Web3(
        new Web3.providers.HttpProvider("https://localhost:7545")
      );
    }

    // APP >
    web3.eth.getAccounts(function(error, accounts) {
      if (!error) {
        web3.eth.getBalance(accounts[0], function(error, balance) {
          if (!error) {
			  Account= accounts[0];
			   $('#lblAcct').html(Account);

            console.log(
              "Your account: " +
                accounts[0] +
                " has a balance of: " +
                balance.toNumber() / 1000000000000000000 +
                "Ether"
            );
          } else {
            console.error(error);
          }
        });
      } else {
        console.error(error);
      }
    });
  });

const isMainNetwork = () => {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
        return;
      }
	    console.log('netId',netId);
      netId === '1' ? resolve() : reject('not main network');
    });
  });
}

const isTestNetwork = () => {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
        return;
      }
	  console.log('netId',netId);
      netId === '3' ? resolve() : reject('not main network');
    });
  });
}

const isLocalNetwork = () => {
  return new Promise((resolve, reject) => {
    window.web3.version.getNetwork((err, netId) => {
      if (err) {
        reject(err);
        return;
      }
	  console.log('netId',netId);
      netId === '5777' ? resolve() : reject('not local network');
    });
  });
}



}

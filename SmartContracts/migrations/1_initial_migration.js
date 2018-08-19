var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {

  // var acct1 = '0x74577a52db8659017eaa18c454255c13ebeca5d4';
  // web3.personal.unlockAccount(acct1,"kanasai",15000); 
  // deployer.deploy(Migrations);

 
  var acct1 = '0x7b9cF62E8066E8C8014f142c8625924433F574c3';
  web3.personal.unlockAccount(acct1,"",15000); 
  deployer.deploy(Migrations);



};




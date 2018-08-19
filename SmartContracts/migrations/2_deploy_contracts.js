
var LNFToken = artifacts.require("./LNFToken.sol");
var LNFMatch = artifacts.require("./LNFMatch.sol");

module.exports = function(deployer) {

  var supply = 100000000000;

  deployer.deploy(LNFToken, supply);
  deployer.deploy(LNFMatch);
};

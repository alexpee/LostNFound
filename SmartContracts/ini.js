var eMYR = artifacts.require("eMYR");
var eSGD = artifacts.require("eSGD");
var TikMatchTrade = artifacts.require("TikMatch");


var acct1 = '0x7b9cF62E8066E8C8014f142c8625924433F574c3';
var acct2 = '0x41914A2D91f0333a24FdC03B192Da1daC1386347';
var acct3 ='0x1eaB0C81BFadf1a7139E464CEEBAB07234ea56FF';
var acct4='0xeF2EB8104f3540066a7E33116e9Cd57DC514c0A4';
var acct5 ='0x393CDeAd8F28a2Df4cc838AFEd9De52C375B97aF';
var acct6='0xB95f35597761B55Db20479C18f31fc977803B1Dd';
var acct7 ='0x42b5DCe7793f12476681C1182ae2801f8C815114';


var acctTM = '0x44dce8b40418c77d1f47efbfb8b448865b2f5673';
var eMYRadd = '0x59ef2c684e17aa228cad459f2a0af3ab3233b349';
var eSGDadd = '0x7890dd303277521be5d521b2491c85b0bdea4d35';
var eUSDadd = '0xaa09226e8d8bfb7072c18bbc03d546a8f0fad96e';
var eIDRadd = '0xa7697a38205db14b27e2e9f80ee56f858b72cdcb';


module.exports = function(done) {

  web3.personal.unlockAccount(acct1,"",15000); 

  TikMatchTrade.deployed().then(function(instance) {
    return instance.addEditwalletContractAddress('eMYR', eMYRadd, {from: acct1});  
  }).then(function(result) {
    console.log(result);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });

  TikMatchTrade.deployed().then(function(instance) {
    return instance.addEditwalletContractAddress('eSGD', eSGDadd, {from: acct1});  
  }).then(function(result) {
    console.log(result);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });

  TikMatchTrade.deployed().then(function(instance) {
    return instance.addEditwalletContractAddress('eUSD', eUSDadd, {from: acct1});  
  }).then(function(result) {
    console.log(result);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });

  TikMatchTrade.deployed().then(function(instance) {
    return instance.addEditwalletContractAddress('eIDR', eIDRadd, {from: acct1});  
  }).then(function(result) {
    console.log(result);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });



};
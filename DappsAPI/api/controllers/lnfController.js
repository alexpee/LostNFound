'use strict';

var mongoose = require('mongoose'),
Asset = mongoose.model('Asset');
var mongoose2 = require('mongoose'),
Challenges = mongoose2.model('Challenges');
var mongoose3 = require('mongoose'),
ClaimerAnswer = mongoose3.model('ClaimerAnswer');
var mongoose3 = require('mongoose'),
ChallengeQ = mongoose3.model('Challenge');
const ipfs = require("nano-ipfs-store").at("https://ipfs.infura.io:5001");

exports.get_asset = function(req, res) {
 
   // Website you wish to allow to connect
 //  res.setHeader('Access-Control-Allow-Origin', 'http://13.229.232.11');

   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   // Request headers you wish to allow
 /// res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  Asset.find({}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });

};

exports.add_found = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  req.body.transType ="Found";
   var new_asset = new Asset(req.body);
   console.log('ipfs',ipfs);
   
    const data = JSON.stringify(new_asset);
   
   
    ipfs.add(data).then(
  ipfsHash=>
  {
  
  console.log('ipfsHash',ipfsHash);
  });
 
    new_asset.save(function(err, asset) {
    if (err)
      res.send(err);
    res.json(asset);
  });
};

exports.add_lost = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  req.body.transType ="Lost";
  var new_asset = new Asset(req.body);
   const data = JSON.stringify(new_asset);
  ipfs.add(data).then(
  ipfsHash=>
  {
  
  console.log('ipfsHash',ipfsHash);
  });
 
  new_asset.save(function(err, asset) {
    if (err)
      res.send(err);
    res.json(asset);
  });
};

exports.get_question = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  Challenges.find({'assetID': req.params.assetID}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
}


exports.add_question = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  var new_asset = new Challenges(req.body);

   new_asset.save(function(err, asset) {
   if (err)
     res.send(err);
   res.json(asset);
 });

};

exports.add_challenge_question = function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  var new_asset = new ClaimerAnswer(req.body);

    new_asset.save(function(err, asset) {
    if (err)
      res.send(err);
    res.json(asset);
  });
};
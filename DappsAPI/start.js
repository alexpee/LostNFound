
//var cors = require('cors');
var express = require('express');
var app = express();
const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

  port = process.env.PORT || 3001,
  mongoose = require('mongoose'),
  Task = require('./api/models/lnfModel'), //created model loading here
  bodyParser = require('body-parser');


var path = require('path');
var public = path.join(__dirname, 'public');

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'index.html'));
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());






app.use(fileUpload());
 
app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  let FileToUpload = req.files.File;
  let TempPath ='./temp/' + FileToUpload.name;
  
  console.log(FileToUpload);
 
  // Use the mv() method to place the file somewhere on your server
  FileToUpload.mv(TempPath, function(err) {
    if (err)
      return res.status(500).send(err);
 
		let testFile = fs.readFileSync(TempPath);
		let testBuffer = new Buffer(testFile);
		ipfs.files.add(testBuffer, function (err, responseIPFS) {
        if (err) {
          console.log(err);
		    return res.status(500).send(err);
        }
        console.log(responseIPFS)
		res.send(responseIPFS);
      })
 
    
  });
});

app.get('/display/:cid', function(req, res) {
	params = req.params;
    var cid = params.cid; 
	res.send('https://gateway.ipfs.io/ipfs/'+cid);

})



app.use('/', express.static(public));

app.listen(port);
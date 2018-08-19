'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var AssetSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  itemName: {
    type: String,
  },
  color: {
    type: String,
  },
  serialNo: {
    type: String,
  },
  reward: {
    type: String,
  },
  picture: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  description: {
    type: String,
    required: 'Kindly explain your listing.'
  },
  location: {
    type: String,
    required: 'Kindly explain your location.'
  },
  category: {
    type: [{
      type: String,
      enum: ['Wallet', 'Phone', 'Key','Passport','Other']
    }],
    default: ['Wallet']
  },
  transType: {
    type: [{
      type: String,
      enum: ['Lost', 'Found']
    }],
    default: ['Lost']
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'matched', 'completed']
    }],
    default: ['pending']
  }
  
});
module.exports = mongoose.model('Asset', AssetSchema);


var ChallengeSchema = new Schema({
  question: String,
  answer: String // Room type id    
});
module.exports = mongoose.model('Challenge', ChallengeSchema);

var ClaimerAnswerSchema = new Schema({
  assetID: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  claimer: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  question: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  answer: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  question2: {
    type: String,
    required: 'Kindly enter the name of the question'
  },
  answer2: {
    type: String,
    required: 'Kindly enter the name of the answer'
  } 
  
});
module.exports = mongoose.model('ClaimerAnswer', ClaimerAnswerSchema);

var ChallengesSchema = new Schema({

  assetID: {
    type: String,
    required: 'Kindly enter the name of the assetID'
  },
  claimer: {
    type: String,
    required: 'Kindly enter the name of the claimer'
  },
  question: {
    type: String,
    required: 'Kindly enter the name of the question'
  },
  answer: {
    type: String,
    required: 'Kindly enter the name of the answer'
  },
  question2: {
    type: String,
    required: 'Kindly enter the name of the question'
  },
  answer2: {
    type: String,
    required: 'Kindly enter the name of the answer'
  }
});

module.exports = mongoose.model('Challenges', ChallengesSchema);


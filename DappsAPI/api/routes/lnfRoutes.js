'use strict';
module.exports = function(app) {
  var lnf = require('../controllers/lnfController');

  // todoList Routes
  app.route('/asset')
    .get(lnf.get_asset);

  app.route('/found')
    .post(lnf.add_found);

  app.route('/Lost')
    .post(lnf.add_lost);
  
  app.route('/question/:assetID')
    .post(lnf.add_question)
    .get(lnf.get_question);

  app.route('/challenge/:assetID')
    .post(lnf.add_challenge_question);

};

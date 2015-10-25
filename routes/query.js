var express = require('express');
var router = express.Router();
var merchains = require('../modules/merchains');
var path = require('path');

/* GET home page. */
// index routing
router.get('/', function(req,res) {
  var send_curr = req.query.inputCurrency || "";
  var send_amt = req.query.amount || "";
  var receive_curr = req.query.outputCurrency || "";
  // not implemented yet: search by specifying receive amt
  var receive_amt = req.query.ra || "";
  send_amt = parseFloat(send_amt);
  var data = merchains.searchE2E(send_curr, send_amt, receive_curr, receive_amt);
  res.writeHead(200, {"Content-Type": "application/json"});

  data = JSON.stringify(data);
  console.log("Data: " +data);
  res.end(data);
});

module.exports = router;

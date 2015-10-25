var express = require('express');
var router = express.Router();
var merchains = require('../modules/merchains');
var path = require('path');

/* GET home page. */
// index routing
router.get('/', function(req,res) {
  var send_curr = req.query.selectedCurrency || "";
  var send_amt = req.query.amount || "";
  var receive_curr = req.query.selectedOutputCurrency || "";
  // not implemented yet: search by specifying receive amt
  var receive_amt = req.query.ra || "";
  console.log("test");
  var data = merchains.searchE2E(send_curr, send_amt, receive_curr, receive_amt);
  res.writeHead(200, {"Content-Type": "application/json"});
  data = JSON.stringify({
    send_currency: send_curr,
    amount: send_amt,
    receive_curreny: receive_curr
  });
  res.end(data);
});

module.exports = router;

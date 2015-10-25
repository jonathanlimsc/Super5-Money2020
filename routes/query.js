var express = require('express');
var router = express.Router();
var merchains = require('../modules/merchains');
var path = require('path');

/* GET home page. */
// index routing
router.get('/', function(req,res) {
  var send_curr = req.query.sc || "";
  var send_amt = req.query.sa || "";
  var receive_curr = req.query.rc || "";
  var receive_amt = req.query.ra || "";
  console.log("test");
  merchains.searchE2E(send_curr, send_amt, receive_curr, receive_amt);
  res.sendFile(path.join(__dirname, '../public/', 'index.html'));
});

module.exports = router;

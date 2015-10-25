
var json = require("../data/merchants.json");
// handle bad inputs
var validateSearch = function (send_curr, send_amt, receive_curr, receive_amt) {
  //TODO: implement receive amt
  console.log(send_curr, send_amt, receive_curr, receive_amt);
  console.log("test validateSearch");
  if(typeof send_curr === "string" && typeof send_amt === "number" && typeof receive_curr === "string"){
    if(send_amt>0) {
      console.log("search clean")
      return true;
    } else{
      return false;
    }
  }
  return false;
};

var createMerchains = function(send_curr, send_amt, receive_curr){
  console.log('Trying to parse json');
  console.log(json);
  var merchains = [];
  // Generate merchain obj
  for(var i=0; i<json.length; i++){
    var addedMerchant = false;
    var merchain = {
          startMerchant: {name: '', rate: '', fee: ''},
          endMerchant: {name: '', rate: '', 'fee': ''},
          convertedAmt: ''
    };
    //Start merchant
    for (var key in json[i]) {
      if (json[i].hasOwnProperty(key)) {
        if (Object.keys(json[i]['buy']).length > 0) { //buy object is not empty
          if (json[i]['buy'].hasOwnProperty(send_curr)) { //has send_currency
            merchain['startMerchant']['name'] = json[i]['name'];
            merchain['startMerchant']['rate'] = json[i]['buy'][send_curr]['current_rate'];
            merchain['startMerchant']['fee'] = json[i]['fee'];
            addedMerchant = true;
          }
        }
      }
    }
    //End merchant
    for(var j=i; j<json.length; j++) {
      for (var key in json[j]) {
        console.log('key2: ' + key);
        if (json[j].hasOwnProperty(key)) {
          if (Object.keys(json[j]['sell']).length > 0) { //sell object is not empty
            console.log(receive_curr);
            if (json[j]['sell'].hasOwnProperty(receive_curr)) {
              merchain['endMerchant']['name'] = json[j]['name'];
              merchain['endMerchant']['rate'] = json[j]['sell'][receive_curr]['current_rate'];
              merchain['endMerchant']['fee'] = json[j]['fee'];
            }
          }
        }
      }
    }
    var startrate = parseFloat(merchain['startMerchant']['rate']);
    var endrate = parseFloat(merchain['endMerchant']['rate']);
    var startfee = parseFloat(merchain['startMerchant']['fee']);
    var endfee = parseFloat(merchain['endMerchant']['fee']);
    console.log(send_amt, startrate, endrate, startfee, endfee);

    merchain.convertedAmt = send_amt / startrate * (1-startfee) * endrate * (1-endfee);
    console.log(merchain.convertedAmt);
    if(addedMerchant === true) {
      merchains.push(merchain);
    }
  }
  console.log(merchains);
  return merchains;

};

module.exports = {

  // receieve query parameters from user and returns queried data
  searchE2E : function (send_curr, send_amt, receive_curr, receive_amt) {
    console.log("begin processing search request");
    var obj = [];
    var result;
    if (validateSearch(send_curr, send_amt, receive_curr, receive_amt) === true) {
      send_curr = send_curr.toLowerCase();
      receive_curr = receive_curr.toLowerCase();
      // proceed with searching all possible website merchants
      // return json data
      result = createMerchains(send_curr, send_amt, receive_curr);
      console.log("Merchains created!");
    }
      return result;
  }
}

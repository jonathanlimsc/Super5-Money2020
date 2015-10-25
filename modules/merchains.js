
// handle bad inputs
var validateSearch = function (send_curr, send_amt, receive_curr, receive_amt) {
  //TODO: implement receive amt
  console.log(send_curr, send_amt, receive_curr, receive_amt);
  if(typeof send_curr === "string" && typeof send_amt === "number" && typeof receive_curr === "string"){
    if(send_amt>0) {
      console.log("search clean")
      return true;
    } else{
      return false;
    }
  }
  return false;
}

var createMerchains = function(send_curr, send_amt, receive_curr){
  var jsonData = JSON.parse('/modules/merchains.js');
  var result = [];
  console.log('Pulled jsonData : ' + jsonData);
  // Generate merchain array
  for(var i=0; i<json.length; i++){
    var merchain = {};
    //Start merchant
    for (var key in json[i]) {
      if (json[i].hasOwnProperty(key)) {
        if (Object.keys(json[i]['buy']).length > 0) { //buy object is not empty
          if (json[i]['buy'].hasOwnProperty(send_curr)) { //has send_currency
            merchain.startMerchant.name = json[i]['name'];
            merchain.startMerchant.rate = json[i]['buy'][send_curr]['current_rate'];
            merchain.startMerchant.fee = json[i]['fee'];
          }
        }
      }
    }
    //End merchant
    for(var j=i; j<json.length; j++) {
      for (var key in json[j]) {
        if (json[i].hasOwnProperty(key)) {
          if (Object.keys(json[j]['sell']).length > 0) { //sell object is not empty
            if (json[j]['sell'].hasOwnProperty(receive_curr)) {
              merchain.endMerchant.name = json[j]['name'];
              merchain.endMerchant.rate = json[j]['sell'][receive_curr]['current_rate'];
              merchain.endMerchant.fee = json[j]['fee'];
            }
          }
        }
      }
    }
    merchain.convertedAmt = send_curr/parseFloat(merchain.startMerchant.rate)*(100-parseFloat(merchain.startMerchant.fee));
    result.push(merchain);
  }
  console.log(result);
  return result;

};

module.exports = {

  // receieve query parameters from user and returns queried data
  searchE2E : function (send_curr, send_amt, receive_curr, receive_amt) {
    console.log("begin processing search request");
    if (validateSearch(send_curr, send_amt, receive_curr, receive_amt) === true) {
      send_curr = send_curr.toLowerCase();
      receive_curr = receive_curr.toLowerCase();
      // proceed with searching all possible website merchants
      // return json data
      var result = createMerchains(send_curr, send_amt, receive_curr);
      console.log("Merchains created!");
      return result;
    };
  }
}

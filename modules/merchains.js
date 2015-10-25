
// handle bad inputs
var validateSearch = function (send_curr, send_amt, receive_curr, receive_amt) {
  console.log(send_curr, send_amt, receive_curr, receive_amt);
  console.log("search cleaned")
}

module.exports = {

  // receieve query parameters from user and returns queried data
  searchE2E : function (send_curr, send_amt, receive_curr, receive_amt) {
    console.log("begin processing search request");
    validateSearch (send_curr, send_amt, receive_curr, receive_amt);
    // proceed with searching all possible website merchants
      // return json data
  }



  // do an all path search from start node to end node
}

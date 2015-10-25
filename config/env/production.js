var port = process.env.PORT || 3000;;

module.exports = {
    port: port,
    db: 'mongodb://admin:admin@ds045454.mongolab.com:45454/heroku_dm9g606d',
    facebook: {
      app_id: "466921426844612",
      app_secret: "d596fc9b80a60b26d7b4182f41503cd0",
      callback_url: "http://merchain.herokuapp.com/user/auth/facebook/callback/"
    }
};

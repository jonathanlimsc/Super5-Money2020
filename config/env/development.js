var port = 3000;

module.exports = {
    port: port,
    db: 'mongodb://localhost/merchain_local',
    facebook: {
      app_id: "466921566844598",
      app_secret: "a9c4c80d5614d53282b8c28eb274225f",
      callback_url: "http://localhost:"+ port +"/user/auth/facebook/callback/"
    }
};

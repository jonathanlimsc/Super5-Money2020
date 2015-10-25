var FacebookStrategy   = require('passport-facebook').Strategy
var User = require('../../models/user');
var config = require('../../config/config');

module.exports = function(passport){

	// Use the FacebookStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Facebook
//   profile), and invoke a callback with a user object.
	passport.use(new FacebookStrategy({
	    clientID: config.facebook.app_id,
	    clientSecret: config.facebook.app_secret,
	    callbackURL: config.facebook.callback_url
	  },
	  function(accessToken, refreshToken, profile, done) {
	    // asynchronous verification, for effect...
	    process.nextTick(function () {
				// User.findOrCreate({ facebookId: profile.id }, function (err, user) {
		    //   return done(err, user);
		    // });
				return done(err, profile);
	    });
	  }
	));
}

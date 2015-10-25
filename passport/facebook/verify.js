var FacebookStrategy   = require('passport-facebook').Strategy
var request = require('superagent-bluebird-promise');
var User = require('../../models/user');
var config = require('../../config/config');
var blockchain = require('../../config/blockchain');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport) {

	// Use the FacebookStrategy within Passport.
	//   Strategies in Passport require a `verify` function, which accept
	//   credentials (in this case, an accessToken, refreshToken, and Facebook
	//   profile), and invoke a callback with a user object.
	passport.use(new FacebookStrategy({
		clientID: config.facebook.app_id,
		clientSecret: config.facebook.app_secret,
		callbackURL: config.facebook.callback_url,
		profileFields: ['id', 'displayName', 'photos']
	},
	function(accessToken, refreshToken, profile, done) {
		// asynchronous verification, for effect...
		//check user table for anyone with a facebook ID of profile.id
		findOrCreateUser = function(){
				User.findOne({'id': profile.id}, function(err, user) {
					if (err) {
						return done(err);
					}
					//No user was found... so create a new user with values from Facebook (all the profile. stuff)
					if (!user) {
						user = new User();
						user.id = createHash(profile.id);
						user.portrait = profile.photos[0].value;
						user.displayName = profile.displayName;
						request
							.get('https://blockchain.info/api/v2/create_wallet?api_code=' + blockchain.api_code + "&password=" + profile.id)
							.then(function(res) {
								user.wallet = [JSON.parse(res.text)];
								console.log(user.wallet);
								user.save(function(err) {
									if (err) {
										console.log(err);
									} else {
										return done(err, user);
									}
								})
						}, function(err) {
								console.log(err);
						});
					} else {
						//found user
						isValidId(user, profile.id)
						return done(err, user);
					}
				});
			}
			// Delay the execution of findOrCreateUser and execute the method
			// in the next tick of the event loop
			process.nextTick(findOrCreateUser);
		})
	);
	// Generates hash using bCrypt
	var createHash = function(id){
			return bCrypt.hashSync(id, bCrypt.genSaltSync(10), null);
	}

	var isValidId = function(user, id){
			return bCrypt.compareSync(id, user.id);
	}
}

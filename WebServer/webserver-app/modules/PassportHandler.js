const passport 				= require('passport');
const passportJWT 			= require("passport-jwt");
const JwtStrategy 			= require('passport-jwt').Strategy;
const ExtractJwt			= require('passport-jwt').ExtractJwt; 


class PassportHandler{
constructor(dbUserHandler){
	this.dbUserHandler = dbUserHandler;
	console.log("creating the JWT Strategy");
	var opts = {};
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
	opts.secretOrKey = process.env.JWTSECRET;

	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		
		var userPromise = dbUserHandler.findUserByName(jwt_payload.id);
		

		userPromise.then(function(foundUser,err){

			if (err) {
				console.log("err -> "+err);
				return done(err, false);
			}
			if (foundUser) {
				console.log("user ok");
				return done(null, foundUser);
			} else {
				console.log("user not ok");
				return done(null, false);
				// or you could create a new account
			}
		
	})
	}));


	/*
//passport strategy
			passport.use(new passportLocal( function(username, password, done) {
			
			var userPromise = dbUserHandler.findUserByName(username);
			userPromise.catch(function(err){return done(err)}).then(function(userPromise) {
			if(userPromise.length == 0){
				return done(null,false,{message: 'User not found'});
			}
			if(!userPromise[0].userName === username && userPromise[0].validPassword(password)) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (userPromise[0].userName === username && !(userPromise[0].validPassword(password))) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, userPromise);

			});
			
		}));

        this.setSerialization();
*/
        this.passport = passport;

}

setSerialization(){
        passport.serializeUser(function(user, done) {
			console.log("User Serializzato "+user[0].id)
        done(null, user[0].id);
        });

        passport.deserializeUser(function(user, done) {
        done(null, user);
        });
    }   
}

module.exports = PassportHandler;
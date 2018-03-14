/*jshint esversion: 6 */
const  mongoose 		= require('mongoose');
const  bcrypt			= require('bcrypt-nodejs');
const ConfigurationHolder       = require('dotenv').config();

function main(){
				
	var uri		= 'mongodb://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@'+ process.env.DB_HOST +':'+ process.env.DB_PORT +'/'+  process.env.DB_USER_DATABASE;
	var options = {promiseLibrary : global.Promise };

	console.log("URI "+ uri);

	var connection = mongoose.createConnection(uri,options)

	connection.on('error', function(err){
		if(err) throw err;
	  });
	  
	  connection.once('open', function callback () {
		console.info('Mongo db connected successfully');
		var userSchema = new mongoose.Schema({
			userName 		         : String,
			userEmail		         : String,
			userPassword	         : String,
		 
		});
		console.info('Schema Created successfully');
		var UserModel = connection.model('users',userSchema);

		var testUser=new UserModel();
		testUser.userName="testName";
		testUser.userEmail="ciccio@gmail.com";
		testUser.userPassword="bleep";
				testUser.save().then(function(product) {
			console.log("USER SAVED "+ product);
			process.exit(0);
		});
		
	  });
				
}

main();	
				
	
				
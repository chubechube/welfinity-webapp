
const  mongoose 		= require('mongoose');
const  bcrypt			= require('bcrypt-nodejs');





class UserHandler  {
	constructor(spider){


		
		this.mongoose		   	= mongoose;
		this.spider 			= spider;
		this.self				= this;
        this.Schema 			= mongoose.Schema;
        this.connected 			= false;
		this.connection         = null;

	
	
		
		this.initializeUser();
	}

	
    connectDB(){
        var self 	= this;
        var uri		= 'mongodb://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@'+ process.env.DB_HOST +':'+ process.env.DB_PORT +'/'+  process.env.DB_USER_DATABASE;
        var options = {promiseLibrary : global.Promise };
		
	
    
        this.connection = this.mongoose.createConnection(uri,options)

        this.connection.on('error', function(err){
			console.log(uri);
            if(err) throw err;
          });
          
          this.connection.once('open', function callback () {
            console.info('User Handler : Mongo db connected successfully');
            self.connected = true;
                self.spider.emit(self.spider.availableMessages.DBHANDLER_USER_CONNECTION_OK);
          });
                
            
    
    
        
       
            }    
	
	//User utilities

	initializeUser(){


       
		this.userSchema = new this.Schema({
			userName 		         : String,
			userEmail		         : String,
			userPassword	         : String,
         
		});


        

		// methods ======================
			// generating a hash
			this.userSchema.methods.generateHash = function(password) {
				return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
			};

			

	}

	
	validPassword(userPassword,receivedPassword) {
		return bcrypt.compareSync(receivedPassword,userPassword);
	}

	createUser(userName,userEmail,userPassword,success,err){
		console.log("CREATION USER"+userName+ "_"+userEmail+" "+userPassword);
		var UserModel = this.connection.model('User',this.userSchema);

		var newUser=new UserModel();
		newUser.userName=userName;
		newUser.userEmail=userEmail;
		newUser.userPassword=newUser.generateHash(userPassword);
		return newUser.save();
		}
	
	findUserByName(userName){
		var UserModel = this.connection.model('User',this.userSchema);
		return UserModel.find({userName : userName}).exec();
	}
	
	findUserById(userID,success,err){
		var UserModel = this.connection.model('User',this.userSchema);
		return UserModel.find({_id : userID}).exec();
		}
	
	findUserByEmail(userEmail,success,err){
		var UserModel = this.connection.model('User',this.userSchema);
		return UserModel.find({userEmail : userEmail}).exec();
	}

	removeuserEmail(userEmail,success,err){
		var UserModel = this.connection.model('User',this.userSchema);
		return UserModel.findOneAndRemove({userEmail : userEmail}).exec();
	}

	getAllUser(success,err){
		var UserModel = this.connection.model('User',this.userSchema);
		return UserModel.find(function(err,users){
			if(err) {console.log(err); return null;}
			return users;
		}).exec();
	}

	
	
}

module.exports = UserHandler;
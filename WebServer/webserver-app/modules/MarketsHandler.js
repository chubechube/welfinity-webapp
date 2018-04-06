var  mongoose 		= require('mongoose');
const  bcrypt			= require('bcrypt-nodejs');


mongoose.Promise = global.Promise;

class MarketsHandler  {
	constructor(spider){
		mongoose.Promise 		= global.Promise;
		this.connection 		= null;
		this.connected 			= false;
		this.db		   			= mongoose;
		this.spider 			= spider;
		this.self				= this;
		this.Schema 			= mongoose.Schema;
		
		this.initializeMarket();
	}

	initializeMarket(){
		this.marketSchema = new this.Schema({
			name 		         : String,
			codici		         : Array,
			country	             : String,
			description	         : String
         
		});
	}
	
	isConnected() {
		return this.connected;
	}

	connectDB() {
			var self 	= this;
			var uri		= 'mongodb://'+ process.env.DB_USER +':'+ process.env.DB_PASS +'@'+ process.env.DB_HOST +':'+ process.env.DB_PORT +'/'+  process.env.DB_MARKET_DATBASE;
			var options = {promiseLibrary : global.Promise };

			this.db.createConnection(uri,options).then(
				conn => {
					console.log("URI MARKET "+uri);
					self.connection=conn;
					self.connected = true;
					self.spider.emit(self.spider.availableMessages.DBHANDLER_MARKET_CONNECTION_OK);
					});

				}
	
	
	findMarketByName(marketName){
		console.log("Find Market Function in Market Handler called with Name "+marketName);
			return this.marketModel.find({name : marketName}).exec();
		}

	/*createMarket(marketName,codici,country,description){
		console.log("CREATION Market "+ marketName + " " + codici+ " " +country+ " " +description );
		var marketModel=this.connection.model("italianmarkets",this.marketSchema);
		var newMarket=new marketModel();
		newMarket.name=marketName;
		newMarket.country=country;
		newMarket.description=description;	
		newMarket.codici=codici;		
		return newMarket.save();
	}

	*/

	createMarket(jsonObject){
		console.log("CREATION Market "+ JSON.stringify(jsonObject) );
		var marketModel=this.connection.model("italianmarkets",this.marketSchema);
		var newMarket=new marketModel(jsonObject);
		return newMarket.save();
	}


	deleteMarketByName(marketName){
		console.log("DELETE REQUEST for " + marketName);
		var marketModel=this.connection.model("italianmarkets",this.marketSchema);
		return marketModel.remove({name : marketName}).exec();
	}

	getAllMarkets(){
		var marketModel=this.connection.model("italianmarkets",this.marketSchema);
			return marketModel.find(function(err,users){
				if(err) {return console.log(err);}
				return users;
			}).exec();
		}
	
}



module.exports = MarketsHandler;

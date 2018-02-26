var  mongoose 		= require('mongoose');
const  bcrypt			= require('bcrypt-nodejs');


mongoose.Promise = global.Promise;

class MarketsHandler  {
	constructor(spider){
		mongoose.Promise 		= global.Promise;

		this.connected 			= false;
		this.db		   			= mongoose;
		this.spider 			= spider;
		this.self				= this;
		this.Schema 			= mongoose.Schema;
		this.marketModel		= null;
		this.marketSchema 		= new this.Schema({name: String}, { id: true });
	
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
					self.marketModel=conn.model("Market",self.marketSchema);
					self.connected = true;
					self.spider.emit(self.spider.availableMessages.DBHANDLER_MARKET_CONNECTION_OK);
					});

				}
	
	
	findMarketByName(marketName){
		console.log("Find Market Function in Market Handler called with Name "+marketName);
			return this.marketModel.find({name : marketName}).exec();
		}

	getAllMarkets(){
			return this.marketModel.find(function(err,users){
				if(err) {return console.log(err);}
				return users;
			}).exec();
		}
	
}



module.exports = MarketsHandler;

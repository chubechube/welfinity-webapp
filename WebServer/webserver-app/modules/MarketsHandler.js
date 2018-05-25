var  mongoose 			= require('mongoose');
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
					self.connection=conn;
					self.connected = true;
					self.spider.emit(self.spider.availableMessages.DBHANDLER_MARKET_CONNECTION_OK);
					});

				}
	
	
	findMarketByName(marketName){
		var marketModel=this.connection.model(process.env.DB_MARKETS_COLLECTION,this.marketSchema);
		return marketModel.find({name : marketName}).exec();
		}


	updateMarketbyId(jsonObject){
		var marketModel=this.connection.model(process.env.DB_MARKETS_COLLECTION,this.marketSchema);
		return marketModel.findByIdAndUpdate(jsonObject._id,{
				name : jsonObject.name,
				codici : this.createCodesArray(jsonObject),
				description : jsonObject.description,
				country : jsonObject.country


		});
		
	}
	
	createMarket(jsonObject){
		var marketModel=this.connection.model(process.env.DB_MARKETS_COLLECTION,this.marketSchema);
		var newMarket=new marketModel();
		console.log(JSON.stringify(jsonObject));

		newMarket.name = jsonObject.name;
		
		newMarket.codici = this.createCodesArray(jsonObject);
		newMarket.description = jsonObject.description;
		newMarket.country = jsonObject.country;
	
		return newMarket.save();
	}


	deleteMarketByName(marketName){
		var marketModel=this.connection.model(process.env.DB_MARKETS_COLLECTION,this.marketSchema);
		this.connection.dropCollection(marketName+"_TR001").then(test=>{
			this.connection.dropCollection(marketName+"_TR017").then(test=>{
			})


		})
		return marketModel.remove({name : marketName}).exec();
	}

	getAllMarkets(){
		var marketModel=this.connection.model(process.env.DB_MARKETS_COLLECTION,this.marketSchema);
			return marketModel.find(function(err,users){
				if(err) {return console.log(err);}
				return users;
			}).exec();
		}
	
	createCodesArray(jsonObject){
		var codesString=JSON.stringify(jsonObject.codici);
		codesString=codesString.slice(1,codesString.length-1);
		codesString = codesString.replace(/['"]+/g, '');
		return codesString.split(",");

	}

	extractId(jsonObject){
		var tempString = JSON.stringify(jsonObject._id);
		console.log("REPLACE "+tempString.replace(/['"]+/g, ''));
		return tempString.replace(/['"]+/g, '');
	}
}



module.exports = MarketsHandler;

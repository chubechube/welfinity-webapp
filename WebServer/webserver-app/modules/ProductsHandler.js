var  mongoose 		= require('mongoose');

mongoose.Promise = global.Promise;
class ProductsHandler{

constructor (spider){
  
    this.db                    = mongoose;
    this.spider                = spider;
    this.Schema 			   = this.db.Schema; 
    this.productSchema         = null; 
    this.productModel          = null;
    this.connected 			   = false;
    
}

connectDB(){
    var self 	= this;
    var uri		= 'mongodb://'+ process.env.DB_PRODUCT_USER +':'+ process.env.DB_PRODUCT_PASS +'@'+ process.env.DB_HOST +':'+ process.env.DB_PORT +'/'+  process.env.DB_PRODUCT_DATABASE;
    var options = {promiseLibrary : global.Promise };
    
    
    this.db.createConnection(uri,options).then(
        conn => {
            console.log("This is the URI Product "+uri);
            self.productModel=conn.model("TR001",new self.Schema({
                FDI_0001        : String,
                FDI_0004     : String
            }),'TR001');

            self.connected = true;
            self.spider.emit(self.spider.availableMessages.DBHANDLER_PRODUCT_CONNECTION_OK);
            });


    
   
}

handleError(err){
    console.log("ERRORE");
}

findProductByID(id){
    console.log("Find Product in Product Handler called with Id "+id);
		return this.productModel.find({id : id}).exec();
	}

    
        findMultipleProductByID(id){
            console.log("FindMultipleProductById Product in Product Handler called with Id "+id);
     
                return this.productModel.find().where({ FDI_0001: {'$regex': '^'+id}  }).limit(10).select({ FDI_0001: 1, FDI_0004: 1 }).exec();
                
            }

    isConnected() {
		return this.connected;
    }
    


}



module.exports = ProductsHandler;
const ConfigurationHolder       = require('dotenv').config();
const Spider                    = require('./Spider');
const RedisHandler              = require('./modules/RedisHandler');
const ExpressCustomServer       = require('./modules/ExpressCustomServer') ;
const DatabaseMarketsHandler    = require('./modules/MarketsHandler');
const DatabaseProductsHandler   = require('./modules/ProductsHandler');
const DatabaseUsersHandler      = require('./modules/UserHandler');
const WelfinityServicesHandler  = require('./modules/WelfinityServicesHandler');
const session                   = require('express-session');





//Spider Creation 
    
    var spider              = new Spider();
    spider.addFunction('session',session);

    spider.on(spider.availableMessages.DBHANDLER_CONNECTION_FAILED,function (err){
        console.log("CONNECTION WITH DB FAILED",err);
         spider.allGreen = false;
    });

//Redis Store Creation and MarketsHandlerConnection
    spider.on(spider.availableMessages.REDIS_CLIENT_OK,function(){
        console.log("Redis Client and Store OK");
        redisHandler.createStore();
        if(!spider.getModule('dbMarketsHandler') || !spider.getModule('dbMarketsHandler') .isConnected()){
            var dbMarketsHandler = new DatabaseMarketsHandler(spider);
            spider.addModule('dbMarketsHandler',dbMarketsHandler);
            dbMarketsHandler.connectDB();
        }
    });


    spider.on(spider.availableMessages.DBHANDLER_MARKET_CONNECTION_OK,function(){
        console.log("Connection to Mongo MARKET DB OK");
        
        if(!spider.getModule('dbProductsHandler') || !spider.getModule('dbProductsHandler') .isConnected()){
            var dbProductsHandler = new DatabaseProductsHandler(spider);
            spider.addModule('dbProductsHandler',dbProductsHandler);
            dbProductsHandler.connectDB();
        }
 
        
    });

    spider.on(spider.availableMessages.DBHANDLER_PRODUCT_CONNECTION_OK,function(){
        console.log("Connection to Mongo PRODUCT  DB OK");
        
        if(!spider.getModule('dbUsersHandler') || !spider.getModule('dbUsersHandler') .isConnected()){
            var dbUsersHandler = new DatabaseUsersHandler(spider);
            spider.addModule('dbUsersHandler',dbUsersHandler);
            dbUsersHandler.connectDB();
        }
 
        
    });
  spider.on(spider.availableMessages.DBHANDLER_USER_CONNECTION_OK,function(){
        console.log("ALL Modules Initiated - Starting Server");



        if(!spider.getModule('expressCustomServer')){ 

        var welfinityServicesHandler = new WelfinityServicesHandler();
        spider.addModule('welfinityServicesHandler',welfinityServicesHandler);

        var expressCustomServer = new ExpressCustomServer(spider);
        spider.addModule('expressCustomServer',expressCustomServer);

    
        expressCustomServer.createServer();
        spider.allGreen = true;
        }
    });



   
    //Redis Server Creation 

    var redisHandler = new RedisHandler(spider,process.env.REDIS_ADDRESS,process.env.REDIS_USER);

    spider.addModule('redisHandler',redisHandler);

//Redis Client Connection
    redisHandler.createClient();





//Site Route repository
const	parseurl 		= require('parseurl');
const	PassportHandler = require('../modules/PassportHandler');		
const 	flash         	= require('express-flash');
const   jwt 			= require("jsonwebtoken"); 
const 	allGreen		= false;





function setRoutes(self){
var self  = self;
//Middleware for all Routes
// Add headers
self.router.use(function (req, res, next) {

    // Website you wish to allow to connect

	res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

self.router.all("*", function (req, res, next) {
		console.log('Someone made a request! '+req.toString());
		console.log('%s %s %s', req.method, req.url, req.path);
		
				
			next();
		
	});

	


	//Insert User Page Route POST
  	self.router.post('/insert',function(req, res) {
	
	var promisedUser=self.dbUsersHandler.createUser(req.body.userName,req.body.userEmail,req.body.userPassword);
		promisedUser.then(function(createdUSer){
				res.send("User created"+createdUSer);
		}
	).catch(function(err){
		console.log(err);
	});
	 
	   
  });

	//List of Users Pageor single user info GET
	self.router.get('/users',self.passportHandler.passport.authenticate('jwt', { session: false }),function(req,res){
		console.log("userName =" +req.query.userName);
		function showUsers(allUsers){
			console.log(allUsers);
			res.json(allUsers);
		}

		if(req.query.userName == null){
			var promisedUsersList = self.dbUsersHandler.getAllUser();
			promisedUsersList.then(function(allUsers){

					showUsers(allUsers);
				
			}).catch(function(err){
			console.log(err)})
			}else{

				var promisedUser = self.dbUsersHandler.findUserByName(req.query.userName);

				promisedUser.then(function(foundUser){

					//showUsers([foundUser]);
					if(self.dbUsersHandler.validPassword(foundUser[0].userPassword,req.query.userPassword)){
						var payload = {
							id: foundUser[0].userName
						};
						var token = jwt.sign(payload, process.env.JWTSECRET,{
							expiresIn: 600 // in seconds
						  });
						res.json({
							token: token
						});
					}else{
						res.status(403).send({
							error: 'Incorrect password'
						  });
					}
				
			}).catch(function(err){
			console.log(err)})
			}


	});




	


	//Login Page Route POST
	self.router.post('/login',function(req, res) {
		console.log("userName "+req.body.userName);
		console.log("userPassword "+req.body.userPassword);
		var promisedUser = self.dbUsersHandler.findUserByName(req.body.userName);

		promisedUser.then(function(foundUser){
			console.log(foundUser.length);
			console.log(foundUser[0]);
			//showUsers([foundUser]);
			if(foundUser.length===1&&self.dbUsersHandler.validPassword(foundUser[0].userPassword,req.body.userPassword)){
				var payload = {
					id: foundUser[0].userName
				};
				var token = jwt.sign(payload, process.env.JWTSECRET,{
					expiresIn: 600 // in seconds
				});
				res.json({
					autorization_token: token
				});
			}else{
				res.status(403).send({
					error: 'Incorrect password'
				});
			}
		
	}).catch(function(err){
	console.log(err)})
  });


//WDM SERVICE
self.router.get('/wdm',function(req, res) {
  
	
	self.welfinityservices.WDM_Extract_And_Aggregate_Multiple(req,res);
  

});



//Product Service

self.router.get('/product',self.passportHandler.passport.authenticate('jwt', { session: false }),function(req,res){
	console.log("Query "+req.query.toString());
	var productCode = req.query.code;
	
	var promisedProductList = null;
	console.log("Product Code "+productCode);

	promisedProductList = self.productHandler.findMultipleProductByID(productCode);
	
	function showProducts(allProducts){
		
		res.json(allProducts);
	}

	if(promisedProductList != null){
		promisedProductList.then(function(allProducts){

			showProducts(allProducts);
		
	}).catch(function(err){
	console.log(err);
	});

	}else{
		res.send("Products not Found");

	}

});




//WIM SERVICE
self.router.get('/wim',self.passportHandler.passport.authenticate('jwt', { session: false }),function(req, res) {
 	self.welfinityservices.startWimService(res);
 });


//Add Market marketName,codici,country,description


self.router.put('/markets',function(req, res) {
	var promisedMarket=self.marketsHandler.updateMarketbyId(req.body);
	promisedMarket.then(function(createdMarket){
				res.send("PUT Marked UPTADATE"+createdMarket);
		}
	).catch(function(err){
		console.log(err);
	})});


//Add Market marketName,codici,country,description


	self.router.post('/markets',function(req, res) {
		var promisedMarket=self.marketsHandler.createMarket(req.body);
		promisedMarket.then(function(createdMarket){
					res.send("Market created"+createdMarket);
			}
		).catch(function(err){
			console.log(err);
		})});
//Delete Market

self.router.delete('/markets',self.passportHandler.passport.authenticate('jwt', { session: false }),function(req, res) {
  

	self.marketsHandler.deleteMarketByName(req.query.name).then(res.sendStatus(200));
  

});
//List of Markets Page GET

	self.router.get('/markets',self.passportHandler.passport.authenticate('jwt', { session: false }),function(req,res){

	
		console.log("Query "+req.query.toString());
		var marketName = req.query.name;
		var promisedMarketList = null;
		console.log("Market Name "+marketName);

		
		
		if(marketName == null){
		
		
			promisedMarketList = self.marketsHandler.getAllMarkets();
		

		} else{
			promisedMarketList = self.marketsHandler.findMarketByName(marketName);
		}
		
		


		function showMarket(allProducts){
			console.log(allProducts);
			res.json(allProducts);
		}

		if(promisedMarketList != null){
		promisedMarketList.then(function(allProducts){

				showMarket(allProducts);
			
		}).catch(function(err){
		console.log(err);
		});

		}else{
			res.send("Market not Found");

		}

	});


};



class RouteRepository{
constructor(spider) {

		this.spider					= spider;
		var app 					= this.spider.getFunction('app');
		this.express				= this.spider.getFunction('express');
		this.parseurl 				= parseurl;
		this.marketsHandler         = this.spider.getModule('dbMarketsHandler');
		this.welfinityservices      = this.spider.getModule('welfinityServicesHandler');
		this.productHandler			= this.spider.getModule('dbProductsHandler');
		this.dbUsersHandler			= this.spider.getModule('dbUsersHandler');
		this.passportHandler		= new PassportHandler(this.dbUsersHandler);
		
		//Passport configuration
			//Passoport for authentication
		app.use(this.passportHandler.passport.initialize());
		app.use(this.passportHandler.passport.session());

	
	this.router = this.express.Router();
	setRoutes(this);
	app.use(flash());
}
}
module.exports = RouteRepository;
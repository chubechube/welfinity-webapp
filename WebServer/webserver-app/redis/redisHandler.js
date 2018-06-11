var redis = require("redis");
client = redis.createClient({host : "94.23.179.229" , password : "foobared2"});

//if you'd like to select database 3, instead of 0 (default), call
//client.select(3, function() { /* ... */ });

client.on("error", function (err) {
 console.log("Error " + err);
});

client.on( 'ready',function(){
    console.log("Redis Connected ")
    
    client.llen('WELFINITYPORTAL', function(err, reply) {  
        if (err) {
           // Log error
           console.log("ERROR "+err)
        }
        // Log reply
        var lenghtList=reply
        console.log("LENGTH  "+reply)

       
    
        client.lrange("WELFINITYPORTAL",0,lenghtList, function (err, keyList) {
            if (err)
                return console.log(err);
            
                for (let index = 0; index < 20; index++) {
                    const element = keyList[index];
                    console.log("KEY " + element + " Value "+ lenghtList)
                    
                }

                
            });
       
      
    });
    

});
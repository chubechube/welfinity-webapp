const redis             = require('redis');
var assert              = require('assert');
var net                 = require('net');

class RedisHandler {

    constructor(spider,ip4addr,password){
        this.spider     = spider;
        this.session    = this.spider.getFunction('session');
        this.ip4addr    = ip4addr;
        this.password   = password;
        this.redisStore = undefined;


    };

    

createClient(){

        var self = this;
       
         this.client = redis.createClient({ host: this.ip4addr, password: this.password });
         console.log("Redis password "+process.env.REDIS_PASSWORD);

   
         this.client.auth(process.env.REDIS_PASSWORD);

        this.client.on('error', function (err) {
            console.log('error event - ' + this.client.host + ':' + this.client.port + ' - ' + err);
            self.spider.emit(self.spider.availableMessages.REDIS_CILENT_FAILED);
        });
       
       
        this.client.on( 'ready',function(){
            console.log("Redis Connected Now Loading the Parameters")

            self.loadConfigurationFromRedis(self);
    });

    return this.client;
};




loadConfigurationFromRedis(self) {
        self.client.auth(process.env.REDIS_PASSWORD);
        self.client.lrange('WELFINITYPORTAL', 0, -1, function (err, keys) {
            if (err)
                return console.log(err);
            var keysToGet = [];
            for (var i = 0, len = keys.length; i < len; i++) {
                keysToGet.push(keys[i]);
            }
            self.client.mget(keysToGet, function (err, keysPair) {
                if (err)
                    return console.log(err);
                var counter = 0;
                keysPair.forEach(keyValuer => {
                    process.env[keysToGet[counter]] = keyValuer;
                    counter++;
                });
                self.spider.emit(self.spider.availableMessages.REDIS_CLIENT_OK);
            });
        });
    }

createStore(){
    var redisStore  = require('connect-redis')(this.session);
    this.redisStore =  new redisStore({ host: this.ip4addr, port: 6379, client: this.client, ttl: 260 });
    return this.redisStore;
}

};

module.exports = RedisHandler;
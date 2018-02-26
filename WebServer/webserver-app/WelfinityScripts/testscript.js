
var Client = require('ssh2').Client;
var ContainerId = "";
var conn = new Client();


conn.on('Container',function(){
    console.log("EMIT OK Container = "+this.container);
    conn.exec('echo wW.H277gf | sudo -S docker container exec '+ this.container + './Create_Market_From_MongoDB_Table.sh  94.23.179.229 27017  markets TR017 talendUser ba+Req6@agu6  /data/aggregate/Italy/market/  market.xlsx  Product_Dictionaries_Italy TR017 FDI_T139 /var/log/welfinity/talend/WIM/ FDI_T139 1 1', function(err, stream) {
  
        stream.on('close', function(code, signal) {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
          conn.end();
        }).on('data', function(data) {
          console.log('STDOUT: ' + data);
        }).stderr.on('data', function(data) {
          console.log('STDERR: ' + data);
        });
      });    
});


conn.on('ready', function() {
  console.log('Client :: ready');
  conn.exec('echo wW.H277gf | sudo -S sudo -S docker ps -aq --filter ancestor=chube/wimservice:latest', function(err, stream) {
  
    stream.on('close', function(code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
      this.ContainerId=data;


       


      conn.emit("Container",data,conn);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
  });
}).connect({
  host: '94.23.179.229',
  port: 22,
  username: 'ressic',
  passphrase: 'chube2017!',
  privateKey: require('fs').readFileSync('/home/cristisno/.ssh/id_rsa')
});




const Client = require('ssh2').Client;

var conn = new Client();
conn.on('ready', function() {
  console.log('Client :: ready');
  conn.shell(function(err, stream) {
    if (err) throw err;
    stream.on('close', function() {
      console.log('Stream :: close');
      conn.end();
    }).on('data', function(data) {
      console.log('STDOUT: ' + data);
    }).stderr.on('data', function(data) {
      console.log('STDERR: ' + data);
    });
    stream.end('ContainerName=$(echo wW.H277gf | sudo -S sudo -S docker ps -aq --filter ancestor=chube/wimservice:latest)\necho " Using  Contaniner -> ${ContainerName} <-"\nsudo -S docker container exec  ${ContainerName} ./Create_Market_From_MongoDB_Table.sh  94.23.179.229 27017  markets TR017 talendUser ba+Req6@agu6  /data/aggregate/Italy/market/  market.xlsx  Product_Dictionaries_Italy TR017 FDI_T139 /var/log/welfinity/talend/WIM/ FDI_T139 1 1\nexit\n');
  });
}).connect({
  host: '94.23.179.229',
  port: 22,
  username: 'ressic',
  passphrase: 'chube2017!',
  privateKey: require('fs').readFileSync('/home/cristisno/.ssh/id_rsa')
});


const   Client		    = require('ssh2').Client;

class WelfinityServicesHandler{

constructor (){

    this.sshClient = new Client();
}

WDM_DownloadFile(res){
  var self = this;
this.sshClient.once('ready', function() {
  console.log('Client :: ready');
  self.sshClient.sftp(function(err, sftp) {
    if (err) throw err;
    sftp.fastGet('/data/aggregate/Italy/Aggregated/aggregated.xls','/usr/src/app/aggregated.xls', function(err) {
      if (err) throw err;
    console.log("File Retrieved");
      self.sshClient.end();
      res.sendFile('/usr/src/app/aggregated.xls');

    });
  });
}).connect({
  host: process.env.WDM_SERVER,
  port: 22,
  username: 'ressic',
  password: 'wW.H277gf'
});
}



WDM_Extract_And_Aggregate_Multiple(req,res){
  var self = this;
      
      this.sshClient.once('ready', function() {
  
        self.sshClient.shell(function(err, stream) {
          if (err) throw err;
          stream.once('close', function() {
            
           


            self.sshClient.end();
            self.WDM_DownloadFile(res);
          }).once('data', function(data) {
            
                             
          }).stderr.once('data', function(data) {
  
            
                });
         
         // console.log(process.env.WDM_SCRIPT_EXTRACT_AND_AGGREGATE+" " + process.env.WDM_SERVER+ " 27017 talendUser ba+Req6@agu6 Pharmacies_list Italy markets Product_Dictionaries_Italy /data/aggregate/Italy/toAggregate/ /data/aggregate/Italy/Aggregated/ filetoaggregate.csv aggregated.xls /var/log/welfinity/talend/WDM/  italy_prp Product_ID '" +req.query.productcodes+"' Transaction_Timestamp "+ req.query.startdate +" "+req.query.enddate +" "+process.env.WDM_DESTINATION_FOLDER +" 94.23.179.225 nodiuser\nexit\n");
          stream.end(process.env.WDM_SCRIPT_EXTRACT_AND_AGGREGATE+" " + process.env.WDM_SERVER+ " 27017 talendUser ba+Req6@agu6 Pharmacies_list Italy markets Product_Dictionaries_Italy /data/aggregate/Italy/toAggregate/ /data/aggregate/Italy/Aggregated/ filetoaggregate.csv aggregated.xls /var/log/welfinity/talend/WDM/  italy_prp Product_ID '" +req.query.productcodes+"' Transaction_Timestamp "+ req.query.startdate +" "+req.query.enddate +" "+process.env.WDM_DESTINATION_FOLDER +" 94.23.179.225 nodiuser\nexit\n");     
        });
      }).connect({
        host: process.env.WDM_SERVER,
        port: 22,
        username: 'ressic',
        password: 'wW.H277gf'
      });
      
}


startWimService(req,res){
  var self = this;
    this.sshClient.once('ready', function() {
        console.log('Client :: ready');
        self.sshClient.shell(function(err, stream) {
          if (err) throw err;
          stream.once('close', function() {
            console.log('Stream :: close');
            res.send('{"result" :"done"}');
            self.sshClient.end();
          }).once('data', function(data) {
            console.log('STDOUT: ' + data);
            
          }).stderr.once('data', function(data) {
            console.log('STDERR: ' + data);
                });
          console.log("MARKET NAME "+req.query.marketname);
          stream.end('ContainerName=$(echo wW.H277gf | sudo -S sudo -S docker ps -aq --filter ancestor=chube/wimservice:latest)\n sudo -S docker container exec  ${ContainerName} ./Create_All_Market_Support_Tables_From_MongoDB.sh 94.23.179.229 27017  markets italianmarkets talendUser ba+Req6@agu6   Product_Dictionaries_Italy '+req.query.marketname+' markets /var/log/welfinity/talend/WIM/  1\nexit\n');
      
      });
      }).connect({
        host: process.env.WIM_SERVER,
        port: 22,
        username: 'ressic',
        password: 'wW.H277gf'
      });
      
}
}

module.exports = WelfinityServicesHandler;
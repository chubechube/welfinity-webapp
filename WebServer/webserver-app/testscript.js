const spawn = require('child-process-promise').spawn;
 
 function executeTaskJob() {

    var promise = spawn('./WelfinityScripts/wim.sh');
 
    var childProcess = promise.childProcess;
    
    console.log('[spawn] childProcess.pid: ', childProcess.pid);
    childProcess.stdout.on('data', function (data) {
        console.log('[spawn] stdout: ', data.toString());
    });

    childProcess.stderr.on('data', function (data) {
        console.log('[spawn] stderr: ', data.toString());
    });
    
    promise.then(function () {
            console.log('[spawn] done!');
            return;
        })
        .catch(function (err) {
            console.error('[spawn] ERROR: ', err);
            return;
        });

}

 const jobresult = executeTaskJob();
 console.log(" RESULT " + jobresult);
/*
process.on('message', (msg) => {
    const sum = executeTaskJob();
    process.send(sum);


});
*/
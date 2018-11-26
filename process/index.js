const fs = require('fs')
const cluster = require('cluster')
const os = require('os')

// if(cluster.isMaster){
console.log(process.pid)

process.on('beforeExit', function(code){
    console.log(`About to exit with code: ${code}`);
});

process.on('warning', (warning) => {
  console.warn(warning.name);    // Print the warning name
  console.warn(warning.message); // Print the warning message
  console.warn(warning.stack);   // Print the stack trace
});

process.on('exit', function(exitCode){
    console.log(`exited with code: ${code}`);
});

process.on('uncaughtException', (err) => {
  fs.writeSync(1, `Caught exception: ${err}\n`);
});

console.log(process.cwd());
console.log(process.cpuUsage());
console.log(process.env);

// call()
// process.exit()

/*

  process.argv.forEach((val, index) => {
      console.log(`${index}: ${val}`);
  });

*/


/*
   const numberOfCPUs = os.cpus().length;
   
   for(var i = 0; i < numberOfCPUs; i++){
      let workerProcess = clutser.fork();
      
      cluster.workers[i].on('exit', (code) => {
          
      });
   }
*/

//}else{



//}

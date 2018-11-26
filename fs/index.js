const fs = require('fs');
const path = require('path');

fs.writeFile(path.join(__dirname, 'open/hello.txt'), "Hello To Everyone!", function(err){

});

fs.exists(path.join(__dirname, 'open/hello.txt'), (exists) => {
  console.log(exists ? 'it\'s there' : 'it\'s not there');
});

fs.open(path.join(__dirname, 'open/hello.txt'), 'r', (err, fd) => {
  if (err) throw err;
  
  // fd.truncate()
  
  fs.close(fd, (err) => {
    if (err) throw err;
  });
});

fs.rename(path.join(__dirname, 'open/hello.txt'), path.join(__dirname, 'open/world.txt'), (err) => {
  if (err) throw err;
  console.log('renamed complete');
});

fs.stat(path.join(__dirname, 'open/world.txt'), (err, stats) => {
  if (err) throw err;
  console.log(`stats: ${JSON.stringify(stats)}`);
});

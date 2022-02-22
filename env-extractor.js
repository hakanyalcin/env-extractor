var fs = require('fs');

//const directory = process.argv.slice(2);
//console.log("directory name is:" + directory[0]);
//var files = fs.readdirSync(directory[0]);

var file = fs.readFileSync('dummy.txt');

FILE_LOCATION = 'dummy.txt';
fs.readFile(FILE_LOCATION, function (err, data) {
    if (err) throw err;
    if(data.includes('process.env.')){
     console.log(data)
    } else console.log('not found');
  });
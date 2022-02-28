var fs = require('fs');
var path = require('path');
let workingPath = process.argv.slice(2)[0];
var envArr = [];


let walk = function(dir, done) {
var results = [];
fs.readdir(dir, function(err, list) {
  if (err) return done(err);
  var i = 0;
  (function next() {
    var file = list[i++];
    if (!file) return done(null, results);
    file = path.resolve(dir, file);
    

    fs.stat(file, function(err, stat) {
      if (stat && stat.isDirectory()) {
        if(dir !== `${workingPath}/node-modules`) {
          walk(file, function(err, res) {
            next();
          });
        }
      } else {
        fs.readFile(file, function (err, file) {
          if (err) throw err;
          var str = file.toString();
          const regexp = new RegExp('process.env.','g');
          const matches = str.matchAll(regexp);

            for (const match of matches) {
            let startIndex = match.index + match[0].length ;              
            let envVar = str.slice(startIndex, str.indexOf((' '), startIndex));      
            var result = envVar.split(/\W/)[0];
            envArr.push(result);
          }
        });         
        next();
      }
    });


  })();
});
  
};




  walk(workingPath, function(err, results) {
    if (err) throw err;
    const uniqueEnv = envArr.filter((x, i, a) => a.indexOf(x) == i);
    console.log(uniqueEnv);
  });
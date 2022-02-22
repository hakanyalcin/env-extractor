var fs = require('fs');
var path = require('path');
var walk = function(dir, done) {
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
          walk(file, function(err, res) {
           // results = results.concat(res);         
            next();
          });
        } else {

          fs.readFile(file, function (err, file) {
            //if (err) throw err;
            if(file.includes('hakan')){
             console.log('found');
            } else console.log('not found');
          });

          
          next();
        }
      });
    })();
  });
};



walk('/Users/hakanyalcin/smartgift/env-extractor/test', function(err, results) {
  if (err) throw err;
});
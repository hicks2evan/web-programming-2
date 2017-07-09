/**
 * Created by Evan on 6/29/17.
 */
class lab4 {

  syncFileRead(filename) {
    var fs = require('fs');

    var data = fs.readFileSync(filename);

    return data.toString();
  }

  asyncFileRead(filename, callback) {
    var fs = require('fs');
    fs.readFile(filename, function(err, data) {
       if(err) {
          console.log(err);
       }
      return callback(data);
    });
    // fs.open(filename, 'r+', function(data) {
    //   return callback(data);
    // });
  }

  compressFileStream(fileIn, fileOut) {
    var fs = require('fs');
    var zlip = require('zlib');

     // Compress the file input.txt to input.txt.gz
    var stream = fs.createReadStream(fileIn)
        .pipe(zlip.createGzip())
        .pipe(fs.createWriteStream(fileOut));

    console.log('File Compressed.');
    return stream;
  }

  decompressFileStream(fileIn, fileOut) {
    var fs = require('fs');
    var zlip = require('zlib');

     // Compress the file input.txt to input.txt.gz
    var stream = fs.createReadStream(fileIn)
        .pipe(zlip.createGunzip())
        .pipe(fs.createWriteStream(fileOut));

    console.log('File Decompressed.');
    return stream;
  }

  listDirectoryContents(directory, callback) {
    var fs = require('fs');

    //var arr = [];
    fs.readdir(directory, function(err, files) {
      if(err) {
        console.log(err);
      }
      return callback(files);
    });
  }

}

export {lab4};

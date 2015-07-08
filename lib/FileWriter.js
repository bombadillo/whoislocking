(function() {
  var FileWriter, fs;

  fs = require('fs');

  FileWriter = (function() {
    function FileWriter() {}

    FileWriter.prototype.writeArrayToFile = function(array, fileName) {
      var i, item, j, len, len1, line, text, textToWrite;
      textToWrite = "";
      for (i = 0, len = array.length; i < len; i++) {
        item = array[i];
        line = "";
        for (j = 0, len1 = item.length; j < len1; j++) {
          text = item[j];
          line += text + ",";
        }
        line = this.fixEndOfLine(line);
        textToWrite += line;
      }
      console.log(fileName);
      return this.writeStringToFile(textToWrite, fileName);
    };

    FileWriter.prototype.fixEndOfLine = function(line) {
      line = line.substr(0, line.length - 1);
      line += "\n";
      return line;
    };

    FileWriter.prototype.writeStringToFile = function(string, fileName) {
      return fs.appendFile(fileName, string, (function(_this) {
        return function(err) {
          return _this.onWriteResponse(err, fileName);
        };
      })(this));
    };

    FileWriter.prototype.onWriteResponse = function(err, fileName) {
      if (err) {
        return console.log(err);
      } else {
        return console.log("File saved: " + fileName);
      }
    };

    return FileWriter;

  })();

  module.exports = new FileWriter();

}).call(this);

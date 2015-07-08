(function() {
  var FileNameGenerator;

  FileNameGenerator = (function() {
    function FileNameGenerator() {}

    FileNameGenerator.prototype.reportDirectory = "./reports/";

    FileNameGenerator.prototype.generate = function() {
      var fileName;
      fileName = this.reportDirectory + Date.now() + ".csv";
      return fileName;
    };

    return FileNameGenerator;

  })();

  module.exports = new FileNameGenerator();

}).call(this);

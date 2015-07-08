(function() {
  var Config, FileNameGenerator, FileWriter, OracleHandler, WhoIsLocking;

  OracleHandler = require('./OracleHandler');

  FileWriter = require('./FileWriter');

  FileNameGenerator = require('./FileNameGenerator');

  Config = require('./config');

  WhoIsLocking = (function() {
    WhoIsLocking.prototype.oracleHandler = null;

    WhoIsLocking.prototype.fileName = null;

    function WhoIsLocking(oracleHandler) {
      if (oracleHandler == null) {
        oracleHandler = new OracleHandler;
      }
      this.oracleHandler = oracleHandler;
    }

    WhoIsLocking.prototype.getFileName = function() {
      return this.fileName = FileNameGenerator.generate();
    };

    WhoIsLocking.prototype.createFileHeader = function() {
      var header;
      header = Config.ReportHeader;
      return FileWriter.writeStringToFile(header, this.fileName);
    };

    WhoIsLocking.prototype.reportLocking = function() {
      return setInterval(((function(_this) {
        return function() {
          return _this.generateReport();
        };
      })(this)), 4000);
    };

    WhoIsLocking.prototype.generateReport = function() {
      this.getFileName();
      this.createFileHeader();
      return this.oracleHandler.query(Config.LockSql).then((function(_this) {
        return function(result) {
          return FileWriter.writeArrayToFile(result.rows, _this.fileName);
        };
      })(this));
    };

    return WhoIsLocking;

  })();

  module.exports = new WhoIsLocking();

}).call(this);

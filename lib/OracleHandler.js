(function() {
  var OracleConnector, OracleHandler;

  OracleConnector = require('./OracleConnector');

  OracleHandler = (function() {
    OracleHandler.prototype.oracleConnector = null;

    OracleHandler.prototype.db = null;

    function OracleHandler(oracleConnector) {
      if (oracleConnector == null) {
        oracleConnector = new OracleConnector;
      }
      this.oracleConnector = oracleConnector;
    }

    OracleHandler.prototype.connect = function() {
      return this.oracleConnector.connect().then(function(db) {
        return this.db = db;
      });
    };

    OracleHandler.prototype.query = function(sql) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.connect().then(function(db) {
            _this.db = db;
            return _this.executeQuery(sql).then(function(result) {
              return resolve(result);
            });
          });
        };
      })(this));
    };

    OracleHandler.prototype.executeQuery = function(sql) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.db.execute(sql, function(err, result) {
            if (err) {
              _this.onError(err);
              return reject(err.message);
            } else {
              return resolve(result);
            }
          });
        };
      })(this));
    };

    OracleHandler.prototype.fetchAll = function() {
      return [];
    };

    OracleHandler.prototype.onError = function(err) {
      return console.log("DB error: " + err.message);
    };

    return OracleHandler;

  })();

  module.exports = OracleHandler;

}).call(this);

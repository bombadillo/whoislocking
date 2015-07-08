(function() {
  var Config, OracleConnector, OracleDb;

  OracleDb = require('oracledb');

  Config = require('./config');

  OracleConnector = (function() {
    OracleConnector.prototype.oracleDb = null;

    OracleConnector.prototype.con = null;

    function OracleConnector(oracleDb) {
      if (oracleDb == null) {
        oracleDb = OracleDb;
      }
      this.oracleDb = oracleDb;
    }

    OracleConnector.prototype.connect = function() {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.attemptConnect(resolve, reject);
        };
      })(this));
    };

    OracleConnector.prototype.attemptConnect = function(resolve, reject) {
      var errorHandler;
      errorHandler = this.handleError;
      return this.oracleDb.createPool({
        user: Config.OracleUser,
        password: Config.OraclePass,
        connectString: Config.OracleCon
      }, (function(_this) {
        return function(err, pool) {
          return pool.getConnection(function(err, connection) {
            _this.handleConnectResponse(err, connection);
            if (!_this.con) {
              return reject(err.message);
            } else {
              return resolve(connection);
            }
          });
        };
      })(this));
    };

    OracleConnector.prototype.handleConnectResponse = function(err, connection) {
      if (err) {
        return this.handleError(err);
      } else {
        return this.con = connection;
      }
    };

    OracleConnector.prototype.handleError = function(err) {
      return console.log(err.message);
    };

    return OracleConnector;

  })();

  module.exports = OracleConnector;

}).call(this);

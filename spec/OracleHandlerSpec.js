(function() {
  var OracleHandler;

  OracleHandler = require('../lib/OracleHandler');

  describe("OracleHandler", function() {
    return describe("Unit Tests", function() {
      var oracleConnector, sut;
      oracleConnector = null;
      sut = null;
      beforeEach(function() {
        var OracleConnector;
        OracleConnector = (function() {
          function OracleConnector() {}

          OracleConnector.prototype.connect = function() {};

          return OracleConnector;

        })();
        oracleConnector = new OracleConnector();
        spyOn(oracleConnector, 'connect').and.returnValue({});
        return sut = new OracleHandler(oracleConnector);
      });
      it("gets data from oracle", function() {
        var result;
        result = sut.fetchAll();
        return expect(result instanceof Array).toBe(true);
      });
      return it("calls oracleConnector->connect", function() {
        return expect(oracleConnector.connect).toHaveBeenCalled();
      });
    });
  });

}).call(this);

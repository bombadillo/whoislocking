(function() {
  var OracleConnector;

  OracleConnector = require('../lib/OracleConnector');

  describe("OracleConnector", function() {
    var sut;
    sut = null;
    beforeEach(function() {
      return sut = new OracleConnector();
    });
    return it("should call OracleConnector->getConnection", function() {
      var result;
      return result = sut.connect().then(function() {
        return expect(sut.oracleDb.getConnection).toHaveBeenCalled();
      });
    });
  });

}).call(this);

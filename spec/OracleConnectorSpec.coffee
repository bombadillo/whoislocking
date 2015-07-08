OracleConnector = require '../lib/OracleConnector'

describe "OracleConnector", ->
  sut = null

  beforeEach ->
    sut = new OracleConnector()

  it "should call OracleConnector->getConnection", ->
    result = sut.connect().then ->
      expect(sut.oracleDb.getConnection).toHaveBeenCalled()

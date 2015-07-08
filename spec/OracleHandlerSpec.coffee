OracleHandler = require '../lib/OracleHandler'

describe "OracleHandler", ->

  describe "Unit Tests", ->

    oracleConnector = null
    sut = null

    beforeEach ->
      class OracleConnector
        connect: ->

      oracleConnector = new OracleConnector()
      spyOn(oracleConnector, 'connect').and.returnValue {}
      sut = new OracleHandler oracleConnector

    it "gets data from oracle", ->
      result = sut.fetchAll()
      expect(result instanceof Array).toBe true

    it "calls oracleConnector->connect", ->
      expect(oracleConnector.connect).toHaveBeenCalled()

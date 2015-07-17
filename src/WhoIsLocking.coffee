OracleHandler = require './OracleHandler'
FileWriter = require './FileWriter'
FileNameGenerator = require './FileNameGenerator'
Config = require './config'

class WhoIsLocking
  oracleHandler: null
  fileName: null

  constructor: (oracleHandler = new OracleHandler) ->
    @oracleHandler = oracleHandler

  getFileName: ->
    @fileName = FileNameGenerator.generate()

  createFileHeader: ->
    header = Config.ReportHeader
    FileWriter.writeStringToFile header, @fileName

  reportLocking: ->
    @generateReport()


  generateReport: ->
    @getFileName()
    @createFileHeader()

    @oracleHandler.query(Config.LockSql).then (result) =>
      FileWriter.writeArrayToFile result.rows, @fileName


module.exports = new WhoIsLocking()

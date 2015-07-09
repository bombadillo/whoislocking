OracleDb = require 'oracledb'
Config = require './config'

class OracleConnector
  oracleDb: null
  con: null

  constructor: (oracleDb = OracleDb) ->
    @oracleDb = oracleDb

  connect: ->
    return new Promise (resolve, reject) =>
      @attemptConnect resolve, reject

  attemptConnect: (resolve, reject) ->
    errorHandler = @handleError
    @oracleDb.createPool(
      {
        user: Config.OracleUser
        password: Config.OraclePass
        connectString: Config.OracleCon
      }
      (err, pool) =>
        pool.getConnection (err, connection) =>
          @handleConnectResponse(err, connection)
          if !@con
            reject err.message
          else
            resolve connection
    )

  handleConnectResponse: (err, connection) ->
    if err
      @handleError err
    else
      @con = connection

  handleError: (err) ->
    console.log err.message

module.exports = OracleConnector

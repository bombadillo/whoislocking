OracleConnector = require './OracleConnector'

class OracleHandler
  oracleConnector: null
  db: null

  constructor: (oracleConnector = new OracleConnector) ->
    @oracleConnector = oracleConnector

  connect: ->
    @oracleConnector.connect().then (db) ->
      @db = db

  query: (sql) ->
    return new Promise (resolve, reject) =>
      @connect().then (db) =>
        @db = db
        @executeQuery(sql).then (result) ->
          resolve result

  executeQuery: (sql) ->
    return new Promise (resolve, reject) =>
      @db.execute(
        sql
        (err, result) =>
          if err
            @onError err
            reject err.message
          else
            resolve result
      )

  fetchAll: ->
    return []

  onError: (err) ->
    console.log "DB error: " + err.message

module.exports = OracleHandler

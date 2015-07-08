fs = require 'fs'

class FileWriter

  writeArrayToFile: (array, fileName) ->
    textToWrite = ""
    for item in array
      line = ""
      for text in item
        line += text + ","
      line = @fixEndOfLine line
      textToWrite += line
    console.log fileName
    @writeStringToFile textToWrite, fileName

  fixEndOfLine: (line) ->
    line = line.substr(0, line.length - 1)
    line += "\n"
    return line

  writeStringToFile: (string, fileName) ->
    fs.appendFile(fileName, string, (err) =>
      @onWriteResponse(err, fileName))

  onWriteResponse: (err, fileName) ->
    if err
      console.log err
    else
      console.log "File saved: " + fileName


module.exports = new FileWriter()

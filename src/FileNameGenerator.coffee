class FileNameGenerator
  reportDirectory: "./reports/"
  generate: ->
    fileName = @reportDirectory + Date.now() + ".csv"
    return fileName

module.exports = new FileNameGenerator()

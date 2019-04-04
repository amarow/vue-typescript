var Command = /** @class */ (function () {
  function Command (label) {
    this.secondClass = false
    this.label = label
  }
  Command.prototype.call = function (callback) {
    this.callback = callback
    return this
  }
  Command.prototype.asSecondClass = function () {
    this.secondClass = true
    return this
  }
  Command.prototype.isSecondClass = function () {
    return this.secondClass
  }
  Command.prototype.getLabel = function () {
    return this.label
  }
  Command.prototype.isDisabled = function () {
    return false
  }
  Command.prototype.execute = function () {
    if (this.callback) {
      this.callback(this)
    } else {
      console.log("no callback in command: '" + this.label + "'")
    }
  }
  return Command
}())
export { Command }
var Commands = /** @class */ (function () {
  function Commands () {
    this.commands = new Array()
  }
  Commands.prototype.createCommand = function (label) {
    var _this = this
    var command = new Command(label)
    this.commands.push(command)
    command.build = function () { return _this }
    return command
  }
  Commands.prototype.addCommand = function (command) {
    var _this = this
    this.commands.push(command)
    command.build = function () { return _this }
    return command
  }
  Commands.prototype.isEmpty = function () {
    return this.commands.length == 0
  }
  Commands.prototype.hasSecondClassCommands = function () {
    return this.getSecondClassCommands().length > 0
  }
  Commands.prototype.hasFirstClassCommands = function () {
    return this.getFirstClassCommands().length > 0
  }
  Commands.prototype.getSecondClassCommands = function () {
    return this.commands.filter(function (e) { return e.isSecondClass() == true })
  }
  Commands.prototype.getFirstClassCommands = function () {
    return this.commands.filter(function (e) { return e.isSecondClass() != true })
  }
  Commands.create = function () {
    return new Commands()
  }
  return Commands
}())
export { Commands }
// # sourceMappingURL=Commands.js.map

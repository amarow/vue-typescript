var Column = /** @class */ (function () {
  function Column (label, key) {
    if (key === void 0) { key = label.toLowerCase() }
    this.sortable = true
    this.resizeable = true
    this.width = 200
    this.align = 'left'
    this.label = label
    this.key = key
    return this
  }
  Column.prototype.sort = function () {
    this.sortable = true
    return this
  }
  Column.prototype.center = function () {
    this.align = 'center'
    return this
  }
  Column.prototype.right = function () {
    this.align = 'right'
    return this
  }
  Column.prototype.fixWidth = function () {
    this.resizeable = false
    return this
  }
  Column.prototype.startWidth = function (width) {
    this.width = width
    return this
  }
  return Column
}())
export { Column }
var Columns = /** @class */ (function () {
  function Columns () {
    this.columns = new Array()
  }
  Columns.prototype.add = function (label) {
    var _this = this
    var col = new Column(label)
    col.build = function () { return _this }
    this.columns.push(col)
    return col
  }
  Columns.prototype.getColumns = function () {
    return this.columns
  }
  Columns.create = function () {
    return new Columns()
  }
  return Columns
}())
export { Columns }
// # sourceMappingURL=Columns.js.map

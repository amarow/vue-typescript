var ComponentConfig = /** @class */ (function () {
  function ComponentConfig () {
    this.labelWidth = '7em'
    this.span = 2
    this.offset = 0
    this.type = 'text'
    this.placeHolder = ''
  }
  ComponentConfig.prototype.withSpan = function (span) {
    this.span = span
    return this
  }
  ComponentConfig.prototype.withTable = function (table) {
    this.table = table
    return this
  }
  ComponentConfig.prototype.withColumns = function (columns) {
    this.columns = columns
    return this
  }
  ComponentConfig.prototype.withOffset = function (offset) {
    this.offset = offset
    return this
  }
  ComponentConfig.prototype.withBottomSpace = function (val) {
    this.bottomSpace = val
    return this
  }
  ComponentConfig.prototype.withPlaceHolder = function (placeHolder) {
    this.placeHolder = placeHolder
    return this
  }
  ComponentConfig.prototype.withKey = function (key) {
    this.key = key
    return this
  }
  ComponentConfig.prototype.withLabel = function (label) {
    this.type = 'label'
    this.label = label
    return this
  }
  ComponentConfig.prototype.withLabelWidth = function (width) {
    this.labelWidth = width
    return this
  }
  ComponentConfig.prototype.getLabel = function () {
    return this.type == 'boolean' ? null : this.label
  }
  ComponentConfig.prototype.getLabelWidth = function () {
    return this.type == 'boolean' ? '0' : this.labelWidth
  }
  ComponentConfig.prototype.getCheckboxLabel = function () {
    return this.label
  }
  return ComponentConfig
}())
export { ComponentConfig }
var Row = /** @class */ (function () {
  function Row () {
    this.configs = new Array()
    this.count = 0
  }
  Row.prototype.hr = function (label) {
    return this.createConfig(label, 'hr')
  }
  Row.prototype.space = function () {
    return this.createConfig('', 'space')
  }
  Row.prototype.textInput = function (label) {
    return this.createConfig(label, 'text')
  }
  Row.prototype.checkbox = function (label) {
    return this.createConfig(label, 'boolean')
  }
  Row.prototype.lookup = function (label) {
    return this.createConfig(label, 'lookup')
  }
  Row.prototype.selectInput = function (label) {
    return this.createConfig(label, 'select')
  }
  Row.prototype.dateInput = function (label) {
    return this.createConfig(label, 'date')
  }
  Row.prototype.numericinput = function (label) {
    return this.createConfig(label, 'numeric')
  }
  Row.prototype.textArea = function (label) {
    return this.createConfig(label, 'area')
  }
  Row.prototype.list = function (label) {
    return this.createConfig(label, 'list')
  }
  Row.prototype.build = function () {
    return this.form
  }
  Row.prototype.createConfig = function (label, type) {
    var _this = this
    var config = new ComponentConfig()
    if (this.form.allLabelWithColon &&
            !label.endsWith(':') &&
            type != 'boolean') {
      config.label = label + ':'
    } else {
      config.label = label
    }
    config.key = label.toLowerCase()
    config.placeHolder = label
    config.type = type
    config.span = this.form.allCollSpan
    config.labelWidth = this.form.allLabelWidth
    config.bottomSpace = this.form.allBottomSpace
    config.build = function () {
      return _this
    }
    this.configs.push(config)
    return config
  }
  return Row
}())
export { Row }
var Form = /** @class */ (function () {
  function Form () {
    this.rows = new Array()
    this.allLabelWithColon = false
    this.allCollSpan = 8
    this.allBottomSpace = '5px'
    this.allLabelWidth = '7em'
  }
  Form.prototype.defaultBottomSpace = function (val) {
    this.allBottomSpace = val
    return this
  }
  Form.prototype.defaultCollSpan = function (val) {
    this.allCollSpan = val
    return this
  }
  Form.prototype.allLabelEndWithColon = function () {
    this.allLabelWithColon = true
    return this
  }
  Form.prototype.defaultLabelWidth = function (val) {
    this.allLabelWidth = val
    return this
  }
  Form.prototype.newRow = function () {
    var row = new Row()
    row.form = this
    row.count = this.rows.length
    this.rows.push(row)
    return row
  }
  Form.prototype.build = function () {
    return this
  }
  Form.create = function () {
    return new Form()
  }
  return Form
}())
export { Form }
// # sourceMappingURL=Form.js.map

var Adress = /** @class */ (function () {
  function Adress () {
    this.country = ''
    this.city = ''
    this.street = ''
    this.number = 10
  }
  Adress.prototype.guiRep = function () {
    return this.city + ' ' + this.country + ' ' + this.street + ' ' + this.number
  }
  return Adress
}())
export { Adress }
var AdressService = /** @class */ (function () {
  function AdressService () {
  }
  AdressService.createAdresses = function (count) {
    var array = new Array()
    var countries = ['USA', 'Germany', 'India', 'Russia', 'Brasil', 'UK']
    var cities = ['Gothham', 'Berlin', 'New Deli', 'Moscow', 'Rio', 'London']
    var streets = ['Rumble Street', 'Neuendorfer Str.', 'Raband Rudeu', 'Novosibirskaja', 'Sao Paolo', 'Abey Road']
    for (var i = 0; i < count; i++) {
      var adress = new Adress()
      adress.country = countries[i % countries.length]
      adress.city = cities[i % cities.length]
      adress.street = streets[i % streets.length]
      adress.number = i + 22
      array.push(adress)
    }
    return array
  }
  return AdressService
}())
export { AdressService }
// # sourceMappingURL=Adress.js.map

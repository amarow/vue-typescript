var Person = /** @class */ (function () {
  function Person (id, first) {
    this.id = 0
    this.first = ''
    this.second = ''
    this.paid = '0'
    this.nickname = ''
    this.city = ''
    this.male = false
    this.id = id
    this.first = first
  }
  Person.prototype.guiRep = function () {
    return this.first
  }
  return Person
}())
export { Person }
var PersonService = /** @class */ (function () {
  function PersonService () {
  }
  PersonService.createPersons = function (count) {
    var persons = Array()
    var names = ['Reyu', 'Joshi', 'Andy', 'Helen', 'Carlo', 'Peter', 'John']
    var secondnames = ['Murakami', 'Rudolp', 'Kretschmer', 'Helenbird', 'Carlosoto', 'Peterson', 'Jonson']
    var nicknames = ['The Flow', 'Rambo', 'Cruncher', 'Delightfull', 'Weired', 'Orderly', 'King']
    var cities = ['Gothham', 'Berlin', 'New Deli', 'Bejin', 'Rom', 'Budapest', 'New Orleans']
    for (var index = 0; index < count; index++) {
      var person = new Person(index, names[index % names.length])
      person.second = secondnames[index % secondnames.length]
      person.birthday = new Date(858594654654 + index * 60 * 1000 * 60 * 24)
      person.paid = '' + index * 245
      person.nickname = nicknames[index % nicknames.length]
      person.city = cities[index % cities.length]
      persons.push(person)
    }
    return persons
  }
  return PersonService
}())
export { PersonService }
// # sourceMappingURL=Person.js.map

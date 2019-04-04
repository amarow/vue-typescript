<template>
  <el-container >
          <list-pane
            height="400"
            width="50%"
            :table="table"
            :searchAble="true"
            :bottom_commands="false"
            :columns="listerConfig.columns"
            :commands="listerConfig.comands"
            @selectionChanged="listSelectionChanged"
            @emitCommand="handleCommand"
            ref="myListPane"
          />
          <div style="width:30px"/>
          <edit-pane
            width="50%"
            labelPosition="right"
            :gutter=35
            :inputs="editorConfig.inputs"
            :commands="editorConfig.commands"
            :model="person"
            @emitCommand="handleCommand"
            ref="myEditPane"
          />
  </el-container>
</template>

<script>
import ListPane from './components/ListPane'
import EditPane from './components/EditPane'
import { FormFactory } from './factories/FormFactory'
import { CommandFactory } from './factories/CommandFactory'
import { ColumnFactory } from './factories/ColumnFactory'
import axios from 'axios'

var form = new FormFactory(2).defaultBottomSpace('5px')
var command = new CommandFactory()
var column = new ColumnFactory()

class Person {
    name='NEW';
    birth_date='';
    gender='';
    hair_color='';
    eye_color='';
    films=[];
}

class Film {
  title='';
  director='';
}

export default {
  name: 'swapi',
  data () {
    return {
      person: new Person(),
      table: [],
      films: [],

      // *******  Lister Configuration ***********/
      listerConfig: {
        columns: [
          column.create('Name').alignCenter().build(),
          column.create('Birth Year', 'birth_year').build(),
          column.create('Gender').build(),
          column.create('Hair Color', 'hair_color').build(),
          column.create('Eye Color', 'eye_color').build()
        ],
        comands: [
          command.create('Copy').callback(() => this.$refs.myListPane.copySelectedRow()).build(),
          command.create('Delete').callback(() => this.$refs.myListPane.deleteSelectedRow()).build(),
          command.create('New').callback(() => this.$refs.myListPane.addRow(new Person())).build(),
          command.create('Load').callback(this.loadPeople).build()
        ]
      },

      // *******  Editor Configuration ***********/
      editorConfig: {
        inputs: [
          form.newRow(),
          form.space().bottomSpace('2px').build(),
          form.newRow(),
          form.textInput('Name').span(8).build(),
          form.textInput('Gender').span(8).build(),
          form.newRow(),
          form.textInput('Hair Color', 'hair_color').span(8).build(),
          form.textInput('Eye Color', 'eye_color').span(8).build(),
          form.newRow(),
          form.textInput('Birth Year', 'birth_year').span(8).build(),
          form.newRow(),
          form.list('Films').span(16)
            .columns([column.create('Title').alignCenter().sort(false).build(),
              column.create('Director').sort(false).build()])
            .table(this.getFilms()).build()
        ],
        commands: [
          command.create('Save').build(),
          command.create('Send').build(),
          command.create('Edit').secondClass().build()
        ]
      }
    }
  },
  mounted () {
    this.loadPeople()
  },
  methods: {
    handleCommand: function (command) {
      command.execute({
        selection: this.person,
        table: this.table
      })
    },
    listSelectionChanged: function (selection) {
      this.person = selection || new Person()
    },
    loadPeople () {
      this.$refs.myListPane.setLoading(true)
      axios.get('https://swapi.co/api/people/?format=json')
        .then((response) => {
          this.table = response.data.results
          this.$refs.myListPane.setLoading(false)
        })
        .catch((error) => {
          this.$notify.error({ title: 'Error', message: 'error callin SWAPI:' + error })
        })
    },
    getFilms () {
      let link = ''
      let films = []
      if (this.person) {
        for (link in this.person.films) {
          axios.get('https://swapi.co/api/films/' + link)
            .then((response) => {
              let film = new Film()
              film.title = response.data.title
              film.director = response.data.director
              films.push(film)
            })
        }
        return films
      }
    }
  },
  components: {
    ListPane,
    EditPane
  }
}
</script>

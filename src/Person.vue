<template>
<el-container >
      <el-row>
          <list-pane
            height="300"
            :table="table"
            :searchAble="true"
            :columns="listerConfig.columns"
            :commands="listerConfig.comands"
            @selectionChanged="listSelectionChanged"
            @emitCommand="handleCommand"
            ref="myListPane"
          />
          <edit-pane
            labelPosition="left"
            :gutter=35
            :inputs="editorConfig.inputs"
            :commands="editorConfig.commands"
            :model="person"
            @emitCommand="handleCommand"
          />
      </el-row>
  </el-container>
</template>

<script>
import ListPane from './components/ListPane.vue'
import EditPane from './components/EditPane.vue'
import { Person, PersonService } from './model/Person.ts'
import { AdressService } from './model/Adress.ts'
import { FormFactory } from './factories/FormFactory'
import { CommandFactory } from './factories/CommandFactory'
import { ColumnFactory } from './factories/ColumnFactory'

var form = new FormFactory(4).defaultBottomSpace('4px')
var command = new CommandFactory()
var column = new ColumnFactory()

export default {
  name: 'person',
  data () {
    return {
      person: new Person(),
      table: new PersonService().createPersons(100),

      // *******  Lister Configuration ***********/
      listerConfig: {
        columns: [
          column.create('Id').alignCenter().build(),
          column.create('First').build(),
          column.create('Second').build(),
          column.create('Paid').alignRight().build(),
          column.create('Nickname').build(),
          column.create('City').build(),
          column.create('Birthday').type('date').build()
        ],
        comands: [
          command.create('Copy').callback(() => this.$refs.myListPane.copySelectedRow()).build(),
          command.create('Delete').callback(() => this.$refs.myListPane.deleteSelectedRow()).build(),
          command.create('New').callback(() => this.$refs.myListPane.addRow(new Person())).build()
        ]
      },

      // *******  Editor Configuration ***********/
      editorConfig: {
        inputs: [
          form.newRow(),
          form.space().bottomSpace('10px').build(),
          form.newRow(),
          form.textInput('Id').span(4).build(),
          form.checkbox('Male').span(2).offset(-1).build(),
          form.dateInput('Date of Birth', 'birthday').build(),
          form.newRow(),
          form.hr('Adress').span(24).build(),
          form.textInput('First').build(),
          form.lookup('Second')
            .columns([column.create('Id').alignCenter().sort(false).build(),
              column.create('First').sort(false).build(),
              column.create('Second').sort(false).build()])
            .table(new PersonService().createPersons(10)).build(),
          form.newRow(),
          form.textInput('City').build(),
          form.textInput('Street').build(),
          form.textInput('Country').build(),
          form.hr('Other').span(24).build(),
          form.textInput('Income', 'paid').build(),
          form.newRow(),
          form.selectInput('Nickname')
            .table(new PersonService().createPersons(10)).build(),
          form.selectInput('Adress')
            .table(new AdressService().createAdresses(10)).build(),
          form.newRow(),
          form.textArea('Comment').span(24).build()

        ],
        commands: [
          command.create('Save').build(),
          command.create('Send').build(),
          command.create('Edit').secondClass().build()
        ]
      }
    }
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
    }
  },
  components: {
    ListPane,
    EditPane
  }
}
</script>

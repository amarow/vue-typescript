<template>
  <div id="app">
    <list-pane
      height="200px"
      width="100%"
      :table="table"
      :columns="listColumns"
      :onSelectionChanged="(row)=>selection=row"
      ref="myListPane"
    />
    <button-pane :commands="editorCommands"/>
    <edit-pane
      labelPosition="right"
      :gutter="30"
      :form="editorForm"
      :model="selection"
    />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { Command, Commands } from './api/Commands'
import { Columns } from '@/api/Columns'
import { Form , ComponentConfig} from '@/api/Form'
import { Person, PersonService } from './services/Person'
import { AdressService } from './services/Adress'

import ListPane from './components/ListPane.vue'
import EditPane from './components/EditPane.vue'
import ButtonPane from './components/ButtonPane.vue'
import Controller from './components/Controller'

  @Component({
    components: { ListPane, EditPane, ButtonPane }
  })
export default class App extends Controller<Person> {
    table = PersonService.createPersons(5);

    constructor () {
      super(new Person(1, ''))
    }

    get listPane (): ListPane<Person> {
      return (this.$refs.myListPane as ListPane<Person>)
    }

    get editorForm () {
      let form = Form.create()
      form.newRow()
        .space().withBottomSpace('10px')
      form.newRow()
        .textInput('Id').withSpan(4).build()
        .checkbox('Male').withSpan(2).withOffset(0).build()
        .dateInput('Date of Birth', 'birthday').withOffset(2).build()
      form.newRow()
        .hr('Adress').withSpan(24).build()
        .textInput('First').build()
        .lookup('Second')
        .withTable(PersonService.createPersons(10))
        .withColumns(Columns.create()
          .add('Id').center().build()
          .add('First').sort(false).build()
          .add('Second').sort(false).build())
        .withResultColumn('second')
      form.newRow()
        .textInput('City').build()
        .textInput('Street').build()
        .textInput('Country').build()
        .hr('Other').withSpan(24).build()
        .textInput('Income', 'paid').build()
      form.newRow()
        .selectInput('Nickname').withTable(PersonService.createPersons(10)).build()
        .selectInput('Adress').withTable(AdressService.createAdresses(10)).build()
      form.newRow()
        .textArea('Comment').withSpan(24).build()
      return form
    }

    get editorCommands (): Commands {
      return Commands.create()
        .createCommand('New').call(this.onNew).build()
        .addCommand(new CopyCommand('Copy', this)).build()
        .createCommand('Delete').call(this.onDelete).build()
        .createCommand('Maga').asSecondClass().call(this.onDelete).build()
    }

    get listColumns (): Columns {
      return Columns.create()
        .add('Id').center().build()
        .add('First').right().build()
        .add('Second').fixWidth().startWidth('10').build()
        .add('Paid').build()
        .add('Nickname').build()
        .add('City').build()
        .add('Birthday').build()
    }

    /**
     *
     */
    onNew () {
      this.listPane.addRow(PersonService.createPersons(1)[0], this.listPane.getRowIndex(this.selection))
    }

    onDelete () {
      this.listPane.removeRow(this.selection)
    }
}

/**************************************************
*  CopyCommand
**************************************************/
class CopyCommand extends Command {
    ctx!:App;

    constructor (label: string, controller: App) {
      super(label)
      this.ctx = controller
    }

    isDisabled (): boolean {
      return !this.ctx.hasSelection()
    }

    execute () {
      this.ctx.listPane.addRow(Object.assign({}, this.ctx.selection), this.ctx.listPane.getRowIndex(this.ctx.selection))
    }
}

</script>

<style>
  .el-select-dropdown__item {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .el-popover {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .el-date-picker {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .el-dropdown-menu__item {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  #app {
    background: rgb(250, 250, 250);
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #header {
    overflow: hidden;
  }
</style>

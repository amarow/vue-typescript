<template>
    <el-popover placement="bottom" trigger="click" v-model="visible" visible-arrow="">
        <list-pane
                :table="table"
                :columns="columns"
                :filter-text="inputValue"
                @onSelectionChanged="listSelectionChanged"
        />
        <el-input slot="reference" v-model="inputValue" prefix-icon="el-icon-search" placeholder="search"/>
    </el-popover>
</template>

<script lang="ts">
import ListPane from './ListPane.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Columns } from '@/mixins/Columns'

    @Component({
      components: { ListPane }
    })
export default class ProxyField<T> extends Vue {
        @Prop() table: any;
        @Prop() columns!: Columns;
        @Prop() value!: T;

        private _inputValue = '';
        visible = false;

        listSelectionChanged (selection: T) {
          if (selection) {
            this._inputValue = selection.guiRep()
            this.visible = false
          }
        }

        get inputValue (): string {
          return this._inputValue
        }

        set inputValue (value: string) {
          this._inputValue = value
          this.$emit('input', value)
        }
}

</script>

<style>
    .el-popover {
        padding: 0px;
    }
</style>

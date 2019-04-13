<template>
    <el-popover placement="bottom" trigger="click" v-model="visible" visible-arrow="">
        <list-pane
                :table="table"
                :columns="columns"
                :filter-text="inputValue"
                :onSelectionChanged="listSelectionChanged"
        />
        <el-input slot="reference" v-model="inputValue" prefix-icon="el-icon-search" placeholder="search"/>
    </el-popover>
</template>

<script lang="ts">
import ListPane from './ListPane.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Columns } from '@/api/Columns'

@Component({
  components: { ListPane }
})
export default class ProxyField<T> extends Vue {
        @Prop() table: any;
        @Prop() columns!: Columns;
        @Prop() value!: T;
        @Prop() valueColumn!: string;

        myInputValue = '';
        visible = false;

        listSelectionChanged (selection: T) {
          if (selection) {
            this.inputValue = selection[this.valueColumn]
          }
          this.visible = false
        }

        get inputValue (): string {
          return this.myInputValue
        }

        set inputValue (value: string) {
          this.myInputValue = value
          this.$emit('input', value)
        }
}

</script>

<style>
    .el-popover {
        padding: 0px;
    }
</style>

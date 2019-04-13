<template>
    <div class="a-listpane" :style="'width:'+width">
        <el-table
                v-loading="isLoading()"
                :data="getData()"
                :height="height"
                size="mini"
                fit
                border
                highlight-current-row
                @current-change="setSelection"
                ref="tableView"
        >
            <el-table-column
                    v-for="column in columns.getColumns()"
                    :key="column.key"
                    :prop="column.key"
                    :label="column.label"
                    :resizable="column.resizeable"
                    :align="column.align"
                    :sortable="column.sortable"
                    :formatter="cellFormatter"
            ></el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Table } from 'element-ui'
import { Columns } from '@/api/Columns'

    @Component
export default class ListPane<T> extends Vue {
        @Prop() table!: T[];
        @Prop() columns!: Columns;
        @Prop() height!: string;
        @Prop() width!: string;
        @Prop() filterText!: string;
        @Prop() onSelectionChanged!: Function;

        get listView (): Table {
          return (this.$refs.tableView as Table)
        }

        addRow (row: T, index: number) {
          this.table.splice(index, 0, row)
        }

        removeRow (row: T) {
          let index: number = this.table.indexOf(row)
          if (index >= 0) {
            this.table.splice(index, 1)
            this.listView.setCurrentRow(this.table[index])
          }
        }

        getRowIndex (row: T): number {
          return this.table.indexOf(row)
        }

        private getData (): T[] {
          if (this.table) {
            return this.table.filter(row => this.filterBySearchText(row))
          }
          return []
        }

        filterBySearchText (row: any): boolean {
          var pattern = this.filterText
          if (!pattern) {
            return true
          }
          var content
          var found = false
          pattern = pattern.toLowerCase()
          this.columns.getColumns().forEach(col => {
            content = row[col.key]
            if (typeof (content) === 'string') {
              if (content.toLowerCase().includes(pattern)) {
                found = true
              }
            }
          })
          return found
        }

        isLoading (): boolean {
          return false
        }

        setSelection (row: T) {
          if (this.onSelectionChanged) {
            this.onSelectionChanged(row)
          }
        }

        cellFormatter (row: any, col: any, val: any) {
          if (val instanceof Date) {
            return val.toLocaleDateString()
          }
          return val
        }
}
</script>

<style scoped>
    .el-table .cell {
        line-height: 12px;
    }
</style>

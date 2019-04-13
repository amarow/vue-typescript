<template>
    <div>
        <el-form :label-position="labelPosition" size="mini" :model="model">
            <el-row v-for="row in form.rows" :key="row.count" :gutter="gutter">
                <el-col v-for="config in row.configs" :span="config.span" :offset="config.offset" :key="config.key">
                    <el-form-item :label="config.getLabel()" :style="'margin-bottom:'+config.bottomSpace+';'"
                                  :label-width="config.getLabelWidth()">
                        <el-input v-if="config.type=='text'" v-model="model[config.key]"
                                  :placeholder="config.placeHolder"/>
                        <el-input v-if="config.type=='area'" v-model="model[config.key]" :placeholder="config.placeHolder"
                                  type="textarea"/>
                        <el-checkbox v-else-if="config.type=='boolean'" v-model="model[config.key]"
                                     :label="config.getCheckboxLabel()"/>
                        <proxy-field v-else-if="config.type=='lookup'" v-model="model[config.key]"
                                     :placeholder="config.placeHolder" :table="config.table" :columns="config.columns" :valueColumn="config.key"/>
                        <list-pane v-else-if="config.type=='list'" :table="config.table" :columns="config.columns"
                                   filter-text=""/>
                        <el-date-picker v-else-if="config.type=='date'" v-model="model[config.key]"
                                        :placeholder="config.placeHolder" style="width:100%;"/>
                        <el-select v-else-if="config.type=='select'" v-model="model[config.key]"
                                   :placeholder="config.placeHolder" filterable style="width:100%;">
                            <el-option v-for="row in config.table" :key="config.table.indexOf(row)" :label="row.guiRep()"
                                       :value="row.guiRep()"></el-option>
                        </el-select>
                        <hr v-else-if="config.type=='hr'"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script lang="ts">
import ProxyField from './ProxyField.vue'
import ListPane from './ListPane.vue'
import { Form } from '../api/Form'
import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component({
      components: { ListPane, ProxyField }
    })
export default class EditPane extends Vue {
        @Prop() model: any;
        @Prop() gutter!: number;
        @Prop() width!: string;
        @Prop() height!: string;
        @Prop() labelPosition!: string;
        @Prop() form!: Form;
}
</script>

<style>
    .el-input__inner {
        padding: 0 5px;
    }

    hr {
        height: 2px;
        background-color: #ccc;
        border: none;
        margin: 0.85em auto;
    }

</style>

<template>
    <div>
        <el-form :label-position="labelPosition" size="mini" :model="model">
            <el-row v-for="row in form.rows" :key="row.count" :gutter="gutter">
                <el-col v-for="input in row.configs" :span="input.span" :offset="input.offset" :key="input.key">
                    <el-form-item :label="input.getLabel()" :style="'margin-bottom:'+input.bottomSpace+';'"
                                  :label-width="input.getLabelWidth()">
                        <el-input v-if="input.type=='text'" v-model="model[input.key]"
                                  :placeholder="input.placeHolder"/>
                        <el-input v-if="input.type=='area'" v-model="model[input.key]" :placeholder="input.placeHolder"
                                  type="textarea"/>
                        <el-checkbox v-else-if="input.type=='boolean'" v-model="model[input.key]"
                                     :label="input.getCheckboxLabel()"/>
                        <proxy-field v-else-if="input.type=='lookup'" v-model="model[input.key]"
                                     :placeholder="input.placeHolder" :table="input.table" :columns="input.columns"/>
                        <list-pane v-else-if="input.type=='list'" :table="input.table" :columns="input.columns"
                                   filter-text=""/>
                        <el-date-picker v-else-if="input.type=='date'" v-model="model[input.key]"
                                        :placeholder="input.placeHolder" style="width:100%;"/>
                        <el-select v-else-if="input.type=='select'" v-model="model[input.key]"
                                   :placeholder="input.placeHolder" filterable style="width:100%;">
                            <el-option v-for="row in input.table" :key="input.table.indexOf(row)" :label="row.guiRep()"
                                       :value="row.guiRep()"></el-option>
                        </el-select>
                        <hr v-else-if="input.type=='hr'"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script lang="ts">
import ProxyField from './ProxyField.vue'
import ListPane from './ListPane.vue'
import { Form } from '../mixins/Form'
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

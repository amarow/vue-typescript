<template>
    <div class="a-buttonbar" :style="'width:'+width">
        <el-row v-if="!commands.isEmpty()">
            <el-col class="a-buttons">
                <el-dropdown v-if="commands.hasSecondClassCommands()" size="mini" @command="emitCommand">
                    <el-button class="el-dropdown-link" size="mini" style="margin-right:4px;">More</el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="command in commands.getSecondClassCommands()" :key="command.id"
                                          :disabled="command.isDisabled()" :command="command">{{command.label}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button v-for="command in commands.getFirstClassCommands()" :key="command.id"
                           :disabled="command.isDisabled()" size="mini" @click="emitCommand(command)">{{command.label}}
                </el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { Commands, Command } from '../mixins/Commands'
import { Component, Prop, Vue } from 'vue-property-decorator'

    @Component
export default class ButtonPane extends Vue {
        @Prop() commands!: Commands;
        @Prop() width!: string;

        emitCommand (command: Command) {
          command.execute()
        }
}
</script>

<style scoped>
    .a-buttons {
        text-align: end;
    }

    .el-button + .el-button {
        margin-left: 2px;
    }

    .a-buttonbar {
        padding: 2px;
        padding-r: 10px;
    }
</style>

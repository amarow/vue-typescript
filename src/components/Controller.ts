import Vue from 'vue'

export default class Controller<T> extends Vue {
    private aSelection!: T;
    private selected = false;

    constructor (def: T) {
      super()
      this.aSelection = def
    }

    set selection (selection: T) {
      this.aSelection = selection
      this.selected = true
    }

    get selection (): T {
      return this.aSelection
    }

    hasSelection (): boolean {
      return this.selected
    }
}

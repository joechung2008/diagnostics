import { config as vtConfig } from "@vue/test-utils"
import { defineComponent, h, computed } from "vue"

// Minimal patch for MutationObserver used by Element Plus internals when running
// tests in the happy-dom environment. Some implementations can trigger errors
// accessing private fields; provide a safe noop implementation for tests.
class MockMutationObserver {
  #destroyed = false
  callback: MutationCallback
  constructor(callback: MutationCallback) {
    this.callback = callback
  }
  disconnect() {
    ;(() => this.#destroyed)() // tag to avoid unused field error
  }
  observe() {}
  takeRecords() {
    return []
  }
}

globalThis.MutationObserver = MockMutationObserver

// Configure Vue Test Utils global settings
vtConfig.global = vtConfig.global || {}
vtConfig.global.plugins = vtConfig.global.plugins || []
vtConfig.global.stubs = vtConfig.global.stubs || {}

// Make Vue Composition API available globally for unit tests
if (typeof globalThis !== "undefined") {
  ;(globalThis as unknown as { computed: typeof computed }).computed = computed
}

// Create simple stubs for Element Plus components that render predictable
// HTML for assertions in tests.
const ElTable = defineComponent({
  props: { data: { type: Array, default: () => [] } },
  setup(props) {
    return () =>
      h(
        "div",
        { class: "el-table" },
        props.data.map((row: unknown) =>
          h("div", { class: "el-table-row" }, JSON.stringify(row))
        )
      )
  }
})

const ElTableColumn = defineComponent({
  props: { prop: String, label: String },
  setup() {
    // table-column will be represented implicitly by the rows above; nothing
    // to render here.
    return () => null
  }
})

const ElButton = defineComponent({
  emits: ["click"],
  setup(_, { slots, emit }) {
    return () =>
      h(
        "button",
        { onClick: (e: Event) => emit("click", e) },
        slots.default?.()
      )
  }
})

// Stub for Configuration component
const Configuration = defineComponent({
  setup() {
    return () => h("h2", {}, "Configuration")
  }
})

// Stub for StageDefinition component
const StageDefinition = defineComponent({
  setup() {
    return () => h("h2", {}, "Stage Definitions")
  }
})

vtConfig.global.stubs = {
  "el-table": ElTable,
  "el-table-column": ElTableColumn,
  "el-button": ElButton,
  Configuration: Configuration,
  StageDefinition: StageDefinition
}

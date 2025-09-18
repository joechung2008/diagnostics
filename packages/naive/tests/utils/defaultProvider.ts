import { ref, shallowRef } from "vue"

// Provide a minimal but reactive n-config-provider mock that matches the
// shape Naive UI expects. Some Naive internals access .value on refs coming
// from the provider (e.g. mergedThemeRef, mergedClsPrefixRef). Providing
// these reactive refs prevents runtime TypeErrors in unit tests.
const inlineThemeDisabled = ref(false)
const mergedBorderedRef = shallowRef(true)
const mergedClsPrefixRef = shallowRef("n")
const mergedComponentPropsRef = shallowRef({})
const mergedRtlRef = shallowRef(false)
const mergedThemeOverridesRef = shallowRef({})
const mergedThemeRef = shallowRef({})

export default {
  "n-config-provider": {
    inlineThemeDisabled,
    mergedBorderedRef,
    mergedClsPrefixRef,
    mergedComponentPropsRef,
    mergedRtlRef,
    mergedThemeOverridesRef,
    mergedThemeRef,
    preflightStyleDisabled: false,
    styleMountTarget: undefined
  }
}

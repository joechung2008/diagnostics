import { config } from '@vue/test-utils'
import ResizeObserver from 'resize-observer-polyfill'
import vuetify from '../plugins/vuetify'

// Provide Vuetify globally for all tests
config.global.plugins = [vuetify]

// Mock ResizeObserver to avoid errors in tests
global.ResizeObserver = ResizeObserver

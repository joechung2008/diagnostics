import { beforeEach } from "vitest"
import { cleanup } from "@testing-library/vue"

import "@testing-library/jest-dom/vitest"

// cleanup DOM after each test
beforeEach(() => {
  cleanup()
})

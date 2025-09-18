import '@testing-library/jest-dom/vitest';

// Minimal no-op ResizeObserver for tests (UI not focused on responsive rendering)
class NoopResizeObserver {
	observe() {
		// no-op
	}
	unobserve() {
		// no-op
	}
	disconnect() {
		// no-op
	}
}

globalThis.ResizeObserver = globalThis.ResizeObserver ?? NoopResizeObserver;

// Minimal matchMedia mock
if (!globalThis.matchMedia) {
	globalThis.matchMedia = (query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: () => {},
		removeListener: () => {},
		addEventListener: () => {},
		removeEventListener: () => {},
		dispatchEvent: () => false
	});
}

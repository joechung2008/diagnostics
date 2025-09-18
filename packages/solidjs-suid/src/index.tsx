// @refresh reload
import { render } from "solid-js/web";
import ThemedApp from "./ThemedApp";
import reportWebVitals from "./reportWebVitals";

render(() => <ThemedApp />, document.getElementById("root")!);

reportWebVitals(console.log);

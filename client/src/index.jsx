import App from "./App";
import { createRoot } from "react-dom/client";

const dom = document.querySelector("#root");
const root = createRoot(dom);
root.render(<App />);
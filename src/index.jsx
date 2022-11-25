import {createRoot} from "react-dom/client"

// PAGES
import App from "./pages/App";
import "bulma/css/bulma.css";
import "./styles/index.scss";

const root = createRoot(document.getElementById("root"));
root.render(<App />);

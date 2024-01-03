import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./features/store";
import ProgressComponent from "./components/ProgressComponent/ProgressComponent";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ProgressComponent />
    <App />
  </Provider>
);

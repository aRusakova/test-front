import ReactDOM from "react-dom/client";
import App from "./components/app/app.tsx";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./services/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

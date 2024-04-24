import ReactDOM from "react-dom/client";
import App from "./components/app/app.tsx";
import "./index.scss";
// import { Provider } from "react-redux";
// import store from "./services/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

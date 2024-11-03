import store from "./store/store";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { router } from "./routes/router";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";

import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <StrictMode> */}
      <RouterProvider router={router} />
    {/* </StrictMode> */}
  </Provider>
);

reportWebVitals();

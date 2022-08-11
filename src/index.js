import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.js";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./styles/theme";
import Login from "./pages/login";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <App />
      {/* <Login /> */}
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "./styles/theme";
import { FilterProvider } from "./contexts/FilterContext.jsx";
import { Header } from "./components/Header.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <FilterProvider>
      <ChakraProvider theme={theme}>
        <React.StrictMode>
          <App />

          {/* <SignIn /> */}
          <ToastContainer />
        </React.StrictMode>
      </ChakraProvider>
    </FilterProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

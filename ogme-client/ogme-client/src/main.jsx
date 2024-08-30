import React from "react";
import ReactDom from "react-dom/client";
import "./styles/app.scss";
import App from "./App";
import TabletProvider from "./context/TabletContext";
import WishCountProvider from "./context/WishCountContext";
import MobileProvider from "./context/MobileContext";
import IslogedInProvider from "./context/IsLogedIn";
import ErrorBoundary from "./context/ErrorBoundary";

ReactDom.createRoot(document.getElementById("root")).render(
  //My Contexts
  <React.StrictMode>
    <ErrorBoundary>
      <IslogedInProvider>
        <WishCountProvider>
          <TabletProvider>
            <MobileProvider>
              <App />
            </MobileProvider>
          </TabletProvider>
        </WishCountProvider>
      </IslogedInProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
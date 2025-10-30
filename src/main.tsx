import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./main.css";
import { Provider } from "react-redux";
import { store, persistor } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { DarkModeConfigProvider } from "@/layout/default/components/action/DarkModeSwitch";
import { ThemeColorConfigProvider } from "@/layout/default/components/action/ThemeColor";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <PersistGate loading={ null }
                   persistor={ persistor }>
        <DarkModeConfigProvider>
          <ThemeColorConfigProvider>
            <ConfigProvider theme={ {
              components: {
                Card: {
                  extraColor: "#050E1F",
                }
              }
            } }
                            locale={ zhCN }>
              <App />
            </ConfigProvider>
          </ThemeColorConfigProvider>
        </DarkModeConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

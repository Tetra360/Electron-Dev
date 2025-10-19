import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { mockServer } from "./api/mock";
import "./index.css";

// モックサーバーを初期化
mockServer
  .initialize()
  .then(() => {
    console.log("モックサーバーが初期化されました");
  })
  .catch((error) => {
    console.error("モックサーバーの初期化に失敗しました:", error);
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});

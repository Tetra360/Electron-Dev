import { app, BrowserWindow } from "electron";
// import { createRequire } from "node:module"
import path from "node:path";
import { fileURLToPath } from "node:url";

// __dirnameを取得（ESM環境用）
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ビルド後のディレクトリ構成
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// Viteのdefineプラグイン対策（Vite@2.x用）
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

// 開発サーバーが有効な場合はpublic、それ以外はdistを公開ディレクトリに設定
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// メインウィンドウの参照
let win: BrowserWindow | null;

// メインウィンドウを作成する関数
function createWindow() {
  win = new BrowserWindow({
    width: 1200, // ウィンドウの初期幅
    height: 800, // ウィンドウの初期高さ
    minWidth: 800, // ウィンドウの最小幅
    minHeight: 600, // ウィンドウの最小高さ
    autoHideMenuBar: true, // メニューバーを自動で非表示
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"), // アイコン設定
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"), // プリロードスクリプト
    },
  });

  // レンダラープロセスにメッセージを送信（ロード完了時）
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // 開発サーバーが有効ならURLをロード、そうでなければビルド済みHTMLをロード
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// すべてのウィンドウが閉じられた時の処理（macOS以外はアプリ終了）
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

// アプリがアクティブになった時の処理（macOS用：ウィンドウがなければ再作成）
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// アプリの初期化完了時にウィンドウを作成
app.whenReady().then(createWindow);

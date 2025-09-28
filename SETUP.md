# Vite+Electron+Reactの環境構築手順

## 目次

1.  [概要](#概要)
2.  [技術スタック](#技術スタック)
3.  [前提条件のインストール](#1-前提条件のインストール)
4.  [プロジェクト作成](#2-プロジェクト作成)
5.  [CSSライブラリ環境構築](#3-cssライブラリ環境構築)
6.  [VSCode設定](#4-vscode設定)
7.  [Git設定](#5-git設定)
8.  [コードフォーマッタ (ESLint + Prettier)](#6-コードフォーマッタ-eslint--prettier)
9.  [コミット時の自動フォーマット (Husky + lint-staged)](#7-コミット時の自動フォーマット-husky--lint-staged)
10. [ビルド](#8-ビルド)

## 概要

このマニュアルは、**Vite + Electron + React**
をベースにしたデスクトップアプリケーション開発環境の構築手順をまとめたものである。

**メリット:**

- 高速開発: Vite によるホットリロード
- クロスプラットフォーム対応: Electron による Windows / macOS / Linux
- 開発効率の向上: Tailwind + shadcn/ui による UI 開発効率化
- チーム開発に最適: ESLint + Prettier + Husky による規約統一

## 技術スタック

- **Electron + Vite**: デスクトップアプリ基盤
- **React**: UI ライブラリ
- **Tailwind CSS**: ユーティリティファーストなスタイル
- **shadcn/ui**: コンポーネントライブラリ
- **ESLint + Prettier**: コードフォーマッタ
- **Husky + lint-staged**: コミット時の自動フォーマット

## 1. 前提条件のインストール

📖 参考: [Node.js 公式サイト](https://nodejs.org/)

- Node.js (最新版推奨、LTSでも可)

<br>

## 2. プロジェクト作成

📖 参考: [Vite 公式ドキュメント](https://ja.vite.dev/guide/)

### 2-1. 新規プロジェクト作成

```bash
npm create electron-vite@latest my-app
```

---

### 2-2. ViteオプションでReactを選択

- √ Project template: » React

---

### 2-3. プロジェクトへ移動

```bash
cd my-app
```

---

### 2-4. 依存関係のインストール

```bash
npm install
```

---

### 2-5. 非推奨（deprecated）パッケージへの対応

バージョンによる脆弱性警告メッセージが出た場合、バージョンを更新

**Electronを最新の安全なバージョンに更新**

```bash
npm install -D electron@latest
```

**Viteを最新版に更新（esbuildも一緒に更新される）**

```bash
npm install -D vite@latest
```

`found 0 vulnerabilities` が出れば成功

---

### 2-6. アプリケーション起動

```bash
npm run dev
```

<br>

## 3. CSSライブラリ環境構築

### 3-1. TailwindCSS と shadcn/ui 導入

shadcn/uiの公式ドキュメントをもとにshadcn/uiとTailwind CSS の環境構築を行う。

**参考ドキュメント:**

- 📖 [shadcn/ui 公式ドキュメント](https://ui.shadcn.com/docs/installation/vite)
- 📖 [Tailwind CSS公式サイト](https://tailwindcss.com/docs/installation)

---

### 3-2. 動作テスト

**`src/index.css` を書き換える（テンプレートのスタイリングを削除）**

```css
@import "tailwindcss";
```

**`src/App.tsx` を書き換える**

shadcn/uiのコンポーネント(Buttonのみ)を描画

```tsx
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button>Click me</Button>
    </div>
  );
}

export default App;
```

shadcn/uiのコンポーネント(Button,Input,Select)を描画

> shadcn/ui の公式ドキュメントで他の部品の実装方法を確認してください

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function App() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* ボタンとセレクトを縦方向に並べる */}
        <Button className="px-8 py-4 text-lg">Click me</Button>
        <Input />
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default App;
```

`src/App.css`はTailwindCSSを使用する場合不要

---

### 3-3. CSS の互換性を自動で確保するパッケージのインストール

> ⚠️ Electronのみでの運用の場合不要

```bash
npm install -D postcss autoprefixer
```

**パッケージの役割:**

**postcss**

- CSS を読み込んで変換するための仕組み
- autoprefixer のようなプラグインと併用して使用

**autoprefixer**

- 古いブラウザにも対応させるPostCSS のプラグイン
- モダンな CSS の記述でも、自動でプレフィックスを付与することで古い記述にも変換して対応

<br>

## 4. VSCode設定

このプロジェクトでは、開発環境を統一するために VS Code のワークスペース設定を導入している。
`.vscode/` フォルダを用意し、以下の2つのファイルを作成する。

### 4-1 開発環境に必要なVSCodeの設定

`.vscode/settings.json`を作成。これにより、共通のVSCode環境設定を構築できる。

```json
{
  // -------------------------
  // エディタ全般
  // -------------------------

  // ファイルを自動保存（遅延付き）
  "files.autoSave": "afterDelay",

  // 保存時に自動フォーマット
  "editor.formatOnSave": true,

  // 保存時に ESLint で自動修正 + Import 整理
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit"
  },

  // インデント設定
  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  // 末尾の余分なスペースを保存時に削除
  "files.trimTrailingWhitespace": true,

  // ファイル末尾に改行を追加
  "files.insertFinalNewline": true,

  // 不要な改行を削除
  "files.trimFinalNewlines": true,

  // -------------------------
  // フォーマッタ設定
  // -------------------------
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // -------------------------
  // Tailwind CSS 補完対応
  // -------------------------
  "tailwindCSS.experimental.classRegex": [
    "clsx\\(([^)]*)\\)",
    "cva\\(([^)]*)\\)",
    "cn\\(([^)]*)\\)"
  ]
}
```

---

### 4-2 開発環境に必要なVSCode拡張機能の設定

`.vscode/extensions.json` を作成。この設定によりプロジェクトを開くと、必要な拡張機能を入れるためのポップアップが出現し、自動インストールができる。

```json
{
  "recommendations": [
    // ------ コード品質・フォーマット ------
    "esbenp.prettier-vscode", // コードフォーマット
    "dbaeumer.vscode-eslint", // ESLint
    "bradlc.vscode-tailwindcss", // Tailwind CSS IntelliSense

    // ------ UI・操作性向上 ------
    "ms-ceintl.vscode-language-pack-ja", // 日本語言語パック
    "pkief.material-icon-theme", // マテリアルアイコン
    "oderwat.indent-rainbow", // インデント色分け
    "usernamehw.errorlens", // エラー表示強化
    "mosapride.zenkaku" // 全角文字検出
  ]
}
```

<br>

## 5. Git設定

### 5-1 Gitのコミット対象ファイル設定

`.gitignore` を修正して、適切なファイルをコミット対象から除外する。

**設定内容:**

- `.vscode` をコミット対象に追加（チーム開発環境の統一）
- Electronのビルドフォルダをコミット対象から除外

```.gitignore
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
# .vscode/*
# !.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Electron build artifacts
/out
/build
/release
/dist-electron
```

---

### 5-2 Gitの設定

`.gitconfig` を作成。プロジェクト固有のGit設定を行う。

**設定内容:**

- コミットメッセージのテンプレート
- ブランチ命名規則
- フック設定

```.gitconfig
[core]
    # 改行コードの自動変換を無効化（LF統一）
    autocrlf = false
    # 改行コードの安全性チェックを有効化
    safecrlf = true

[init]
    # デフォルトブランチ名をmainに設定
    defaultBranch = main

[push]
    # プッシュのデフォルト動作をsimpleに設定
    default = simple

[alias]
    # よく使うコマンドの短縮形を定義
    st = status          # git status
    co = checkout        # git checkout
    br = branch          # git branch
    ci = commit          # git commit
    unstage = reset HEAD --  # ステージングの取り消し
    last = log -1 HEAD   # 最新のコミット情報を表示
    visual = !gitk      # Git GUIを起動
```

<br>

## 6. コードフォーマッタ (ESLint + Prettier)

### 6-1 コードの品質と一貫性を保つためツールのインストール

```bash
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y
```

**インストールするパッケージ:**

- **eslint**: JavaScript/TypeScriptの静的解析ツール
- **prettier**: コードフォーマッタ
- **eslint-config-prettier**: ESLintとPrettierの競合を回避
- **eslint-plugin-react**: React用のESLintルール
- **eslint-plugin-react-hooks**: React Hooks用のESLintルール
- **eslint-plugin-jsx-a11y**: アクセシビリティ用のESLintルール

---

### 6-2 ESLintの設定ファイルの修正

既存の`.eslintrc.cjs` を修正。この設定により、コードの品質と一貫性を保つ。

**主な設定内容:**

- TypeScript対応
- React Hooks対応
- ダブルクォート統一

```cjs
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "dist-electron"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // 追記：ダブルクォートで統一
    quotes: ["error", "double", { avoidEscape: true }],
  },
};
```

---

### 6-3 Prettierの設定ファイル作成

`.prettierrc`を作成する。この設定により、コードの自動フォーマットが統一される。

**設定内容:**

- 文末にセミコロンを必ず付ける
- ダブルクォートで統一
- JSX でもダブルクォート
- 配列やオブジェクトの最後にカンマを付ける（es5準拠）
- 1行の最大文字数（デフォルト 80 → 少し広め）
- インデント幅はスペース2つ
- インデントにタブは使わない
- オブジェクトリテラルの波括弧の内側にスペースを入れる { foo: bar }
- JSX の閉じタグは改行して書く
- アロー関数の引数が1つでも () を付ける (x) => {}
- 改行コードを LF に統一（Gitとの互換性が高い）

```json
{
  "semi": true,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

📖 参考: [ESLint 公式サイト](https://eslint.org/) /
[Prettier公式サイト](https://prettier.io/)

<br>

## 7. コミット時の自動フォーマット (Husky + lint-staged)

### 7-1 コミット時の自動フォーマットを設定するためのツールをインストール

```bash
npm install -D husky lint-staged
```

**ツールの役割:**

- **Husky**: コミット直前に ESLint や Prettier を実行するためのツール
- **lint-staged**: ステージングされたファイル（`git add` 済みのファイル）だけに対して Linter や Formatter を実行するツール

**設定の目的:**

- コミット前に自動的にコードフォーマットを実行
- チーム開発でのコード品質統一
- 手動でのフォーマット作業を削減

---

### 7-2 Husky 初期化

`.husky/_`と`.husky/precommit`を作成

```bash
npx husky init
```

---

### 7-3 Huskyでのフック設定

`.husky/pre-commit` を修正して、コミット前の自動フォーマットを設定する。

```bash
#!/usr/bin/env sh

echo "✅ pre-commit hook is running!"
npx lint-staged

```

シェルスクリプトに権限付与

```bash
chmod +x .husky/pre-commit
```

`package.json` に lint-staged の設定を追記する。

```json
"scripts": {
  "prepare": "husky"
},
"lint-staged": {
	"*.{js,ts,jsx,tsx}": [
		"eslint --fix",
		"prettier --write"
	]
},
```

📖 参考: [Husky 公式サイト](https://typicode.github.io/husky/) /
[lint-staged 公式サイト](https://github.com/okonet/lint-staged)

<br>

## 8. ビルド

本番用のアプリケーションをビルドする。

```bash
npm run build
```

**ビルド結果:**

- `dist/` フォルダにビルドされたファイルが生成される
- Electronアプリケーションとして実行可能な状態になる

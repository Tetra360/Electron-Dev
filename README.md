# Electron + React + TypeScript + Vite テンプレート

このリポジトリは、**Electron + React + TypeScript + Vite** をベースにしたデスクトップアプリケーション開発環境の構築済みテンプレートです。

## 技術スタック

- **Electron + Vite**: デスクトップアプリ基盤
- **React**: UI ライブラリ
- **TypeScript**: 型安全な開発
- **Tailwind CSS**: ユーティリティファーストなスタイル
- **shadcn/ui**: コンポーネントライブラリ
- **ESLint + Prettier**: コードフォーマッタ
- **Husky + lint-staged**: コミット時の自動フォーマット

## 主な機能

- 高速開発: Vite によるホットリロード
- クロスプラットフォーム対応: Electron による Windows / macOS / Linux
- 開発効率の向上: Tailwind + shadcn/ui による UI 開発効率化
- チーム開発に最適: ESLint + Prettier + Husky による規約統一
- 型安全: TypeScript による型チェック
- 自動フォーマット: 保存時・コミット時の自動コードフォーマット

## セットアップ

### 前提条件

- Node.js (最新版推奨、LTSでも可)

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev
```

### 利用可能なコマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 詳細な環境構築手順

詳細な環境構築手順については、[SETUP.md](./SETUP.md) を参照してください。

## UI コンポーネント

このテンプレートには以下の shadcn/ui コンポーネントが含まれています：

- Button
- Input
- Select

追加のコンポーネントが必要な場合は、shadcn/ui の公式ドキュメントを参照してください。

## 開発環境

- **VSCode**: 推奨エディタ
- **拡張機能**: 自動インストール設定済み
- **フォーマット**: ESLint + Prettier による自動フォーマット
- **Git**: Husky によるコミット前自動フォーマット

## 参考リンク

- [Electron 公式サイト](https://www.electronjs.org/)
- [Vite 公式ドキュメント](https://ja.vite.dev/guide/)
- [React 公式サイト](https://react.dev/)
- [Tailwind CSS 公式サイト](https://tailwindcss.com/)
- [shadcn/ui 公式ドキュメント](https://ui.shadcn.com/)

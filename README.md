# 開発環境

## Usage

### Node version

＊ [asdf](https://asdf-vm.com/guide/getting-started.html) 推奨

[.tool-versions](./.tool-versions) 確認

```shell
asdf current
```

＊ [package.json](./package.json) `engines` section を確認・編集。

＊ 推奨設定：`.npmrc` - `--engine-strict` を設定。  
異なるバージョンでのインストールができなくなる

@see [package.json に"engines"を設定すると「このバージョンの Node.js でしか動かない」を表明できる](https://qiita.com/suin/items/994458418c737cc9c3e8)

＊ 画像圧縮 `squoosh` webpack plugin が Node v16 までしか対応していない(2023/02/28 現在)ため Fix するまでアップグレードしない。

### Install

```shell
npm install
```

or

```shell
yarn install
```

### Start

```shell
npm start
```

or

```shell
yarn start
```

### ビルド

```shell
npm run build
```

or

```shell
yarn build
```

`htdocs` 出力

Notion: [Github Actions を使用した自動デプロイ](https://www.notion.so/-parachute-/Github-Actions-a80d33a4fea8476ea5d75ad9c69bea2e?pvs=4)

## 技術

### Directory - 階層

- src - 開発ファイル
- public - 提供ファイル
- src-babels - JS(babel)開発
- src-scss - scss ライブラリ

- htdocs - ビルドファイル出力

### 対応ブラウザ

[package.json](./package.json) `browserslist` section を確認・編集。

`> 0.2% and not dead`

@see [Browserslist](https://browsersl.ist/#q=%3E+0.2%25+and+not+dead)

### CSS

`.scss` 推奨 - [sass](https://sass-lang.com/dart-sass) dart-sass 使用。

[Sass basics](https://sass-lang.com/guide)

`@import` deprecated 変わりに `@use` 使用...

### JavaScript

[babel](https://babeljs.io/)

[css-modules](https://github.com/css-modules/css-modules) 使用可能 - ファイル名 `*.module.scss`

### SSI

使用可能 - default off

必要な時は [webpack.config.dev.js](scripts/webpack.config.dev.js) を編集。

    // new HtmlWebpackSSIPlugin({ baseDir: settings.directory.public }),

## Option

### コードフォーマット

[prettier](https://prettier.io/)

コミット時に `lint-staged` によりフォーマッターが走ります。

以下設定を準備します。

#### 1.file 作成

`.husky` directory へ `pre-commit` file 作成

#### 2.書込む

```code
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint-staged
```

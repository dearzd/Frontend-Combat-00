# Single Spa Article

简单的演示请看下面 **Gif 演示**

## 简介

- 项目包含三个 app，其中，root-config 是主 app，sidebar 和 content 是两个子 app。都是基于 `React` 实现。
- root-config 中包含了 app 的公用资源，以及 single-spa 的配置信息。
  在 `./root-config/src/index.ejs` 里 使用 `SystemJS` import 了两个子 app。
  root-config 打包会生成 `article-root-config.js`。
- sidebar 是左侧文章列表。sidebar 打包会生成 `article-sidebar.js`。
- content 是右侧文章详细内容。content 打包会生成 `article-content.js`。
- 文章没有后端 server，在 `./content/src/data.json` 里 fake 了一些 demo 数据。

## 运行

- `cd week4/single-spa-article`
- 分别到 `root-config`, `sidebar`, `content` 执行 `yarn install`
- 分别到 `root-config`, `sidebar`, `content` 执行 `yarn start`
- `go to http://localhost:9000/`

## Gif demo

![Gif Demo](./demo.gif)

# v if template implementation

1. 实现 v-if 功能的代码主要在 `./engine.js:70 - 78` 行，
其余代码基本是 copy 自老师的项目。
1. `./entine.js`的 `parseNodeToDom` 函数里的 `stack` 改为 `queue` 修复了老师上节课遗留的 `dom` 顺序不对的问题。

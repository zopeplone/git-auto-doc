# 快速开始
## 初始化
在存放了.git的文件夹运行命令,会生成一个配置文件`auto-doc.config.json`
```sh
npx git-auto-doc
```
::: tip
运行该命令前，可以先安装`husky`，来让每次提交后自动执行生成文档
若不安装husky，则需要每次在`git commit`后自己运行命令 `npx git-auto-doc commit`
:::

## 提交
若已经安装husky后初始化，则在每次提交后都会自动触发 `npx git-auto-doc commit` 
```sh
npx git-auto-doc commit
```
这个命令会检查`git log`的所有记录然后添加每个代码的文档并在文档内部添加所有该代码的commit信息
- 目录信息
```
.
├─ src
│  ├─ component
│      ├─ menu.js
│      └─ sidebar.js
├─ index.js
└auto-doc.config.json
```
- git提交信息
```
feat: 添加menu，sidebar，index.js
feat: 修改menu
```
则会生成
```
.
├─doc
│  ├─ src
│  │  ├─ component
│  │      ├─ menu.js.md
│  │      └─ sidebar.js.md
│  └─ index.js.md
├─ src
│  ├─ component
│      ├─ menu.js
│      └─ sidebar.js
├─ index.js
└auto-doc.config.json
```
其中menu.js.md
```
- feat: 添加menu，sidebar，index.js

- feat: 修改menu

```
sidebar.js.md
```
- feat: 添加menu，sidebar，index.js


```
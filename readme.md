# git-auto-doc

基于Git提交日志自动配置开发文档的工具，通过husky的githooks来检测git log日志自动化添加文档

1. 初始化
在与.git目录相同的位置运行命令
```
npx git-auto-doc
```
在运行此命令前可以先安装husky，如果不安装husky则需要每次在提交后使用命令
```
npx git-auto-doc commit
```
来自动配置开发文档

2. 配置
在初始化完成后会有一个auto-doc.config.json
exclude为排除的文件或文件夹，与.gitignore配置相同
docDir为你想存放文档的文件夹（默认为docs）
lastCommit为提交哈希值的缓存，上次运行`npx git-auto-doc commit` 后的最后的提交哈希值会被存入
- git提交代码后文档会自动更新，由开发者来编写开发文档中的内容，然后再次提交
- 在第二次只提交文档时，不会更新auto-doc.config.json，避免了每次提交后又有新文件需要提交
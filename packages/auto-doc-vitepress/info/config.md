# 配置
- git-auto-doc的配置文件为`auto-doc.config.json`
## exclude
`exclude`为配置不需要生成文档的目录或文件，其匹配规则与.gitignore相同
- 可参考 https://git-scm.com/docs/gitignore/zh_HANS-CN
## docDir
`docDir`为想要配置的文档目录地址，从根路径出发
## lastCommit
`lastCommit`为上次运行`npx git-auto-doc commit`后缓存的最后一次提交记录的哈希值
- 防止每次提交时都会检查所有`git log`，重复在文件中添加commit信息
- 在提交完代码后的第二次只提交文档时，不会更新auto-doc.config.json，避免了每次提交后又有新文件需要提交
#!/usr/bin/env node
const fs = require('fs')
const initial = require('../initial.config.json')
const { execSync } = require('child_process');
const ignore = require('ignore');



function init(){
  console.log('你好，这里是 auto-doc 包的初始化命令');
  //如果没有配置文件，则创建配置文件
  fs.writeFile('./auto-doc.config.json',JSON.stringify(initial,null,2) , (err) => {
    if(err){
      console.error('初始化配置文件失败')
    }else{
      console.log('初始化配置文件成功')
    }
  })
  fs.appendFile('./.husky/post-commit','npx git-auto-doc commit',(err)=>{
    if(err){
      console.error('添加 husky git hook 失败，请检查是否安装了 husky\n 若无自动化提交生成文档，请在每次提交完后手动执行 npx git-auto-doc commit')
    }else{
      console.log('添加 git hook 成功')
    }
  })
}
function commit(){
  console.log('你好，这里是 auto-doc 包的提交命令');
  const config =JSON.parse(fs.readFileSync('./auto-doc.config.json')) 
  const { lastCommit,docDir,exclude } = config
  //处理exclude
  const ig = ignore.default()
  ig.add([...exclude,docDir])
  //获取提交记录
  let commits = []
  console.log(lastCommit,'lastCommit')
  if(!lastCommit){
    //没有上次生成文档后的的git hash，将所有git提交记录都生成文档
    commits = execSync(`git log --pretty=format:"%H"`).toString().trim().split('\n');
  }
  else{
    //有上次生成文档后的的git hash，将上次提交之后的提交记录生成文档
    commits = execSync(`git log ${lastCommit}..HEAD --pretty=format:"%H"`).toString().trim().split('\n');
  }
  commits = commits.reverse()
  console.log(commits,'commits')
  commits.forEach((hash)=>{
    if(!hash){
      return;
    }
    const lines = execSync(`git show ${hash} --name-status --format=`).toString().trim().split('\n');
    const files = lines.map(line => {
      // 根据 --name-status 格式，第一列为状态（A, D, M），第二列为文件名
      const [status, file] = line.split(/\s+/);
      return { status, file };
    });
    // 根据file中的文件路径和exclude进行判定，判断是否需要生成文档
    files.forEach(({status,file})=>{
      if(ig.ignores(file)){
        return;
      }
      //获取提交的message
      const message = execSync(`git show -s --format=%s ${hash}`).toString().trim();
      //生成文档
      const filePath = file.split('/').slice(0,-1).join('/')
      const fileName = file.split('/').pop()
      fs.mkdirSync(`./${docDir}/${filePath}`,{ recursive: true },(err)=>{
        if(err){
          console.error(`生成文件夹失败`)
        }
      })
      fs.appendFileSync(`./${docDir}/${filePath}/${fileName}.md`, `- ${message} \n\n`,(err)=>{
        if(err){
          console.error(`生成文档 ${fileName}.md 失败`,err)
        }
      })
    })
    config.lastCommit = hash;
  })
  fs.writeFileSync('./auto-doc.config.json',JSON.stringify(config,null,2) , (err) => {
    if(err){
      console.error('更新配置文件失败')
    }else{
      console.log('更新配置文件成功')
    }
  })
}
const arg = process.argv[2];
if(arg === 'commit'){
  commit()
}
else init()

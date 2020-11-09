const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const request = require('request')
const log = content => console.log(chalk.green(content))

/* 判断文件是否存在的函数
  *@path_way, 文件路径
  */
const isFileExisted = function (path_way) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        reject(false)//"不存在"
      } else {
        resolve(true)//"存在"
      }
    })
  })
}

/**
 * 读取路径信息
 * @param {string} path 路径
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) {
        resolve(false);
      } else {
        resolve(stats);
      }
    })
  })
}

/**
 * 路径是否存在，不存在则创建
 * @param {string} dir 路径
 */
async function dirExists(dir){
  let isExists = await getStat(dir)
  //如果该路径且不是文件，返回true
  if(isExists && isExists.isDirectory()){
      return true
  }else if(isExists){     //如果该路径存在但是文件，返回false
      return false
  }
  //如果该路径不存在
  let tempDir = path.parse(dir).dir     //拿到上级路径
  //递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
  let status = await dirExists(tempDir)
  let mkdirStatus
  if(status){
      mkdirStatus = await mkdir(dir)
  }
  return mkdirStatus
}

/**
 * 创建路径
 * @param {string} dir 路径
 */
function mkdir(dir){
  return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
          if(err){
              resolve(false)
          }else{
              resolve(true)
          }
      })
  })
}

// 获取vue文件路径
const getGithubVueFile = async function() {
  let fileVueTemplate = []
  const dirFileUrl = path.resolve(__dirname, '../packages/src/template')
  const filesVue = fs.readdirSync(dirFileUrl)
  filesVue.forEach(item => {
    fileVueTemplate.push({
      name: item,
      value: {
        url: path.resolve(dirFileUrl, item)
      }
    })
  })
  return fileVueTemplate
}

// 获取js文件路径
const getGithubJsFile = async function() {
  let fileJsTemplate = []
  const dirFileUrl = path.resolve(__dirname, '../packages/src/utils')
  const filesJs = fs.readdirSync(dirFileUrl)
  filesJs.forEach(item => {
    fileJsTemplate.push({
      name: item,
      value: {
        url: path.resolve(dirFileUrl, item)
      }
    })
  })
  return fileJsTemplate
}

// 获取js文件路径
const getFileComponents = async function() {
  let fileComponentsTemplate = []
  const dirFileUrl = path.resolve(__dirname, '../packages/src/components')
  const filesJs = fs.readdirSync(dirFileUrl)
  filesJs.forEach(item => {
    fileComponentsTemplate.push({
      name: item,
      value: {
        url: path.resolve(dirFileUrl, item)
      }
    })
  })
  return fileComponentsTemplate
}

// 交互式选择vue，js文件
const chooseVueFile = async function(file, type) {
  const fileTemplate = type === 'js' ? await getGithubJsFile() : await getGithubVueFile()
  // 交互式选择文件
  const res = await inquirer.prompt([{
    type:'list',
    name: 'fileTemplate',
    message: `please check ${type} template`,
    choices: () => {
      return fileTemplate
    },
    default: fileTemplate[0]
  }])
  // 读写文件
  // log(`选择的文件${JSON.stringify(res)}`)
  const {url} = res.fileTemplate
  const fileContent = fs.readFileSync(url, 'utf-8')
  // log(`选择的文件${JSON.stringify(fileContent)}`)
  fs.writeFileSync(file, fileContent)
}

// 交互式选择文件夹
const chooseFile = async function(file) {
  const fileTemplate = await getFileComponents()
  // 交互式选择文件
  const res = await inquirer.prompt([{
    type:'list',
    name: 'fileTemplate',
    message: `please check component template`,
    choices: () => {
      return fileTemplate
    },
    default: fileTemplate[0]
  }])
  // 读写文件
  log(`选择的文件${JSON.stringify(res)}`)
  const { url } = res.fileTemplate
  const urlSplit = url.split('components/')
  const readFileList = fs.readdirSync(url)
  const cloneFile = path.resolve(file, urlSplit[urlSplit.length - 1])
  // log(`cloneFile: ${cloneFile}`)
  const fullFile = await dirExists(cloneFile)
  readFileList.forEach(item => {
    // log(`fullFile: ${fullFile}`)
    // log(`item: ${item}`)
    const fileContent = fs.readFileSync(path.resolve(url, item), 'utf-8')
    const fileWrite = path.resolve(cloneFile, item)
    // log(`fileWrite: ${fileWrite}`)
    fs.writeFileSync(fileWrite, fileContent)
  })
  // log(`${url.split('components')}`)

  // const fileContent = fs.readFileSync(url, 'utf-8')
  // // log(`选择的文件${JSON.stringify(fileContent)}`)
  // fs.writeFileSync(file, fileContent)
}

module.exports = async name => {
  // 获取替换文件路径
  const replaceFile = path.resolve('./', name)
  // 获取url斜杠前面路径
  const preSplitFiles = replaceFile.substring(0, replaceFile.lastIndexOf('\/') + 1)
  // 获取url斜杠后面路径
  const endSplitFiles = replaceFile.substring(replaceFile.lastIndexOf('\/') + 1, replaceFile.length)
  const fileExtname = path.extname(endSplitFiles) // 判断文件后缀
  if (fileExtname) {
    const mkdirFile = await dirExists(preSplitFiles)
      switch (fileExtname) {
        case '.js':
          chooseVueFile(replaceFile, 'js')
          break;
        case '.vue':
          chooseVueFile(replaceFile, 'vue')
          break;
        default:
      }
    log(`mkdirFile: ${mkdirFile}`)
  } else {
    const mkdirFile = await dirExists(replaceFile)
    await chooseFile(replaceFile)
    log(`mkdirFile: ${mkdirFile}`)
  }
  // 获取url斜杠后面面路径
  log(`🗄️ replaceFile文件${replaceFile}`)
  log(`🗄️ preSplitFiles文件${preSplitFiles}`)
  log(`📃 endSplitFiles文件${endSplitFiles}`)
  log(`🗄️ 文件地址 ${path.resolve('./')}`)
  log(`🗄️ 文件后缀 ${fileExtname}`)
  log(`${__dirname}`)
  log(`${__filename}`)
}
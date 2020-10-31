const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const request = require('request')
const log = content => console.log(chalk.green(content))

// 查询文件夹及子文件里面.vue文件
const searchRecursive = function(dir, pattern) {
  var results = []

  fs.readdirSync(dir).forEach(function (dirInner) {
    dirInner = path.resolve(dir, dirInner)

    var stat = fs.statSync(dirInner)

    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner, pattern))
    }

    if (stat.isFile() && dirInner.endsWith(pattern)) {
      results.push(dirInner)
    }
  })

  return results
}

// 获取github上文件路径
const getGithubFile = function() {
  let fileVueTemplate = []
  return new Promise((resolve, reject) => {
    request({
      url: 'https://gitee.com/api/v5/repos/myreally/default-template/contents/src/template?ref=master'
    },
    function(err, response, body) {
      if(err) {
        log(`❌  获取gitee数据异常 ${err}`)
        reject(false)
      } else {
        JSON.parse(body).forEach(item => {
          fileVueTemplate.push({
            name: item.name,
            value: {
              url: item.url,
              branch: 'master'
            }
          })
        })
        resolve(fileVueTemplate)
      }
    })
  })

}

// const templates = [
//   {name: 'template-1', value: {url: 'https://template-1', branch: 'master'}},
//   {name: 'template-2', value: {url: 'https://template-2', branch: 'dev'}}
// ]
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

module.exports = async name => {
  log(`🔥 替换的模版：${name}`)
  // 获取列表
  // const pageList = searchRecursive('./src/pages', '.vue')

  // 获取替换文件路径
  const replaceFile = path.resolve('./', name)
  // 获取url斜杠前面路径
  const preSplitFiles = replaceFile.substring(0, replaceFile.lastIndexOf('\/') + 1)
  const endSplitFiles = replaceFile.substring(replaceFile.lastIndexOf('\/') + 1, replaceFile.length)
  const pageUrlList = fs.readdirSync(preSplitFiles)
  const stat = fs.lstatSync(replaceFile) // 判断是否是文件
  const fileExtname = path.extname(endSplitFiles) // 判断文件后缀

  try {
    const isExisted = await isFileExisted(replaceFile)
    log(`📃 是否存在文件${isExisted}`)
    log(`是否是文件 ${stat.isFile()}`) //是文件吗
    log(`是否是文件夹${stat.isDirectory()}`) //是文件夹吗
    if (isExisted) {
      if (stat.isFile()) { // 是文件
        log(`📃 文件格式 ${fileExtname}`)
        switch(fileExtname) {
          case 'js':
            break;
          case 'vue':
            break;
          default:
        }
      } else if (stat.isDirectory()) { // 是文件夹

      } else {
        log(`❌ 文件格式不正确`)
      }
      const fileVueTemplate = await getGithubFile()
      // 交互式选择文件
      const res = await inquirer.prompt([{
        type:'list',
        name: 'fileVueTemplate',
        message: 'please check template',
        choices: () => {
          return fileVueTemplate
        },
        default: fileVueTemplate[0]
      }])
    }
  } catch (error) {
    log(`❌ 文件不存在 ${error}`)
  }
  // 获取url斜杠后面面路径
  log(`🗄️ replaceFile文件${replaceFile}`)
  log(`🗄️ preSplitFiles文件${preSplitFiles}`)
  log(`📃 endSplitFiles文件${endSplitFiles}`)
  log(`🗄️ 文件地址 ${path.resolve('./')}`)
  log(`🗄️ 文件夹地址 ${pageUrlList}`)
  // const hasName = pageList.every(n => {
  //   return n.replace
  // })
}
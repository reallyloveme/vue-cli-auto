const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
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
module.exports = async name => {
  log(`🔥 替换的模版：${name}`)
  // 获取列表
  const pageList = searchRecursive('./src/pages', '.vue')
  log(`查询vue文件 ${pageList}`)
  log(`文件地址 ${path.resolve('./')}`)
  // const hasName = pageList.every(n => {
  //   return n.replace
  // })
}
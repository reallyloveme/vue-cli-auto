
// util.promisify是在node.js 8.x版本中新增的一个工具，
// 用于将老式的Error first callback转换为Promise对象，让老项目改造变得更为轻松。
const { promisify } = require('util') // node常用函数工具

const figlet = promisify(require('figlet')) // 命令行字符图案
const clear = require('clear') // 清除
const chalk = require('chalk') // 样式修饰
const log = content => console.log(chalk.green(content)) // 日志打印
const { clone } = require('./download')
const open = require('open') // 打开浏览器
const files = require('./files')
const inquirer = require('inquirer')

// 交互式问答
const askQuestions = async (name) => {
  const questins = [
    {
      name: 'name',
      message: '项目名称',
      default: 'project'
    },
    {
      name: 'description',
      type: 'string',
      message: '请输入项目描述',
      default: 'description'
    },
    {
      name: 'author',
      type: 'string',
      message: '请输入作者',
      default: 'author'
    },
    {
      name:'isAxios',
      type:'confirm',
      message:'是否安装axios'
    }
  ]
 const paramater =  await inquirer.prompt(questins)
  // clone
  log(`🚀 创建项目：${name}`)
  await clone('github:reallyloveme/vue-template', name, paramater)
}


module.exports = async name => {
  clear()
  const data = await figlet('SJ WELCOM')
  // 判断是否存在.git文件
  if (files.directoryExists(name)) {
    log(chalk.red('⚠ 已经存在一个本地仓库!'))
    process.exit()
  }
  log(data)
  await askQuestions(name)
  

  // open(`http://localhost:8080`) // 启动浏览器
  // 启动
  // await spawn('npm', ['run', 'start'], {cwd: `./${name}`})

}
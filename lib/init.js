
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

const CLI = require('clui') // 安装动画

const Spinner = CLI.Spinner

const spawn = async (...args) => { // npm依赖安装拼接
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
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

  // clone
  log(`🚀 创建项目：${name}`)
  await clone('github:reallyloveme/vue-template', name)

  // 自动安装依赖
  const status = new Spinner('🔨安装依赖...')
  status.start()
  await spawn('npm', ['install'], {cwd: `./${name}`})
  status.stop()
  log( `
👌  安装完成
====================
cd ${name}
npm run serve
====================
  `)

  // open(`http://localhost:8080`) // 启动浏览器
  // 启动
  // await spawn('npm', ['run', 'start'], {cwd: `./${name}`})

}
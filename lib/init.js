const { promisify } = require('util')

const figlet = promisify(require('figlet'))

const clear = require('clear')

const chalk = require('chalk')

const log = content => console.log(chalk.green(content))

const { clone } = require('./download')

const open = require('open')

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
  log(data)

  // clone

  log(`🚀 创建项目：${name}`)
  await clone('github:reallyloveme/vue-template', name)

  // 自动安装依赖
  log('🔨安装依赖')
  await spawn('npm', ['install'], {cwd: `./${name}`})
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
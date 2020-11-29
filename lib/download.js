const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const { promisify } = require('util')
const chalk = require('chalk')
const CLI = require('clui') // 安装动画
const Spinners = CLI.Spinner
const logRed = content => console.log(chalk.red(content))
const logGreen = content => console.log(chalk.green(content))

const spawn = async (desc) => { // npm依赖安装拼接
  const { spawn } = require('child_process')
  const status = new Spinners('🔨安装依赖...')
  status.start()
  await new Promise(resolve => {
    const proc = spawn('npm', 
    ['install'], 
    {cwd: `./${desc}`})
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
    proc.on('error',(err)=>{
      logRed(chalk.red("依赖安装失败"))
      reject(err)
    })
  }).then(() => {
    status.stop()
    logGreen( `
👌  安装完成
===========================
  cd ${desc}
  npm run start
===========================
    `)
  }).catch(err => {
    logRed(`❌ 依赖安装失败${err}`)
  })
}

module.exports.clone = async function (repo, desc, paramater) {
  const download = promisify(require('download-git-repo'))
  const ora = require('ora')
  const spinner = ora(`下载…… ${repo}`)
  const targetPath = path.resolve(process.cwd(),desc) // 获取当前项目路径

  spinner.start()

  await download(repo, desc, (err) => {
    if (!err) {
      spinner.succeed()
      const packagePath = path.join(targetPath, 'package.json')
      if (fs.existsSync(packagePath)) {
        const content = fs.readFileSync(packagePath).toString()
        const template = Handlebars.compile(content)
        const result = template(paramater)
        fs.writeFileSync(packagePath,result)
      } else {
        spinner.fail()
        return
      }
      // 自动安装依赖
      spawn(desc)
    } else {
      logRed(`❌ 下载失败${err}`)
      process.exit()
    }
  })
}
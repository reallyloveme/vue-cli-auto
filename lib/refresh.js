const fs = require('fs')
const handlebars = require('handlebars')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))

module.exports = async() => {
  // 获取列表
  const list = fs.readdirSync('./src/pages')
    .filter(v => v !== 'Home.vue')
    .map(v => ({
      name: v.replace('.vue', '').toLowerCase(),
      file: v
    }))
    console.log('模版 v:', fs.readdirSync('./src/pages'))

    // 生成路由定义
    compile({list}, './src/router/index.js', './template/router.js.hbs')
    // 生成菜单
    compile({list}, './src/App.vue', './template/App.vue.hbs')

    /**
      *
      *
      *
     */
    function compile(meta, filePath, templatePath) {
      if (fs.existesSync(templatePath)) {
        const content = fs.readFileSync(templatePath).toString()
        const result = handlebars.compile(content)(meta)
        fs.writeFileSync(filePath, result)
        console.log(`🚀 ${filePath} 创建成功`)
      }
    }
}
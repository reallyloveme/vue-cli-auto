const webpack = require('webpack')

module.exports = () => {
    webpack(require('../build/webpack.dev.conf.js'), (error, stats) => {
        console.log('error', error)
        console.log('stats', stats)
    })
}

// webpack(require('../build/webpack.dev.conf.js'), (error, stats) => {
//     console.log('error', error)
//     console.log('stats', stats)
// })
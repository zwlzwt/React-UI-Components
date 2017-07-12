require('babel-polyfill')
const fs = require('fs')
const ejs = require('ejs')
const { createServer } = require('http')
const webpack = require('webpack')
const makeDevMiddleware = require('webpack-dev-middleware')
const makeHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')

const compiler = webpack(config)
const port = process.env.PORT || 3000

// HRM config
const devMiddleware = makeDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: 'minimal',
})
const hotMiddleware = makeHotMiddleware(compiler, {
  overlay: false,
  info: true,
  heartbeat: 10 * 2000,
})

// html加载
const optionsData = {
  htmlWebpackPlugin: {
    options: {
      development: true
    }
  }
}

function handle(req, res) {
  devMiddleware(req, res, () => {
    hotMiddleware(req, res, () => {
      res.setHeader('Content-Type', 'text/html')
      const template = fs.readFileSync('src/index.html', 'utf8')
      res.end(
        ejs.render(template, optionsData, { _with: true })
      )
    })
  })
}


createServer(handle).listen(port, () => {
  process.stdout.write(`Dev server listening on port ${port}...\n`)
})

const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const { handler, catcher, logger, cargo } = require('cargo-io')
const extender = require('./middleware/extender')
const { server } = require('config')


/* MIDDLEWARE */
app.use(catcher(handler(extender)))
app.on('error', logger)
app.use(cors())
app.use(bodyparser())


/* SERVER */
app.listen(server.port, () => {
    const http = require('url').format(server)
    console.log(`server running at: ${http}`)
})



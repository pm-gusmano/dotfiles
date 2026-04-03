global.z = (v) => console.log(v)
const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const cors = require('kcors')
const router = require('./router')
const { handler, catcher, logger, cargo } = require('cargo-io')
const extender = require('./middleware/extender')
const { server } = require('config')


/* MIDDLEWARE */
app.use(catcher(handler(extender)))
app.on('error', logger)
app.use(cors())
app.use(cargo())
app.use(bodyparser())

/* ROUTER */
Object.keys(router)
    .map(key => app.use(router[key].routes()))

/* SERVER */
app.listen(server.port, () => {
    const http = require('url').format(server)
    console.log(`server running at: ${http}`)
})



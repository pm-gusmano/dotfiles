const router = require('koa-router')()
const controller = require('./../controllers/UserController')()

router.param('id', controller.loadInstance)
router.get('/users/:id', controller.loadFromUsername, controller.checkPassword, async (ctx) => {  ctx.body = {} })

module.exports = router
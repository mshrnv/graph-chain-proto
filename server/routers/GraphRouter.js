const Router = require('express')
const controller = require('../controllers/GraphController')

const router = new Router()

// Graph API
router.get('/graph', controller.getOne)
router.get('/graphs', controller.getAll)
router.post('/graph', controller.newGraph)
router.put('/graph', controller.updateGraph)

module.exports = router
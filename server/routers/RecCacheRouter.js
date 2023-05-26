const Router = require('express')
const controller = require('../controllers/RecController')

const router = new Router()

// Recommendations cache API
router.get('/rec', controller.getCache)
router.post('/rec', controller.setCache)


module.exports = router
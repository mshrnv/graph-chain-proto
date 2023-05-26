const Router = require('express')
const controller = require('../controllers/LikeController')

const router = new Router()

// Likes API
router.get('/graph_likes', controller.getGraphLikes)
router.post('/like', controller.likeGraph)
router.post('/unlike', controller.unlikeGraph)


module.exports = router
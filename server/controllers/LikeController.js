const LikeService = require('../services/LikeService')

class LikeController {
    async getGraphLikes(req, res) {
        try {
            const {graph} = req.query

            if (!graph) {
                res.status(404).json({
                    message: "Не передано название графа"
                })
            }

            const likes = await LikeService.getLikesOnGraph(graph)
            res.json(likes)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения графа"
            })
        }
    }

    async likeGraph(req, res) {
        try {
            const {graph, user} = req.body;

            if (!graph || !user) {
                res.status(404).json({
                    message: "Не передан граф или пользователь"
                })
            }

            const like = await LikeService.likeGraph(graph, user);
            res.json(like);
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка добавления лайка"
            })
        }
    }

    async unlikeGraph(req, res) {
        try {
            const {graph, user} = req.body;

            if (!graph || !user) {
                res.status(404).json({
                    message: "Не передан граф или пользователь"
                })
            }

            const like = await LikeService.unlikeGraph(graph, user);
            res.json(like);
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка добавления лайка"
            })
        }
    }

}

module.exports = new LikeController()
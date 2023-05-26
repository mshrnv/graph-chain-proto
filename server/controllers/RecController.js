const RecService = require('../services/RecService')

class RecCacheController {
    async getCache(req, res) {
        try {
            const {query} = req.query

            if (!query) {
                res.status(404).json({
                    message: "Не передан запрос"
                })
            }

            const cache = await RecService.getCache(query)
            res.json(cache)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения кэша"
            })
        }
    }

    async setCache(req, res) {
        try {
            const {query, data} = req.body

            if (!query || !data) {
                res.status(404).json({
                    message: "Не передан запрос или данные"
                })
            }

            const cache = await RecService.setCache(query, data)
            res.json(cache)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка сохранения кэша"
            })
        }
    }
}

module.exports = new RecCacheController()
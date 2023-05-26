const GraphService = require('../services/GraphService')

class GraphController {
    async getOne(req, res) {
        try {
            const {graph_id} = req.query

            if (!graph_id) {
                res.status(404).json({
                    message: "Не передано название графа"
                })
            }

            const graph = await GraphService.getOneGraph(graph_id)
            res.json(graph)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения графа"
            })
        }
    }

    async getAll(req, res) {
        try {
            const allGraphs = await GraphService.getAllGraphs()
            res.json(allGraphs)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка получения списка графов"
            })
        }
    }

    async newGraph(req, res) {
        try {
            const {name, data, owner} = req.body

            if (!name || !data || !owner) {
                res.status(404).json({
                    message: "Не передано название или содержимое графа"
                })
            }

            const newGraph = await GraphService.newGraph(name, data, owner);
            res.json(newGraph)
        } catch (e) {
            res.status(404).json({
                jsMessage: e,
                message: "Ошибка добавления нового графа"
            })
        }
    }

    async updateGraph(req, res) {
        const {_id, data} = req.body

        if (!_id || !data) {
            res.status(404).json({
                message: "Не передан _id или обновленное содержимое графа"
            })
        }

        const updatedGraph = await GraphService.updateGraph(_id, data);
        res.json(updatedGraph)
    }
}

module.exports = new GraphController()
const Graph = require('../models/Graph')

class GraphService {
    // List of all graphs
    static async getAllGraphs() {
        const graphs = await Graph.find({})
        return graphs
    }

    // Creates new graph
    static async newGraph(name, data, owner) {
        const doc = new Graph({name, data, owner});
        await doc.save();

        return doc;
    }

    // Returns graph data by graph name
    static async getOneGraph(graphId) {
        const graph = await Graph.findById(graphId)
        return graph
    }

    // Update graph
    static async updateGraph(_id, data) {
        const doc = await Graph.findById(_id)
        doc.data = data
        doc.save()

        return doc
    }
}

module.exports = GraphService
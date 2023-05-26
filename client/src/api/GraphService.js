import axios from "axios";

class GraphService {
    static async getAllGraphs() {
        const allGraphs = await axios.get('http://localhost:5000/graphs');
        return allGraphs.data
    }

    static async getGraphData(graphId) {
        const graph = await axios.get('http://localhost:5000/graph/?graph_id=' + graphId);
        return graph.data
    }

    static async updateGraphData(graphId, updatedData) {
        const graph = await axios.put('http://localhost:5000/graph', {
            _id: graphId,
            data: JSON.stringify(updatedData)
        });

        return graph.data
    }

    static async getRecommendations(graphName) {
        const recs = await axios.get('http://127.0.0.1:8000/?q=' + graphName);
        console.log(recs.data)
        return JSON.parse(recs.data)
    }

    static async getCache(query) {
        const cache = await axios.get('http://127.0.0.1:5000/rec/?query=' + query);
        return cache
    }


    static async setCache(query, data) {
        const cache = await axios.post('http://127.0.0.1:5000/rec', {query, data: JSON.stringify(data)});
        return cache
    }

    static async createGraph(graphName, userAccount) {
        const graph = await axios.post('http://localhost:5000/graph', {
            name: graphName,
            data: JSON.stringify({
                nodes: [{
                    id: graphName,
                    isRoot: true,
                    isFolder: true,
                    x: 500,
                    y: 50
                }],
                links: []
            }),
            owner: userAccount
        });

        return graph.data
    }
}

export default GraphService;
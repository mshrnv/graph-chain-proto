import axios from "axios";

class LikeService {
    static async getGraphLikes(graphId) {
        const graphLieks = await axios.get('http://localhost:5000/graph_likes/?graph=' + graphId);
        return graphLieks.data
    }
}

export default LikeService;
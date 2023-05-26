const Like = require('../models/Like')

class LikeService {
    static async getLikesOnGraph(graph) {
        const likes = await Like.find({graphId: graph});
        const count = likes.length;

        return {likes, count}
    }

    static async likeGraph(graph, user) {
        const doc = new Like({graphId: graph, userId: user});
        await doc.save();

        return doc;
    }

    static async unlikeGraph(graph, user) {
        const doc = await Like.deleteOne({graphId: graph, userId: user});
        return doc
    }
}

module.exports = LikeService
const RecCache = require('../models/RecCache')

class RecService {
    static async getCache(query) {
        const cache = await RecCache.find({query});

        if (!cache) {
            return []
        }

        return cache
    }

    static async setCache(query, data) {
        const doc = new RecCache({query, data});
        await doc.save();

        return doc;
    }
}

module.exports = RecService
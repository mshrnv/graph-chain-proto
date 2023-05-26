const {Schema, model} = require('mongoose')

const RecCache = new Schema({
    query: {type: String, required: true},
    data: {type: String, required: true}
})

module.exports = model('rec_cache', RecCache)
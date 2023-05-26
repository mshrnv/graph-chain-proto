const {Schema, model} = require('mongoose')

const Like = new Schema({
    graphId: {type: String, required: true},
    userId: {type: String, required: true}
})

module.exports = model('Like', Like)
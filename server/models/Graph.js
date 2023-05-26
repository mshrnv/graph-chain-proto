const {Schema, model} = require('mongoose')

const Graph = new Schema({
    name: {type: String, required: true},
    desc: {type: String},
    owner: {type: String, required: true},
    data: {type: String, required: true}
})

module.exports = model('Graph', Graph)
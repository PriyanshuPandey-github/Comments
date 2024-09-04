const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/comment')

const commentSchema = mongoose.Schema({
    comment : String,
    vote : Number,
    replies : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    reply : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
})

module.exports = mongoose.model('comment', commentSchema)
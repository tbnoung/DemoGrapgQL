const mongoose = require('mongoose')
const MSchema = mongoose.Schema

const userSchema = new MSchema({
  comment: String,
  userid: String
})

module.exports = mongoose.model('Post', userSchema)
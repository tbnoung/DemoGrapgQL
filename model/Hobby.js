const mongoose = require('mongoose')
const MSchema = mongoose.Schema

const userSchema = new MSchema({
  title: String,
  description: String,
  userid: String
})

module.exports = mongoose.model('Hobby', userSchema)
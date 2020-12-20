const mongoose = require('mongoose')

var url = "mongodb://203.150.107.119:27017/admin";

mongoose.connect(url, {useNewUrlParser: true})
mongoose.connection.once('open', () => {
  console.log('Yes! We are connected!');
})
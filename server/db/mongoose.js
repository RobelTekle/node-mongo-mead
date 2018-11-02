var mongoose = require('mongoose')

mongoose.Promise = global.Promise
console.log('DATABASEEEEEEEEEEEEE', process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp')

module.exports = {
  mongoose
}

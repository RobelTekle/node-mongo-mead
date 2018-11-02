const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

//REMOVE ALL MATCHES
// Todo.remove({}).then(result => {
//   console.log(result)
// })

// Todo.findOneAndRemove({})
//
// Todo.findByIdAndRemove({})

Todo.findByIdAndRemove('5bdcb35ef510c57a2cb3e4fc').then(result => {
  console.log(result)
})

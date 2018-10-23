const { MongoClient, ObjectId } = require('mongodb')

var obj = new ObjectId()
console.log(typeof obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // DeleteMany
  // db
  //   .collection('Todos')
  //   .deleteMany({ text: 'Eat lunch' })
  //   .then(result => {
  //     console.log(result)
  //   })

  // DeleteOne
  // db
  //   .collection('Todos')
  //   .deleteOne({ text: 'Eat lunch' })
  //   .then(result => {
  //     console.log(result)
  //   })

  // FindOneAndDelete
  db
    .collection('Todos')
    .findOneAndDelete({ completed: false })
    .then(result => {
      console.log(result)
    })

  // db.close()
})

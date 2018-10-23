const { MongoClient, ObjectId } = require('mongodb')

var obj = new ObjectId()
console.log(typeof obj)

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server')
  }
  console.log('Connected to MongoDB server')

  // db
  //   .collection('Todos')
  //   .find({ _id: new ObjectId('5bce09a1c6c6afea24922fc2') })
  //   .toArray()
  //   .then(
  //     docs => {
  //       console.log('Todos')
  //       console.log(JSON.stringify(docs, undefined, 2))
  //     },
  //     err => {
  //       console.log('unable to fetch Todos')
  //     }
  //   )

  // db
  //   .collection('Todos')
  //   .find()
  //   .count()
  //   .then(
  //     count => {
  //       console.log(`Todos count: ${count}`)
  //     },
  //     err => {
  //       console.log('unable to fetch Todos')
  //     }
  //   )

  db
    .collection('Users')
    .find({ location: 'Marseille', age: 29 })
    .count()
    .then(
      count => {
        console.log(`Users count: ${count}`)
      },
      err => {
        console.log('Unable to fetch users')
      }
    )

  // db.close()
})

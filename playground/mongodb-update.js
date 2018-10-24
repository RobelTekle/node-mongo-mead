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
  //   .findOneAndUpdate(
  //     { _id: new ObjectId('5bcf556280543757c4485698') },
  //     {
  //       $set: {
  //         completed: true
  //       }
  //     },
  //     {
  //       returnOriginal: false
  //     }
  //   )
  //   .then(res => {
  //     console.log(res)
  //   })

  db
    .collection('Users')
    .findOneAndUpdate(
      { _id: new ObjectId('5bcebec2ae26ca6fb935aa6b') },
      {
        $set: {
          name: 'Robel 2'
        },
        $inc: {
          age: 1
        }
      },
      {
        returnOriginal: false
      }
    )
    .then(res => console.log(res))

  // db.close()
})

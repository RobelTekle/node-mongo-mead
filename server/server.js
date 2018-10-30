var express = require('express')
const { ObjectID } = require('mongodb')
var bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express()

app.use(bodyParser.json())

// POST New Todo
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then(doc => res.send(doc), err => res.status(400).send(err))
})

// GET All Todos
app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.status(200).send({ todos })
    },
    e => {
      res.status(400).send(e)
    }
  )
})

// GET One Todo
app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }
  Todo.findById(id)
    .then(todo => {
      if (!todo) return res.status(404).send()
      res.status(200).send({ todo })
    })
    .catch(err => {
      res.status(400).send()
    })
})

// LISTEN
app.listen(3000, () => {
  console.log('Starting at port 3000')
})

module.exports = {
  app
}

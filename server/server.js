require('./config/config')

const express = require('express')
const { ObjectID } = require('mongodb')
const _ = require('lodash')
const bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express()
const port = process.env.PORT

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

// DELETE
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if (!ObjectID.isValid(id)) {
    return res.status(400).send()
  }

  Todo.findByIdAndRemove(id)
    .then(result => {
      if (!result) return res.status(404).send()
      return res.status(200).send({ result })
    })
    .catch(err => {
      return res.status(400).send()
    })
})

// PATCH
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id
  const body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(400).send()
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send()
      }
      res.send({ todo })
    })
    .catch(e => {
      res.status(400).send()
    })
})

// LISTEN
app.listen(port, () => {
  console.log(`Starting at port ${port}`)
})

module.exports = {
  app
}

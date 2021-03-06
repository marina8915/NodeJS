const express = require('express')

const Todo = require('./model')

const router = express.Router()

// get all todo
router.get('/todo', function (req, res, next) {
  Todo.find({})
    .then(function (todo) {
      res.json({todo})
    })
    .catch(next)
})

// get todo by id
router.get('/todo/:id', function (req, res) {
  Todo.findById({'_id': req.params.id}, function (err, todo) {
    if (todo === null) {
      // if todo not exist error
      res.status(404).json('Not found')
    } else if (err) {
      res.status(400).json(err)
    } else {
      res.status(200).json(todo)
    }
  })
})

// delete todo by id
router.delete('/todo/:id', function (req, res) {
  let id = req.params.id
  Todo.remove({
    _id: id
  }, function () {
    // if delete successful
    res.json('Todo deleted')
  })
})

// post new todo
router.post('/todo', function (req, res, next) {
  let newTodo = new Todo(req.body.todo)
  // check if fields not empty and exist
  if (req.body.todo.text !== '' && req.body.todo.text &&
    req.body.todo.url !== '' && req.body.todo.url &&
    req.body.todo.date !== '' && req.body.todo.date &&
    req.body.todo.complete) {
    newTodo.save()
      .then(function (todo) {
        res.json({todo})
      })
  } else {
    res.json({success: false, message: 'Some field is empty!', status: 401})
  }
})

// put todo by id
router.put('/todo/:id', function (req, res) {
  // if text is empty then paste defaultValues
  let defaultValues = {
    defaultText: 'text',
    defaultUrl: 'radiant-basin-31635.herokuapp.com',
    defaultDate: '10.03.18',
    defaultComplete: true
  }
  Todo.findOneAndUpdate({'_id': req.params.id}, {
    text: req.body.todo.text || defaultValues.defaultText,
    url: req.body.todo.url || defaultValues.defaultUrl,
    date: req.body.todo.date || defaultValues.defaultDate,
    complete: req.body.todo.complete || defaultValues.defaultComplete
  }, {new: true}, function (err, doc) {
    if (err) {
      res.status(400).json(err)
    }
    res.status(200).json(doc)
  })
})

module.exports = router

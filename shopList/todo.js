const express = require('express')

const Todo = require('./model')

const router = express.Router()

router.get('/todo', (req, res, next) => {
  Todo.find({})
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

router.get('/todo/:id', (req, res) => {
    Todo.findById({'_id': req.params.id}, (err, todo) => {
    if (todo === null) {
            res.status(404).json("Not found")
        }
    else {
        res.status(200).json(todo)
    }
    })
})

router.delete('/todo/:id', function (req, res) {
  let id = req.params.id
  Todo.remove({
    _id: id
  }, function () {
    res.json('Todo deleted')
  })
})

module.exports = router
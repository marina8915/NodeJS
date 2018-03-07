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

router.post('/todo', (req, res, next) => {
    let newTodo = new Todo(req.body.todo)
        if (req.body.todo.text !== '' && req.body.todo.text){
            newTodo.save()
            .then(todo => {
            res.json({todo})
            })
        } else {
            res.json({success: false, message: 'Field text is empty!'})
        }
})

router.put('/todo/:id', function (req, res) {
    let defaultText = "text"
    Todo.findOneAndUpdate({ "_id": req.params.id}, {
        text: req.body.todo.text || defaultText
    }, { new: true }, function (err, doc) {
        if (err) {
            res.status(400).json(err)
        }
        res.status(200).json(doc)
    })
})

module.exports = router
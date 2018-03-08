const express = require('express')

const Todo = require('./model')

const router = express.Router()

//get all todo
router.get('/todo', (req, res, next) => {
  Todo.find({})
    .then(todo => {
      res.json({todo})
    })
    .catch(next)
})

//get todo by id
router.get('/todo/:id', (req, res) => {
    Todo.findById({'_id': req.params.id}, (err, todo) => {
      if (todo === null) {
          //if todo not exist error 404
          res.status(404).json("Not found")
      } else {
          res.status(200).json(todo)
      }
    })
})

//delete todo by id
router.delete('/todo/:id', function (req, res) {
  let id = req.params.id
  Todo.remove({
    _id: id
  }, function () {
      //if delete successful
      res.json('Todo deleted')
  })
})

//post new todo
router.post('/todo', (req, res, next) => {
    let newTodo = new Todo(req.body.todo)
    //check if field text not empty and exist
    if (req.body.todo.text !== '' && req.body.todo.text){
        newTodo.save()
        .then(todo => {
            res.json({todo})
        })
    } else {
        res.json({success: false, message: 'Field text is empty!'})
    }
})

//put todo by id
router.put('/todo/:id', function (req, res) {
    // if text is empty then text = defaultText
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
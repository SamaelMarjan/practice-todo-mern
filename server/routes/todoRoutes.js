const { createTodo, getAllTodo, getSingleTodo, updateTodo, deleteTodo } = require('../controllers/todoController')

const router = require('express').Router()

router.post('/create-todo', createTodo)
router.get('/get-todo', getAllTodo)
router.get('/get-todo/:id', getSingleTodo)
router.put('/update-todo/:id', updateTodo)
router.delete('/delete-todo/:id', deleteTodo)

module.exports = router
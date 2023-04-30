require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connection = require('./config/db')
const toDo = require('./routes/todoRoutes')

const app = express()
connection()

app.use(cors())
app.use(express.json())

app.use('/api/todo', toDo)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server connected to ${PORT}`))
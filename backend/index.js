const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./constants/config')

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

const mongoConnectionString = config.MONGO_CONNECTION_STRING
mongoose.connect(mongoConnectionString, { useNewUrlParser: true, useCreateIndex: true })

const connection = mongoose.connection
connection.once('open', () => {
	console.log("MongoDB connection established")
})

const usersRouter = require('./routes/users')

app.use('/api/users', usersRouter)

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})

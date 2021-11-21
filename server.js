const express = require('express')
const connectDB = require('./config/db')
//const fileupload = require('express-fileupload')

const app = express()

// Provide parsing for file uploads
//app.use(fileupload())

//Connect Database
connectDB()

//Init Middleware
app.use(express.json())

//Define Routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

// Catch uncaught errors
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.name + ': ' + err.message })
})

const PORT = process.env.PORT || 5002

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

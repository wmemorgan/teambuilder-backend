const express = require('express')
const serverless = require('serverless-http')
const logger = require('morgan')
const cors = require('cors')

const app = express()
const router = express.Router()
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

// Resource Routes
const projectsRoutes = require('../routes/projectsRoutes')
const rolesRoutes = require('../routes/rolesRoutes')
const categoriesRoutes = require('../routes/categoriesRoutes')
const usersRoutes = require('../routes/usersRoutes')

// Load middleware
app.use(express.json())
app.use(logger(`dev`))
app.use(cors())

const sendUserError = (msg, res) => {
  res.status(422)
  res.json({Error: msg })
}

// Activate Routes
app.use('/.netlify/functions/server/api/projects', projectsRoutes)
app.use('/.netlify/functions/server/api/roles', rolesRoutes)
app.use('/.netlify/functions/server/api/categories', categoriesRoutes)
app.use('/.netlify/functions/server/api/users', usersRoutes)
app.use('/.netlify/functions/server/api', router)

app.use('/', (req, res) => {
  res.send(`<h1>Welcome to the TeamBuilder APP API</h1>`)
})

module.exports = app
module.exports.handler = serverless(app)


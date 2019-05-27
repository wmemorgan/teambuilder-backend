const express = require('express')
const serverless = require('serverless-http')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('../data/dataModels')
const { projects, users, roles, categories } = require('../data/dummyData')

const app = express()
const router = express.Router()
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

// Resource Routes
const projectsRoutes = require('../routes/projectsRoutes')
const rolesRoutes = require('../routes/rolesRoutes')
const categoriesRoutes = require('../routes/categoriesRoutes')

// Load middleware
app.use(express.json())
app.use(logger(`dev`))
app.use(cors())

const sendUserError = (msg, res) => {
  res.status(422)
  res.json({Error: msg })
}

// const authenticator(req, res, next) {
//   const { authorization } = req.headers
//   if (authorization === token ) {
//     next()
//   } else {
//     res.status(403).json({error: 'Use must be logged in to do that.'})
//   }
// }


// router.get('/', (req, res) => {
//   res.send('Hello World!')
// })

/*============= USER ROUTES ===============*/
router.get(`/users`, async (req, res) => {
  try {
    let data = await db.findAll(users)
    res.json(data)
  } catch (ex) {
    res.status(500).json({ errorMessage: ex })
  }
})

router.get(`/users/:id`, async (req, res) => {
  const { id } = req.params
  try {
    let data = await db.findById(id, users)
    res.json(data)
  }
  catch (ex) {
    res.status(404).json({ message: `Item ${id} not found` })
  }
})

router.post(`/users`, async (req, res) => {
  console.log(`Invoked add record: `, req.body)
  try {
    let data = await db.add(req.body, users)
    console.log(`Add record successful data created: `, data)
    res.status(201).json(data)
  }
  catch (ex) {
    res.status(500).send(ex)
  }
})

router.put(`/users/:id`, async (req, res) => {
  const { id } = req.params
  try {
    let data = await db.update(id, req.body, users)
    console.log(`Updated list: ${JSON.stringify(data)}`)
    res.json(data)
  }
  catch (ex) {
    res.status(404).send({ message: `Record ${id} not found: ${ex}` })
  }
})

router.delete(`/users/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  try {
    let data = await db.findById(id, users)
    if (data) {
      let updatedData = await db.remove(id, users)
      res.send(updatedData)
    }
    else {
      res.status(404).send({ message: `Record ${id} not found` })
    }
  }
  catch (ex) {
    res.status(500).send({ message: `Record could not be removed err: ${JSON.stringify(ex)}` })
  }

})

/*============= CATEGORY ROUTES ===============*/
// router.get(`/categories`, async (req, res) => {
//   try {
//     let data = await db.findAll(categories)
//     res.json(data)
//   } catch (ex) {
//     res.status(500).json({errorMessage: ex})
//   }

// })

// router.get(`/categories/:id`, async (req, res) => {
//   const { id } = req.params
//   console.log(`GET incoming ID: `, req.params.id)
//   try {
//     let data = await db.findById(id, categories)
//     res.json(data)
//   }
//   catch (ex) {
//     res.status(404).json({ message: `Item ${id} not found` })
//   }
// })

// router.post(`/categories`, async (req, res) => {
//   console.log(`Invoked add record: ${JSON.stringify(req.body)}`)
//   try {
//     let data = await db.add(req.body, categories)
//     console.log(`Add record successful data created: `, data)
//     res.status(201).json(data)
//   }
//   catch (ex) {
//     res.status(500).send(ex)
//   }
// })

// router.put(`/categories/:id`, async (req, res) => {
//   const { id } = req.params
//   try {
//     let data = await db.update(id, req.body, categories)
//     console.log(`Updated list: ${JSON.stringify(data)}`)
//     res.json(data)
//   }
//   catch (ex) {
//     res.status(404).send({ message: `Record ${id} not found: ${ex}` })
//   }
// })

// router.delete(`/categories/:id`, async (req, res) => {
//   const { id } = req.params
//   console.log(`Submit delete request: `, id)
//   try {
//     let data = await db.findById(id, categories)
//     if (data) {
//       let updatedData = await db.remove(id, categories)
//       res.send(updatedData)
//     }
//     else {
//       res.status(404).send({ message: `Record ${id} not found` })
//     }
//   }
//   catch (ex) {
//     res.status(500).send({ message: `Record could not be removed err: ${JSON.stringify(ex)}` })
//   }

// })

// Activate Routes
app.use('/.netlify/functions/server/api/projects', projectsRoutes)
app.use('/.netlify/functions/server/api/roles', rolesRoutes)
app.use('/.netlify/functions/server/api/categories', categoriesRoutes)
app.use('/.netlify/functions/server/api', router)

app.use('/', (req, res) => {
  res.send(`<h1>Welcome to the TeamBuilder APP API</h1>`)
})

module.exports = app
module.exports.handler = serverless(app)

// app.listen(port, err => {
//   if (err) console.log(err)
//   console.log(`server is listening on port ${port}`)
// })


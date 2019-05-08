const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('../data/db')
const { projects, users, roles, categories } = require('../data/dummyData')

const app = express()
const router = express.Router()
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

const port = 5000

app.use(bodyParser.json())
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


router.get('/', (req, res) => {
  res.send('Hello World!')
})

/*============== PROJECT ROUTES ==================*/
router.get(`/projects`, async (req, res) => {
  try {
    let data = await db.findAll(projects)
    res.json(data)
  } 
  catch (ex) {
    res.status(404).json({ errorMessage: ex })
  }
})

router.get(`/projects/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`GET incoming ID: `, req.params.id)
  try {
    let data = await db.findById(id, projects)
    res.json(data)
  } 
  catch (ex) {
    res.status(404).json({ message: `Item ${id} not found`})
  }
})

router.post(`/projects`, async (req, res) => {
  console.log(`Invoked add record: `, req.body)
  try {
    let data = await db.add(req.body, projects)
    console.log(`Add record successful data created: `, data)
    res.status(201).json(data)
  }
  catch (ex) {
    res.status(500).send(ex)
  }
})

router.put(`/projects/:id`, async (req, res) => {
  const { id } = req.params
  try {
    let data = await db.update(id, req.body, projects)
    console.log(`Updated list: ${JSON.stringify(data)}`)
    res.json(data)
  }
  catch (ex) {
    res.status(404).send({message: `Record ${id} not found: ${ex}`})
  }
})

router.delete(`/projects/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  try {
    let data = await db.findById(id, projects)
    if (data) {
      let updatedData = await db.remove(id, projects)
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

/*============= ROLE ROUTES ===============*/
router.get(`/roles`, async (req, res) => {
  try {
    let data = await db.findAll(roles)
    res.json(data)
  } catch (ex) {
    res.status(500).json({ errorMessage: ex })
  }
})

router.get(`/roles/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`GET incoming ID: `, req.params.id)
  try {
    let data = await db.findById(id, roles)
    res.json(data)
  }
  catch (ex) {
    res.status(404).json({ message: `Item ${id} not found` })
  }
})

router.post(`/roles`, async (req, res) => {
  console.log(`Invoked add record: `, JSON.stringify(req.body))
  try {
    let data = await db.add(req.body, roles)
    console.log(`Add record successful data created: `, data)
    res.status(201).json(data)
  }
  catch (ex) {
    res.status(500).send(ex)
  }
})

router.put(`/roles/:id`, async (req, res) => {
  const { id } = req.params
  try {
    let data = await db.update(id, req.body, roles)
    console.log(`Updated list: ${JSON.stringify(data)}`)
    res.json(data)
  }
  catch (ex) {
    res.status(404).send({ message: `Record ${id} not found: ${ex}` })
  }
})

router.delete(`/roles/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  try {
    let data = await db.findById(id, roles)
    if (data) {
      let updatedData = await db.remove(id, roles)
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
router.get(`/categories`, async (req, res) => {
  try {
    let data = await db.findAll(categories)
    res.json(data)
  } catch (ex) {
    res.status(500).json({errorMessage: ex})
  }

})

router.get(`/categories/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`GET incoming ID: `, req.params.id)
  try {
    let data = await db.findById(id, categories)
    res.json(data)
  }
  catch (ex) {
    res.status(404).json({ message: `Item ${id} not found` })
  }
})

router.post(`/categories`, async (req, res) => {
  console.log(`Invoked add record: ${JSON.stringify(req.body)}`)
  try {
    let data = await db.add(req.body, categories)
    console.log(`Add record successful data created: `, data)
    res.status(201).json(data)
  }
  catch (ex) {
    res.status(500).send(ex)
  }
})

router.put(`/categories/:id`, async (req, res) => {
  const { id } = req.params
  try {
    let data = await db.update(id, req.body, categories)
    console.log(`Updated list: ${JSON.stringify(data)}`)
    res.json(data)
  }
  catch (ex) {
    res.status(404).send({ message: `Record ${id} not found: ${ex}` })
  }
})

router.delete(`/categories/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  try {
    let data = await db.findById(id, categories)
    if (data) {
      let updatedData = await db.remove(id, categories)
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

// Activate Netlify Lambda Middleware
app.use('/.netlify/functions/server/api', router)

module.exports = app
module.exports.handler = serverless(app)

// app.listen(port, err => {
//   if (err) console.log(err)
//   console.log(`server is listening on port ${port}`)
// })


const router = require('express').Router()

const db = require('../data/dataModels')
const { projects } = require('../data/dummyData')

// Load middleware
const validateProjectId = require('../middleware')
const idBodyCheck = [requiredProjectContent, validateProjectId]

/*============== PROJECT ROUTES ==================*/
router.get(`/`, async (req, res) => {
  try {
    let data = await db.findAll(projects)
    res.json(data)
  }
  catch (err) {
    res.status(404).json({ errorMessage: err })
  }
})

router.get('/:id', validateProjectId, (req, res) => {
    res.send(req.data)
})

router.post(`/`, requiredProjectContent, async (req, res) => {
  try {
    let data = await db.add(req.body, projects)
    console.log(`Add record successful data created: `, data)
    res.status(201).json(data)
  }
  catch (err) {
    res.status(500).send(err)
  }
})

router.put(`/:id`, idBodyCheck, async (req, res) => {
  const { id } = req.params
  try {
    let data = await db.update(id, req.body, projects)
    console.log(`Updated list: ${JSON.stringify(data)}`)
    res.json(data)
  }
  catch (err) {
    res.status(404).send({ message: `Record ${id} not found: ${err}` })
  }
})

router.delete(`/:id`, validateProjectId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, projects)
    if (data <= 0) throw err
    else {
      res.json({ message: `Successfully deleted project ${req.data.id} ` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== Custom middleware ==== //
function requiredProjectContent(req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing project data" })
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: "Missing required name or description field." })
  } else {
    next()
  }
}

module.exports = router
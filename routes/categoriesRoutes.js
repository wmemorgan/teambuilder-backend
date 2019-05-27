const router = require('express').Router()

const db = require('../data/dataModels')
const { categories } = require('../data/dummyData')

// Load middleware
const validateProjectId = require('../middleware')
const idBodyCheck = [requiredData, validateRoleId]


router.get(`/`, async (req, res) => {
  try {
    let data = await db.findAll(categories)
    res.json(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get(`/:id`, validateRoleId, (req, res) => {
  res.send(req.data)
})

router.post(`/`, requiredData, async (req, res) => {
  try {
    let data = await db.add(req.body, categories)
    console.log(`Add record successful data created: `, data)
    res.status(201).json(data)
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

router.put(`/:id`, idBodyCheck, async (req, res) => {
  try {
    let data = await db.update(req.data.id, req.body, categories)
    res.json(data)
  }
  catch (err) {
    res.status(404).send(err.message)
  }
})

router.delete(`/:id`, validateRoleId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, categories)
    if (data <= 0) throw err
    else {
      res.json({ message: `Successfully deleted role ${req.data.id} ` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== Custom middleware ==== //
async function validateRoleId(req, res, next) {
  try {
    let data = await db.findById(req.params.id, categories)
    req.data = data
    next()
  }
  catch (err) {
    res.status(err.code).send(err.message)
  }
}

function requiredData(req, res, next) {
  if (!req.body || !Object.keys(req.body).length) {
    console.log(`Missing submitted data`)
    res.status(400).json({ message: "Missing submitted data" })
  } else if (!req.body.name) {
    console.log(`Missing required name field`)
    res.status(400).json({ message: "Missing required name field." })
  } else {
    next()
  }
}

module.exports = router
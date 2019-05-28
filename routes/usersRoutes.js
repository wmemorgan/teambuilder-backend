const router = require('express').Router()

const db = require('../data/dataModels')
const { users } = require('../data/dummyData')

// Load middleware
const idBodyCheck = [requiredUserData, validateUserId]

/*============== USERS ROUTES ==================*/
router.get(`/`, async (req, res) => {
  try {
    let data = await db.findAll(users)
    res.json(data)
  }
  catch (err) {
    res.status(404).json({ errorMessage: err })
  }
})

router.get('/:id', validateUserId, (req, res) => {
  res.send(req.data)
})

router.post(`/`, requiredUserData, async (req, res) => {
  try {
    let data = await db.add(req.body, users)
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
    let data = await db.update(id, req.body, users)
    console.log(`Updated list: ${JSON.stringify(data)}`)
    res.json(data)
  }
  catch (err) {
    res.status(404).send({ message: `Record ${id} not found: ${err}` })
  }
})

router.delete(`/:id`, validateUserId, async (req, res) => {
  try {
    let data = await db.remove(req.data.id, users)
    if (data <= 0) throw err
    else {
      res.json({ message: `Successfully deleted user ${req.data.id} ` })
    }
  }
  catch (err) {
    res.status(500).send(err.message)
  }
})

// ==== Custom middleware ==== //
async function validateUserId(req, res, next) {
  try {
    let data = await db.findById(req.params.id, users)
    req.data = data
    next()
  }
  catch (err) {
    res.status(err.code).send(err.message)
  }
}

const inputDataChecker = (arr, target) => target.every(v => arr.includes(v))

function requiredUserData(req, res, next) {
  const requiredData = ["firstName", "lastName", "email" ]
  console.log(`inputDataChecker: `, inputDataChecker(Object.keys(req.body), requiredData))
  if (!req.body || !Object.keys(req.body).length) {
    res.status(400).json({ message: "Missing user data" })
  } else if (!inputDataChecker(Object.keys(req.body), requiredData)) {
    res.status(400).json({ message: "Missing required field." })
  } else {
    next()
  }
}

module.exports = router
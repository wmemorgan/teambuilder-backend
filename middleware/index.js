
// Load data model
const db = require('../data/dataModels')
const { projects } = require('../data/dummyData')

//==== Missing ID Validation ====//
async function validateProjectId(req, res, next) {
  try {
    let data = await db.findById(req.params.id, projects)
    req.data = data
    next()
  }
  catch (err) {
    res.status(err.code).send(err.message)
  }
}

module.exports = validateProjectId
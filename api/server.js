const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuidv4 = require('uuid/v4')

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

router.post(`/projects`, (req, res) => {
  // Create new project record
  let newProject = { id: uuidv4(), ...req.body}
  console.log(`New project created: `, newProject)
  // Add new project to existing projet list
  projects = [...projects, newProject]
  console.log(`updated project list: `, projects)
  // Send updated list 
  res.send(projects)

})

router.put(`/projects/:id`, (req, res) => {
  const { id } = req.params
  console.log(`PUT method invoked id: `, id)
  const project = projects.find(project => project.id == id)

  if (project) {
    const updatedProject = { ...project, ...req.body }
    console.log(`updatedProject: `, updatedProject)
    projects = [...projects.map(project => {
      if (project.id == id) {
        return updatedProject
      } else {
        return project
      }
    })]
    console.log(`updated Project List: `, projects)
    res.send(projects)
  } else {
    res.status(404).send({ msg: `Project ${id} not found` })
  }
})

router.delete(`/projects/:id`, (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  projects = projects.filter(p => p.id !== Number(id))

  res.send(projects)

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

router.post(`/users`, (req, res) => {
  // Create new user record
  let newUser = { id: uuidv4(), ...req.body }
  console.log(`New user created: `, newUser)
  // Add new user to existing user list
  users = [...users, newUser]
  console.log(`updated user list: `, users)
  // Send updated list 
  res.send(users)

})

router.put(`/users/:id`, (req, res) => {
  const { id } = req.params
  console.log(`PUT method invoked id: `, id)
  const user = users.find(user => user.id == id)

  if (user) {
    const updatedUser = { ...user, ...req.body }
    console.log(`updatedUser: `, updatedUser)
    users = [...users.map(user => {
      if (user.id == id) {
        return updatedUser
      } else {
        return user
      }
    })]
    console.log(`updated User List: `, users)
    res.send(users)
  } else {
    res.status(404).send({ msg: `user ${id} not found` })
  }
})

router.delete(`/users/:id`, (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  users = users.filter(p => p.id !== Number(id))

  res.send(users)

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

router.post(`/roles`, (req, res) => {
  // Create new role record
  let newRole = { id: uuidv4(), ...req.body }
  console.log(`New role created: `, newRole)
  // Add new role to existing projet list
  roles = [...roles, newRole]
  console.log(`updated role list: `, roles)
  // Send updated list 
  res.send(roles)
})

router.put(`/roles/:id`, (req, res) => {
  const { id } = req.params
  console.log(`PUT method invoked id: `, id)
  const role = roles.find(role => role.id == id)

  if (role) {
    const updatedRole = { ...role, ...req.body }
    console.log(`updatedRole: `, updatedRole)
    roles = [...roles.map(role => {
      if (role.id == id) {
        return updatedRole
      } else {
        return role
      }
    })]
    console.log(`updated Role List: `, roles)
    res.send(roles)
  } else {
    res.status(404).send({ msg: `role ${id} not found` })
  }
})

router.delete(`/roles/:id`, (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  roles = roles.filter(p => p.id !== Number(id))

  res.send(roles)

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

router.post(`/categories`, (req, res) => {
  // Create new categorie record
  let newCategory = { id: uuidv4(), ...req.body }
  console.log(`New categorie created: `, newCategory)
  // Add new categorie to existing projet list
  categories = [...categories, newCategory]
  console.log(`updated categories: `, categories)
  // Send updated list 
  res.send(categories)
})

router.put(`/categories/:id`, (req, res) => {
  const { id } = req.params
  console.log(`PUT method invoked id: `, id)
  const category = categories.find(categorie => categorie.id == id)

  if (category) {
    const updatedCategory = { ...category, ...req.body }
    console.log(`updatedCategory: `, updatedCategory)
    categories = [...categories.map(category => {
      if (category.id == id) {
        return updatedCategory
      } else {
        return category
      }
    })]
    console.log(`updated category list: `, categories)
    res.send(categories)
  } else {
    res.status(404).send({ msg: `category ${id} not found` })
  }
})

router.delete(`/categories/:id`, (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)
  categories = categories.filter(p => p.id !== Number(id))

  res.send(categories)

})



// Activate Netlify Lambda Middleware
app.use('/.netlify/functions/server/api', router)

module.exports = app
module.exports.handler = serverless(app)

// app.listen(port, err => {
//   if (err) console.log(err)
//   console.log(`server is listening on port ${port}`)
// })


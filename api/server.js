// require('dotenv').load()
const express = require('express')
const Router = require('express-promise-router')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const cors = require('cors')
const uuidv4 = require('uuid/v4')

const db = require('../data/db')
const dbknex = require('../data/knex')

const login = require('../models/login')

const app = express()
const router = new Router()
const token =
  'esfeyJ1c2VySWQiOiJiMDhmODZhZi0zNWRhLTQ4ZjItOGZhYi1jZWYzOTA0NUIhkufemQifQ';

app.use(bodyParser.json())
app.use(cors())

const sendUserError = (msg, res) => {
  res.status(422)
  res.json({Error: msg })
}

const authenticator = (req, res, next) => {
  const { authorization } = req.headers
  if (authorization === token ) {
    next()
  } else {
    res.status(403).json({error: 'Use must be logged in to do that.'})
  }
}

// let projects = [
//   {
//     id: 1,
//     name: 'Team Builder App',
//     pitch:
//       'Managing hundreds of student projects week in and week out for Build weeks gets a bit daunting! I need an app that helps me with product ideation and project curation.',
//     mvp: 'The product solves the problem',
//     stretch: 'Allow me to submit a CSV with the proper fields.',
//     roleAssignments: [
//       {
//         id: 1,
//         role: 'Web UI Developer',
//         assignedTo: 'Harry'

//       },
//       {
//         id: 2,
//         role: 'Front-end Architect',
//         assignedTo: 'Ron'

//       },
//       {
//         id: 3,
//         role: 'Back-end Architect',
//         assignedTo: 'Hermione'
//       }
//     ],
//     signUpList: [
//       {
//         id: 1,
//         role: 'UX Designer',
//         user: 'Greg'
//       },
//       {
//         id: 2,
//         role: 'Project Coordinator',
//         user: 'Alice'
//       },
//       {
//         id: 3,
//         role: 'Back-end Architect',
//         user: 'Sandra'
//       },
//     ],
//     category: 'Productivity',
//     projectComplete: false
//   },
//   {
//     id: 2,
//     name: 'Better Professor App',
//     pitch: `As a professor, I have a lot of grad students I mentor. I’d like to help keep them on track, but I can never remember their project deadlines, or when my feedback to them is due. I need an app that allows me to enter in all the important dates by category (ie student project deadline, feedback deadline, letter of recommendation deadline, etc.) and automatically remind me or the student before the deadline. Never miss an opportunity to member ever again!`,
//     mvp:
//       'As a user I want to login and see a list of students I mentor so I can add to or remove from the list. I also want to click on a student and see a list of their important projects or research papers I am mentoring on.  As a user I want to be able to create an automated messages to be sent to myself or a student I’m mentoring. A message should include a send date and time and a long text field that enables the message curator the ability to send a custom message.',
//     stretch: `(Mobile App) - Allow reminders to be pushed through the app. 
//         (Web App) - Allow for a social media sharing aspect that allows you to advertise the app to professors on linkedin.
//         To enable screen reader support, -To learn about keyboard shortcuts,`,
//     roleAssignments: [
//       {
//         id: 1,
//         role: 'UX Designer',
//         assignedTo: 'George'
//       },
//       {
//         id: 2,
//         role: 'iOS Developer',
//         assignedTo: 'Steve'
//       }
//     ],
//     signUpList: [
//       {
//         id: 1,
//         role: 'Project Coordinator',
//         user: 'Peter'
//       },
//       {
//         id: 2,
//         role: 'Back-end Architect',
//         user: 'Jen'
//       },
//       {
//         id: 3,
//         role: 'Web UI Developer',
//         user: 'Sandra'
//       },
//     ],
//     category: 'Education',
//     projectComplete: false
//   },
//   {
//     id: 3,
//     name: 'Bubl',
//     pitch:
//       'Imagine a social platform that helps students transition from elementary school to middle school. Bubl is a school specific social network and friendship connection tool.',
//     mvp:
//       'User can create an account, join an existing school account, and search for existing bubls to join. They can explore interests through hashtag searches. They can connect with others and share experiences.',
//     stretch: '',
//     roleAssignments: [],
//     signUpList: [],
//     category: 'Social Media',
//     projectComplete: true
//   }
// ]

// let users = [
//   {
//     id: 1,
//     firstName: 'Gordon',
//     lastName: 'Clark',
//     email: 'Glark@gmail.com',
//     password: 'test',
//     avatar: 'avatar.png',
//     cohort: 'webpt04',
//     project_manager: 'Carlos',
//     role: 'backend',
//     project: 'none',
//   },
//   {
//     id: 2,
//     firstName: 'Donna',
//     lastName: 'Emmerson',
//     email: 'oopsididitagain@yahoo.com',
//     password: 'test',
//     avatar: 'avatar.png',
//     cohort: 'webpt04',
//     role: 'frontend',
//     project_manager: 'Carlos',
//     project: 'none',
//   },
//   {
//     id: 3,
//     firstName: 'Elliot',
//     lastName: 'Alderson',
//     email: 'mrrobot@geocities.com',
//     password: 'test',
//     avatar: 'elliot.jpg',
//     cohort: 'webpt03',
//     project_manager: 'Lola',
//     role: 'data science',
//     project: 'none',
//   }
// ]

router.get('/', authenticator, (req, res) => {
  res.send('Hello World!')
})

router.post('/login', (req, res) => { 
  let user = login.handleLogin(req, res, dbknex, bcrypt)
  if(req.body.email === user.email) {
    req.loggedIn = true
    res.status(200).json({
      payload: token
    })
  } else {
    res.status(403)
    .json({ error: 'Username or Password incorrect.' })
  }
})

/*============== PROJECT ROUTES ==================*/
router.get(`/projects`, async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM projects`)
    res.send(rows)
  } catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }

})

router.get(`/projects/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query('SELECT * FROM projects WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }

  // console.log(`GET incoming ID: `, req.params.id)
  // const project = projects.find(p => p.id == id)
  // console.log(`GET Method /projects/:id `, project)

  // if (project) {
  //   res.status(200).json(project)
  // } else {
  //   console.log(`Project id is not there: `, project)
  //   res.status(404).send({msg: `Project ${req.params.id} not found`})
  // }
})

router.post(`/projects`, async (req, res) => {
  try {
    const { name, pitch, mvp, stretch, category, projectComplete } = req.body
    await db.query(`INSERT INTO projects(name, pitch, mvp, stretch, 
      category, projectComplete) VALUES($1, $2, $3, $4, $5, $6)`,
      [name, pitch, mvp, stretch, category, projectComplete]
    )
    const { rows } = await db.query(`SELECT * FROM projects`)
    res.send(rows)
  } 
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }
  
  // // Create new project record
  // let newProject = { id: uuidv4(), ...req.body}
  // console.log(`New project created: `, newProject)
  // // Add new project to existing projet list
  // projects = [...projects, newProject]
  // console.log(`updated project list: `, projects)
  // // Send updated list 
  // res.send(projects)

})

router.put(`/projects/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`PUT method invoked id: `, id)

  try {
    const { name, pitch, mvp, stretch, category, projectComplete } = req.body
    await db.query(`UPDATE projects SET name = $1, pitch = $2, mvp = $3, stretch = $4, 
      category = $5, projectComplete = $6 WHERE id = $7`,
      [name, pitch, mvp, stretch, category, projectComplete, id]
    )
    const { rows } = await db.query(`SELECT * FROM projects`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }


  // const project = projects.find(project => project.id == id)

  // if (project) {
  //   const updatedProject = { ...project, ...req.body }
  //   console.log(`updatedProject: `, updatedProject)
  //   projects = [...projects.map(project => {
  //     if (project.id == payload.id) {
  //       return payload
  //     } else {
  //       return project
  //     }
  //   })]
  //   console.log(`updated Project List: `, projects)
  //   res.send(projects)
  // } else {
  //   res.status(404).send({ msg: `Project ${id} not found` })
  // }
})

router.delete(`/projects/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)

  try {
    const { rows } = await db.query(
      'DELETE FROM projects WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  } 


  // projects = projects.filter(p => p.id !== Number(id))

  // res.send(projects)

})

/*============= USER ROUTES ===============*/
router.get(`/users`, authenticator, async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT id, first_name, last_name, email,
        avatar, cohort, project_manager, preferred_role FROM users`)
    res.send(rows)
  } catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }

  // res.json(users)
})

router.get(`/users/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query(
      'SELECT first_name, last_name, email, avatar, cohort, project_manager, preferred_role FROM users WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }

  // let user = users.find(user => user.id == id)

  // if (user) {
  //   res.status(200).json(user)
  // } else {
  //   res.status(404).send({ msg: `user ${id} not found` })
  // }
})

router.post(`/signup`, async (req, res) => {
  const { firstName, lastName, email, password,
    avatar, cohort, project_manager, preferred_role
  } = req.body
  const hash = bcrypt.hashSync(password)

  try {
    await db.query(`INSERT INTO users(first_name, last_name, email, password,
        avatar, cohort, project_manager, preferred_role) VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
      [firstName, lastName, email, hash,
        avatar, cohort, project_manager, preferred_role]
    )
    const { rows } = await db.query(`SELECT id, first_name, last_name, email,
        avatar, cohort, project_manager, preferred_role FROM users`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }

  // // Create new user record
  // let newUser = { id: uuidv4(), ...req.body }
  // console.log(`New user created: `, newUser)
  // // Add new user to existing user list
  // users = [...users, newUser]
  // console.log(`updated user list: `, users)
  // // Send updated list 
  // res.send(users)

})

router.put(`/users/:id`, async (req, res) => {
  const { id } = req.params
  const { firstName, lastName, email,
    avatar, cohort, project_manager, preferred_role
  } = req.body
  // const hash = bcrypt.hashSync(password)
  console.log(`PUT method invoked id: `, id)

  try {
    await db.query(`UPDATE users SET first_name = $1, last_name = $2, email = $3,
        avatar = $4, cohort = $5, project_manager = $6, preferred_role = $7 WHERE id = $8`,
      [firstName, lastName, email, avatar, cohort, project_manager, preferred_role, id]
    )
    const { rows } = await db.query(`SELECT id, first_name, last_name, email,
        avatar, cohort, project_manager, preferred_role FROM users`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  }

  // const user = users.find(user => user.id == id)

  // if (user) {
  //   const updatedUser = { ...user, ...req.body }
  //   console.log(`updatedUser: `, updatedUser)
  //   users = [...users.map(user => {
  //     if (user.id == id) {
  //       return updatedUser
  //     } else {
  //       return user
  //     }
  //   })]
  //   console.log(`updated User List: `, users)
  //   res.send(users)
  // } else {
  //   res.status(404).send({ msg: `user ${id} not found` })
  // }
})

router.delete(`/users/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)

  try {
    const { rows } = await db.query(
      'DELETE FROM users WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  } 


  // users = users.filter(p => p.id !== Number(id))

  // res.send(users)

})


/*============= ROLE ROUTES ===============*/
router.get(`/roles`, async (req, res) => {
  try {
    const { rows } = await db.query(`SELECT * FROM roles`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query error ${ex}`)
    res.send(ex)
  }

})

router.get(`/roles/:id`, async (req, res) => {
  const { id } = req.params
  try {
    const { rows } = await db.query('SELECT * FROM roles WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query error ${ex}`)
    res.send(ex)
  }

  // console.log(`GET incoming ID: `, req.params.id)
  // const role = roles.find(p => p.id == id)
  // console.log(`GET Method /roles/:id `, role)

  // if (role) {
  //   res.status(200).json(role)
  // } else {
  //   console.log(`Role id is not there: `, role)
  //   res.status(404).send({ msg: `Role ${req.params.id} not found` })
  // }
})

router.post(`/roles`, async (req, res) => {
  try {
    const { name } = req.body
    console.log(`incoming value: `, name)
    await db.query(`INSERT INTO roles(name) VALUES ($1)`, [name])
    const { rows } = await db.query(`SELECT * FROM roles`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query error ${ex}`)
    res.send(ex)
  }


  // // Create new role record
  // let newRole = { id: uuidv4(), ...req.body }
  // console.log(`New role created: `, newRole)
  // // Add new role to existing projet list
  // roles = [...roles, newRole]
  // console.log(`updated role list: `, roles)
  // // Send updated list 
  // res.send(roles)
})

router.put(`/roles/:id`, async (req, res) => {
  const { id } = req.params
  const { name, gradingRubric } = req.body
  console.log(`PUT method invoked id: `, id)
  try {
    await db.query(`UPDATE users SET name = $1, gradingRubric = $2 WHERE id = $3`,
      [name, gradingRubric, id]
    )
    const { rows } = await db.query(`SELECT * FROM roles`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query error ${ex}`)
    res.send(ex)
  }

  // const role = roles.find(role => role.id == id)

  // if (role) {
  //   const updatedRole = { ...role, ...req.body }
  //   console.log(`updatedRole: `, updatedRole)
  //   roles = [...roles.map(role => {
  //     if (role.id == id) {
  //       return updatedRole
  //     } else {
  //       return role
  //     }
  //   })]
  //   console.log(`updated Role List: `, roles)
  //   res.send(roles)
  // } else {
  //   res.status(404).send({ msg: `role ${id} not found` })
  // }
})

router.delete(`/roles/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)

  try {
    const { rows } = await db.query(
      'DELETE FROM roles WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  } 

  // roles = roles.filter(p => p.id !== Number(id))

  // res.send(roles)

})

/*============= CATEGORY ROUTES ===============*/
router.get(`/categories`, (req, res) => {
  res.json(categories)
})

router.get(`/categories/:id`, (req, res) => {
  const { id } = req.params
  console.log(`GET incoming ID: `, req.params.id)
  const category = categories.find(p => p.id == id)
  console.log(`GET Method /categories/:id `, category)

  if (category) {
    res.status(200).json(category)
  } else {
    console.log(`category id is not there: `, category)
    res.status(404).send({ msg: `category ${req.params.id} not found` })
  }
})

router.post(`/categories`, async (req, res) => {
  const { name } = req.body
  try {
    await db.query(`INSERT INTO categories(name) VALUES ($1)`, [name])
    const { rows } = await db.query(`SELECT * FROM categories`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query error ${ex}`)
    res.send(ex)
  }



  // // Create new categorie record
  // let newCategory = { id: uuidv4(), ...req.body }
  // console.log(`New categorie created: `, newCategory)
  // // Add new categorie to existing projet list
  // categories = [...categories, newCategory]
  // console.log(`updated categories: `, categories)
  // // Send updated list 
  // res.send(categories)
})

router.put(`/categories/:id`, async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  console.log(`PUT method invoked id: `, id)

  try {  
    await db.query(`UPDATE categories SET name = $1 WHERE id = $2`, [name, id])
    const { rows } = await db.query(`SELECT * FROM categories`)
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query error ${ex}`)
    res.send(ex)
  }


  // const category = categories.find(categorie => categorie.id == id)

  // if (category) {
  //   const updatedCategory = { ...category, ...req.body }
  //   console.log(`updatedCategory: `, updatedCategory)
  //   categories = [...categories.map(category => {
  //     if (category.id == id) {
  //       return updatedCategory
  //     } else {
  //       return category
  //     }
  //   })]
  //   console.log(`updated category list: `, categories)
  //   res.send(categories)
  // } else {
  //   res.status(404).send({ msg: `category ${id} not found` })
  // }
})

router.delete(`/categories/:id`, async (req, res) => {
  const { id } = req.params
  console.log(`Submit delete request: `, id)

  try {
    const { rows } = await db.query(
      'DELETE FROM categories WHERE id = $1', [id])
    res.send(rows)
  }
  catch (ex) {
    console.log(`Database query failed ${ex}`)
    res.send(ex)
  } 

  // categories = categories.filter(p => p.id !== Number(id))

  // res.send(categories)

})



// Activate Netlify Lambda Middleware
app.use('/.netlify/functions/server/api', router)

module.exports = app
module.exports.handler = serverless(app)

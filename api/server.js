const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const cors = require('cors')
const uuidv4 = require('uuid/v4')

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

let projects = [
  {
    id: 1,
    name: 'Team Builder App',
    pitch:
      'Managing hundreds of student projects week in and week out for Build weeks gets a bit daunting! I need an app that helps me with product ideation and project curation.',
    mvp: 'The product solves the problem',
    stretch: 'Allow me to submit a CSV with the proper fields.',
    roleAssignments: [
      {
        id: 1,
        role: 'Web UI Developer',
        assignedTo: 'Harry'

      },
      {
        id: 2,
        role: 'Front-end Architect',
        assignedTo: 'Ron'

      },
      {
        id: 3,
        role: 'Back-end Architect',
        assignedTo: 'Hermione'
      }
    ],
    signUpList: [
      {
        id: 1,
        role: 'UX Designer',
        user: 'Greg'
      },
      {
        id: 2,
        role: 'Project Coordinator',
        user: 'Alice'
      },
      {
        id: 3,
        role: 'Back-end Architect',
        user: 'Sandra'
      },
    ],
    category: 'Productivity',
    projectComplete: false
  },
  {
    id: 2,
    name: 'Better Professor App',
    pitch: `As a professor, I have a lot of grad students I mentor. I’d like to help keep them on track, but I can never remember their project deadlines, or when my feedback to them is due. I need an app that allows me to enter in all the important dates by category (ie student project deadline, feedback deadline, letter of recommendation deadline, etc.) and automatically remind me or the student before the deadline. Never miss an opportunity to member ever again!`,
    mvp:
      'As a user I want to login and see a list of students I mentor so I can add to or remove from the list. I also want to click on a student and see a list of their important projects or research papers I am mentoring on.  As a user I want to be able to create an automated messages to be sent to myself or a student I’m mentoring. A message should include a send date and time and a long text field that enables the message curator the ability to send a custom message.',
    stretch: `(Mobile App) - Allow reminders to be pushed through the app. 
        (Web App) - Allow for a social media sharing aspect that allows you to advertise the app to professors on linkedin.
        To enable screen reader support, -To learn about keyboard shortcuts,`,
    roleAssignments: [
      {
        id: 1,
        role: 'UX Designer',
        assignedTo: 'George'
      },
      {
        id: 2,
        role: 'iOS Developer',
        assignedTo: 'Steve'
      }
    ],
    signUpList: [
      {
        id: 1,
        role: 'Project Coordinator',
        user: 'Peter'
      },
      {
        id: 2,
        role: 'Back-end Architect',
        user: 'Jen'
      },
      {
        id: 3,
        role: 'Web UI Developer',
        user: 'Sandra'
      },
    ],
    category: 'Education',
    projectComplete: false
  },
  {
    id: 3,
    name: 'Bubl',
    pitch:
      'Imagine a social platform that helps students transition from elementary school to middle school. Bubl is a school specific social network and friendship connection tool.',
    mvp:
      'User can create an account, join an existing school account, and search for existing bubls to join. They can explore interests through hashtag searches. They can connect with others and share experiences.',
    stretch: '',
    roleAssignments: [],
    signUpList: [],
    category: 'Social Media',
    projectComplete: true
  }
]

let roles = [
  {
    id: 1,
    name: 'Web UI Developer'
  },
  {
    id: 2,
    name: 'Front-end Architect'
  },
  {
    id: 3,
    name: 'Back-end Architect'
  },
  {
    id: 4,
    name: 'Project Support Coordinator'
  },
  {
    id: 5,
    name: 'UX Designer'
  },
]

let categories = [
  {
    id: 1,
    name: 'Productivity'
  },
  {
    id: 2,
    name: 'Education'
  },
  {
    id: 3,
    name: 'Social Impact'
  },
  {
    id: 4,
    name: 'Personal Finance'
  },
  {
    id: 5,
    name: 'Leisure and Entertainment'
  },
  {
    id: 6,
    name: 'Social Media'
  }
]

let users = [
  {
    id: 1,
    firstName: 'Gordon',
    lastName: 'Clark',
    email: 'Glark@gmail.com',
    avatar: 'avatar.png',
    cohort: 'webpt04',
    project_manager: 'Carlos',
    role: 'backend',
    project: 'none',
  },
  {
    id: 2,
    firstName: 'Donna',
    lastName: 'Emmerson',
    email: 'oopsididitagain@yahoo.com',
    avatar: 'avatar.png',
    cohort: 'webpt04',
    role: 'frontend',
    project_manager: 'Carlos',
    project: 'none',
  },
  {
    id: 3,
    firstName: 'Elliot',
    lastName: 'Alderson',
    email: 'mrrobot@geocities.com',
    avatar: 'elliot.jpg',
    cohort: 'webpt03',
    project_manager: 'Lola',
    role: 'data science',
    project: 'none',
  }
]

router.get('/', (req, res) => {
  res.send('Hello World!')
})

/*============== PROJECT ROUTES ==================*/
router.get(`/projects`, (req, res) => {
  res.json(projects)
})

router.get(`/projects/:id`, (req, res) => {
  const { id } = req.params
  console.log(`GET incoming ID: `, req.params.id)
  const project = projects.find(p => p.id == id)
  console.log(`GET Method /projects/:id `, project)

  if (project) {
    res.status(200).json(project)
  } else {
    console.log(`Project id is not there: `, project)
    res.status(404).send({msg: `Project ${req.params.id} not found`})
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
router.get(`/users`, (req, res) => {
  res.json(users)
})

router.get(`/users/:id`, (req, res) => {
  const { id } = req.params
  let user = users.find(user => user.id == id)

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).send({ msg: `user ${id} not found` })
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


/*============= ROLE ROUTES ===============*/
router.get(`/roles`, (req, res) => {
  res.json(roles)
})

router.get(`/roles/:id`, (req, res) => {
  const { id } = req.params
  console.log(`GET incoming ID: `, req.params.id)
  const role = roles.find(p => p.id == id)
  console.log(`GET Method /roles/:id `, role)

  if (role) {
    res.status(200).json(role)
  } else {
    console.log(`Role id is not there: `, role)
    res.status(404).send({ msg: `Role ${req.params.id} not found` })
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


// Activate Netlify Lambda Middleware
app.use('/.netlify/functions/server/api', router)

module.exports = app
module.exports.handler = serverless(app)

// app.listen(port, err => {
//   if (err) console.log(err)
//   console.log(`server is listening on port ${port}`)
// })


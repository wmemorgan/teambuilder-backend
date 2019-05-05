const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const cors = require('cors')
// const uuid = require('uuid')

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

const projects = [
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

const roles = [
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

const categories = [
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

const users = [
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

router.get(`/projects`, (req, res) => {
  res.json(projects)
})

router.get(`/projects/:id`, (req, res) => {
  const project = projects.find(project => project.id === req.params.id)

  if (project) {
    res.status(200).json(project)
  } else {
    res.status(404).send({msg: `Project not found`})
  }
})

router.get(`roles`, (req, res) => {
  res.json(roles)
})

router.get(`categories`, (req, res) => {
  res.json(categories)
})

router.get(`/users`, (req, res) => {
  res.json(users)
})

router.get(`/users/:id`, (req, res) => {
  const user = users.find(user => user.id === req.params.id)

  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404).send({ msg: `User not found` })
  }
})

app.use('/.netlify/functions/server/api', router)

module.exports = app
module.exports.handler = serverless(app)

// app.listen(port, err => {
//   if (err) console.log(err)
//   console.log(`server is listening on port ${port}`)
// })


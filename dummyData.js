// Dummy Data to be used prior to API implementation

export const projects = [
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

export const roles = [
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

export const categories = [
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
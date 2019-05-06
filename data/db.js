// Database connection pooling
const { Pool } = require('pg')

const pool = new Pool({
  user: 'lambda_dev',
  password: 'i<3Lambd4',
  host: 'devdb.ci2w4mxsfhhy.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'thursdaydb'
})

// Production version
// const pool = new Pool({
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PWD,
//   host: process.env.DATABASE_HOST,
//   port: 5432,
//   database: 'thursdaydb'
// })

module.exports = {
  query: (text, params) => pool.query(text, params)
}
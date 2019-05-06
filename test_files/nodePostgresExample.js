const { Client } = require('pg')

const client = new Client({
  user: 'lambda_dev',
  password: 'i<3Lambd4',
  host: 'devdb.ci2w4mxsfhhy.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'thursdaydb'
})

client.connect()
  .then(() => console.log(`Database connection established`))
  .then(() => client.query(`insert into public.Roles(name) values ($1)`, ['Back-end Architect']))
  .then(() => client.query(`select * from public.Roles`))
  .then(results => console.table(results.rows))
  .catch(e => console.log(e))
  .finally(() => client.end())
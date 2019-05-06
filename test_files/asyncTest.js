const { Client } = require('pg')

const client = new Client({
  user: 'lambda_dev',
  password: 'i<3Lambd4',
  host: 'devdb.ci2w4mxsfhhy.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'thursdaydb'
})



async function execute() {
  try {
    await client.connect()
    console.log(`Database connection established`)
    const { rows } = await client.query(`select * from public."Roles"`)
    console.table(rows)
  }
  catch (ex) 
  {
    console.log(`Did not work ${ex}`)
  }
  finally
  {
    await client.end()
    console.log(`Database connection closed`)
  }
}

execute()
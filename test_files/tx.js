const { Client } = require('pg')

const client = new Client({
  user: 'lambda_dev',
  password: 'i<3Lambd4',
  host: 'devdb.ci2w4mxsfhhy.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'thursdaydb'
})

execute()

async function execute() {
  try {
    await client.connect()
    await client.query(`BEGIN`)
    await client.query(`update public."Roles" set name = $1`, ['ios Developer'])
    const { rows } = client.query(`select from public."Roles"`)
    console.table(rows)
    await client.query(`insert into public."Roles" values ($1, $2)`, [2, 'ios Developer'])

    console.log(`Inserted a new row`)
    await client.query(`COMMIT`)
  }
  catch (ex) {
    console.log(`Failed to execute something ${ex}`)
    await client.query("ROLLBACK")
  }
  finally {
    await client.end(`Connection closed`)
  }
}
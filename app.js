const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('./db/mongodb')
const schema = require('./schema/schema')
const cors = require('cors')
const app = express()
 
app.use(cors())
app.use('/graphql' , graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(3000, () => {
  console.log('Start Server in port ', 3000);
})
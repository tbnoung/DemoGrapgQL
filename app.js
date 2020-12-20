const express = require('express')
const { graphqlHTTP } = require('express-graphql')
require('./db/mongodb')
const schema = require('./schema/schema')
const Test = require('./schema')
const app = express()

app.use('/graphql' , graphqlHTTP({
  graphiql: true,
  schema: schema
}))

app.listen(4000, () => {
  console.log('Start Server in port ', 4000);
})
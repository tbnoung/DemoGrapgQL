const graphql = require('graphql')

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat
} = graphql

// Scalar Type 
const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'Represents a Person Type',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type : new GraphQLNonNull(GraphQLString)},
    age: {type:  GraphQLInt},
    isMarried: {type: GraphQLBoolean},
    gpa: {type: GraphQLFloat},
    justAType: {
      type: Person,
      resolve(parent, args) {
        return parent
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
name: 'RootQueryType',
  description: 'Root Description',
  fields: {
    person: {
      type: Person,
      resolve(parent, args) {
      let personObj = {
        name: 'Antonio',
        age: 40,
        isMarried: true,
        gpa: 3.5
      }
      return personObj
    }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})
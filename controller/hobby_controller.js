const graphiql = require('graphql')
const UserDataDB = require('../model/User')
const { UserType } = require('./user_controller')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphiql

const HobbyType = new GraphQLObjectType({
  name: 'Hobby',
  description: 'Hobby description',
  fields: () => ({
    id: {type: GraphQLString},
    title: {type: GraphQLString},
    description: {type: GraphQLString},
    userid: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args) {
        return UserDataDB.findById(parent.userid)
      }
    }
  })
})
module.exports = HobbyType
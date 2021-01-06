const graphiql = require('graphql')
const HobbyType  = require('./hobby_controller')
const PostData  = require('./post_controller')
const HobbyDataDB = require('../model/User')
const PostDataDB = require('../model/Post')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphiql

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Document for user...',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    profession: {type: GraphQLString},
    posts: {
      type: new GraphQLList(PostData),
      resolve(parent, args) {
        return PostDataDB.findById(parent.id)
      }
    },
    hobbies: {
      type: new GraphQLList(HobbyType),
      resolve(parent, args) {
        return HobbyDataDB.findById(parent.id)
      }
    }
  })
})

module.exports = UserType
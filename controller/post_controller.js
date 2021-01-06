const graphiql = require('graphql')
const UserDataDB = require('../model/User')
const { UserType } = require('./user_controller')
const {
  GraphQLObjectType,
  GraphQLString,
} = graphiql

const PostData =  new GraphQLObjectType({
  name: 'PostData',
  description: 'PostData description',
  fields: () => ({
    id: {type: GraphQLString},
    comment: {type: GraphQLString},
    userid: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(parent, args){
        return UserDataDB.findById(parent.userid)
      }
    }
  })
})

module.exports = PostData
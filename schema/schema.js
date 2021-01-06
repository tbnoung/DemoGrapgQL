const graphiql = require('graphql')
const UserDataDB = require('../model/User')
const HobbyDataDB = require('../model/Hobby')
const PostDataDB = require('../model/Post')
const  UserType  = require('../controller/user_controller')
const  HobbyType   = require('../controller/hobby_controller')
const  PostData  = require('../controller/post_controller')

var _ = require('lodash')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = graphiql

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Description',
  fields: {
    user: {
      type: UserType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        return UserDataDB.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args){
        return UserDataDB.find({})
      }
    },
    hobby: {
      type: HobbyType,
      args: {id: {type: GraphQLID}},
      resolve (parent, args) {
        return HobbyDataDB.findById(args.id)
      }
    },
    hobbies: {
      type: new graphiql.GraphQLList(HobbyType),
      resolve(parent, args) {
        return HobbyDataDB.find({})
      }
    },
    post: {
      type: PostData,
      args: {id: {type: GraphQLID}},
      resolve (parent, args) {
        return PostDataDB.findById(args.id)
      }
    },
    posts: {
      type: new graphiql.GraphQLList(PostData),
      resolve(parent, args) {
        return PostDataDB.find({})
      }
    }
  }
})

// Mutations
const Mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    CreateUser: {
      type: UserType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
      },
      resolve(parent, args) {
        let user = new UserDataDB ({
          name: args.name,
          age: args.age,
          profession: args.profession
        })
        return user.save()
      }
    },
    UpdateUser: {
      type: UserType,
      args: {
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
      },
      resolve(parent, args) {
        return updateUser= UserDataDB.findByIdAndUpdate(
          args.id,
          {
            $set: {
              name: args.name,
              age: args.age,
              profession: args.profession
            }
          },
          {new: true}
        )
      }
    },
    RemoveUser: {
      type: UserType,
      args: {
        id: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        let removeuser = UserDataDB.findByIdAndRemove(
          args.id
        ).exec()
        // if (!removeuser) {
        //   throw new('Error')
        // }
        return removeuser
      }
    },
    // todo CreatePost Mutation
    CreatePost: {
      type: PostData,
      args: {
        comment: {type: GraphQLString},
        userid: {type: GraphQLID}
      },
      resolve(parent, args) {
        let post = new PostDataDB ({ 
          comment: args.comment,
          userid: args.userid
        })
        return post.save()
      }
    },
    UpdatePost: {
      type: PostData,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        comment: {type: new GraphQLNonNull(GraphQLString)}
      }, 
      resolve(parent, args) {
        return updatepost = PostDataDB.findByIdAndUpdate(
          args.id,
          {
            $set: {
              comment: args.comment
            }
          },
          {new: true}
        )
      }
    },
    RemovePost: {
      type: PostData,
      args: {
        id: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return removepost = PostDataDB.findByIdAndRemove(
          args.id
        ).exec()
        // if (!removepost) {
        //   throw new('Error')
        // }
        return removepost
      }
    },
    CreateHobby: {
      type: HobbyType,
      args: {
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        userid: {type: GraphQLID}
      },
      resolve(parent, args) {
        let hobby = new HobbyDataDB ({
          title: args.title,
          description: args.description,
          userid: args.userid
        })
        return hobby.save()
      }
    },
    UpdateHobby: {
      type: HobbyType,
      args: {
        id: {type: new GraphQLNonNull(GraphQLString)},
        title: {type: new GraphQLNonNull(GraphQLString)},
        description: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return updatehobby = HobbyDataDB.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description
            }
          },
          {new: true}
        )
      }
    },
    RemoveHobby: {
      type: HobbyType,
      args: {
        id: {type: GraphQLNonNull(GraphQLString)}
      },
      resolve(parent, args) {
        return removehobby = HobbyDataDB.findByIdAndRemove(
          args.id
        ).exec()
        // if (!removehobby) {
        //   throw new('Error')
        // }
        return removehobby
      }
    },
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutations
})
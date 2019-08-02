const graphql=require('graphql');
const_=require('lodash');

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;
const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type : GraphQLString},
        genre:{type: GraphQLString}
    })
})
var books=[
    {name : 'Name of the wind' , genre: 'Fantasy' , id: '1'},
    {name : 'The final Empire' , genre: 'Fantasy' , id: '2'},
    {name : 'The Long Earth' , genre: 'Science-Fiction' , id: '3'}
]
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //code to get data from db
                _.find(books,{id:args.id})
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query:RootQuery
})


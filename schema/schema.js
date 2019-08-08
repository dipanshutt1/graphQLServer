const graphql=require('graphql');
const _=require('lodash');
const Book=require('../models/book');
const Author=require('../models/author');

// var books=[
//     {name : 'Name of the wind' , genre: 'Fantasy' , id: '1',authorId:'1'},
//     {name : 'The final Empire' , genre: 'Fantasy' , id: '2',authorId:'2'},
//     {name : 'The Long Earth' , genre: 'Science-Fiction' , id: '3',authorId:'3'},
//     {name : 'The age of heros' , genre: 'Fantasy' , id: '4' , authorId:'2'},
//     {name : 'The color of magic' , genre: 'Fantasy' , id: '5' , authorId:'1'},
//     {name : 'The fear of fantasy' , genre: 'Fantasy' , id: '6' , authorId:'2'}
//     ]
//
// var authors=[
//     {name: 'Brandon Eichh' , age: '65' , id: '1'},
//     {name: 'Peter' , age: '40' , id:'2'},
//     {name: 'John Carter', age:'50', id :'3'}
//     ]

const {GraphQLObjectType,GraphQLString,GraphQLSchema,GraphQLID,GraphQLInt,GraphQLList} = graphql;
const BookType=new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        name:{type:GraphQLString},
        genre:{type: GraphQLString},
        id:{type : GraphQLID},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                // return _.find(authors,{id:parent.authorId})
            }
        }
    })
})

const AuthorType=new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        id:{type:GraphQLID},
        // book:{
        //     type: new GraphQLList(BookType),
        //     resolve(parent,args){
        //         // return _.filter(books,{authorId:parent.id})
        //     }
        // }
    })
})
const RootQuery=new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                //code to get data from db
                // console.log(typeof (args.id));
                // return _.find(books,{id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
            }
        }
    }
})

const Mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt},
                id: {type: GraphQLID}
            },
            resolve(parent,args){
                let author=new Author({
                    name:args.name,
                    age:args.age,
                    id:args.id
                });
                console.log(author);
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString}
        },
            resolve(parent,args){
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    id:args.id
                });
                return book.save();
            }
    }
}})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})


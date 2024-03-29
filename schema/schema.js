const graphql=require('graphql');
const _=require('lodash');
const Book=require('../models/book');
const Author=require('../models/author');

const   {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull} = graphql;
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
                return Author.findById(parent.authorId);
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
        book:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
                return Book({authorId:parent.id});
            }
        }
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
                return Book.findById(args.id);
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
                return Author.findById(args.id);
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({}); //empty bracket denotes that it will return all books
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                // return authors
                return Author.find({});
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
                name: {type: new GraphQLNonNull(GraphQLString)},
                age: {type: new GraphQLNonNull(GraphQLInt)},
                id: {type: new GraphQLNonNull(GraphQLID)}
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
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLID)}
        },
            resolve(parent,args){
                let book=new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                });
                return book.save();
                console.log("changed schema")
            }
    }
}})

module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})


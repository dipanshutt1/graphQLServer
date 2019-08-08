const express=require ('express');
const schema=require('./schema/schema');
const mongoose=require('mongoose')
const app=express();
const graphqlHTTP=require('express-graphql');
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));
mongoose.connect('mongodb://localhost:27017/graph',{useNewUrlParser:true});

mongoose.connection.once('open',()=>{
    console.log("application connected to  mongodb");
});
app.listen(3001,()=>{
    console.log("the server is started at 3001 port");
})

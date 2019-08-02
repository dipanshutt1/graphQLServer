const express=require ('express');
const schema=require('./schema/schema');
const app=express();
const graphqlHTTP=require('express-graphql');
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(3001,()=>{
    console.log("the server is started at 3001 port");
})
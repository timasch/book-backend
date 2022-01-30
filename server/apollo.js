const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const MongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const app = express();
const path = "/api/graphql";

const graphqlTypeDefs = require('./graphqlTypeDefs');
const graphqlResolvers = require('./graphqlResolvers');
const MONGODB_CONNECTION_STRING="MongoDB Atlas connection string here!";

app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Headers', 'Content-Type');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const uri = MONGODB_CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("MongoDB connected!");
    db = client.db("GraphQL");
    if(err) {
        console.log("MongoDB connection Failed!");
    }
});

 const startServer = async () => {
     // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    server = new ApolloServer({
        typeDefs: graphqlTypeDefs,
        resolvers: graphqlResolvers,
    });

    await server.start();
    server.applyMiddleware({ app, path });
                                // The `listen` method launches a web server.
    await new Promise(resolve => app.listen({ port: 8000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:8000${server.graphqlPath}`);
    return { server, app };
}

startServer();
const { ObjectID } = require('bson');

const graphqlResolvers = {
    Query: {
      readBook: async (parent, args) => {
        const filter = { _id: ObjectID(args._id)};
        const data = await db.collection('books').findOne(filter);
        return data;
      },
      readAllBooks: async (parent, args) => {
        const data = await db.collection('books').find()
          .toArray()
          .then((res) => {
            return res;
          });
        return data;
      }
    },
    Mutation: {   
      addBook: async (parent, args) => {
        const bookObj ={
          title: args.title,
          author: args.author,
          country: args.country,
          language: args.language,
          link: args.link,
          pages: args.pages,
          year: args.year
        }
        const collectionName = 'books';
        await db.collection(collectionName).insertOne(bookObj);
        return bookObj;
      }, 
      updateBook: async (parent, args) => {  
        const filter = { _id: ObjectID(args._id) };
        const bookObj = {
          $set: {
            title: args.title,
            author: args.author,
            country: args.country,
            language: args.language,
            link: args.link,
            pages: args.pages,
            year: args.year
          },
        };
        const collectionName = 'books';
        await db.collection(collectionName).updateOne(filter, bookObj); 
        return bookObj;     
     },
      deleteBook: async (parent, args) => {
        const filter = { _id: ObjectID(args._id) };
        const collectionName = 'books';
        await db.collection(collectionName).deleteOne(filter);
      },    
    },   
  };

  module.exports = graphqlResolvers;
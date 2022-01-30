const { gql } = require("apollo-server-express");

const graphqlTypeDefs = gql`
  type Book {
    _id: ID
    title: String!
    author: String
    country: String
    language: String
    link: String
    pages: Int
    year: Int
  }

  type Query {
    readBook(_id: ID!): Book
    readAllBooks: [Book]
  }

  type Mutation {
    addBook(title: String!, author: String, country: String, language: String, link: String, pages: Int, year: Int): Book
    updateBook(title: String!, author: String, country: String, language: String, link: String, pages: Int, year: Int, _id: ID!): Book
    deleteBook(_id:ID!): Book
  }
`
;

module.exports = graphqlTypeDefs;
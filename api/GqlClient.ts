import { GraphQLClient } from "graphql-request"

const host = process.env.NODE_ENV === 'development' ? process.env.host_dev : process.env.host_prodution

const graphqlClient = new GraphQLClient(
  "http://localhost:8080/graphql",
  { credentials: 'include' }
)

export default graphqlClient
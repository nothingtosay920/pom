import { GraphQLClient } from "graphql-request"


const graphqlClient = new GraphQLClient(
  "180.76.174.196:3000/graphql",
  { credentials: 'include' }
)

export default graphqlClient
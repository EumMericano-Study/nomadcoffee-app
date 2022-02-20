import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

export const isLoggedInVar = makeVar<boolean>(false);

const client = new ApolloClient({
  uri: "https://nomad-sexy-coffee.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default client;

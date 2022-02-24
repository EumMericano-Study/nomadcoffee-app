import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);

export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async (token: string) => {
  await AsyncStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = async () => {
  await AsyncStorageLib.removeItem(TOKEN);
  isLoggedInVar(false);
  tokenVar(undefined);
};

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log("GraphQL Error", graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

const uploadHttpLink = createHttpLink({
  uri: "https://nomad-sexy-coffee.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const httpLink = authLink.concat(onErrorLink).concat(uploadHttpLink);

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

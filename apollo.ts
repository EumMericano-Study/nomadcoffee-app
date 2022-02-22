import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedInVar = makeVar(false);

export const tokenVar = makeVar("");

export const logUserIn = async (token: string) => {
  await AsyncStorage.multiSet([
    ["token", token],
    ["loggedIn", "yes"],
  ]);
  isLoggedInVar(true);
};

const client = new ApolloClient({
  uri: "https://nomad-sexy-coffee.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

export default client;

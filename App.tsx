import { useState } from "react";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { ApolloProvider } from "@apollo/client";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

import TabNav from "./navigators/indexNav";
import client, { isLoggedInVar, tokenVar } from "./apollo";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const onFinish = () => setLoading(false);

  const preloadAssets = async () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));

    const imagesToLoad = [
      require("./assets/icon.png"),
      "http://drive.google.com/uc?export=view&id=1DH9vhX5mF9Qd36m6ShnP3ljc9_o9K0D_",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

    await Promise.all([...fontPromises, ...imagePromises]);
  };

  const preload = async () => {
    const token = await AsyncStorageLib.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }

    return preloadAssets();
  };
  if (loading)
    return (
      <AppLoading
        startAsync={preload}
        onError={console.warn}
        onFinish={onFinish}
      />
    );
  else
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          <TabNav />
        </NavigationContainer>
      </ApolloProvider>
    );
}

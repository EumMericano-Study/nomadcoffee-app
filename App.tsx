import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import AppLoading from "expo-app-loading";

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const onFinish = () => setLoading(false);
  const preload = async () => {
    const fontToLoad = [Ionicons.font];
    const fontPromises = fontToLoad.map((font) => Font.loadAsync(font));

    const imagesToLoad = [
      require("./assets/icon.png"),
      "http://drive.google.com/uc?export=view&id=1DH9vhX5mF9Qd36m6ShnP3ljc9_o9K0D_",
    ];
    const imagePromises = imagesToLoad.map((image) => Asset.loadAsync(image));

    await Promise.all([...fontPromises, ...imagePromises]);
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
      <View style={styles.container}>
        <Text>Hello</Text>
        <Text>
          👨‍🏫
          <Ionicons name="ios-laptop-outline" size={24} color="black" />
          <Ionicons name="ios-laptop-sharp" size={24} color="black" />
          🥰
        </Text>
        <Text>I bought MacBook Pro at 2 weeks ago</Text>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

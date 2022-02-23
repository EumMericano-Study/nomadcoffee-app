import React from "react";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../screens/Profile";
import LogIn from "../screens/LogIn";
import Photo from "../screens/Photo";
import Feed from "../screens/Feed";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Me from "../screens/Me";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const Stack = createNativeStackNavigator();

interface Props {
  screenName: string;
}

export default function SharedStackNav({ screenName }: Props) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "black",
        },
        headerShadowVisible: true,
        headerBackTitleVisible: false,
      }}
    >
      {screenName === "Feed" && (
        <Stack.Screen
          name="Feed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{
                  maxWidth: 100,
                  maxHeight: 45,
                }}
                resizeMode="contain"
                source={require("../assets/charLogo.png")}
              />
            ),
          }}
        />
      )}
      {screenName === "Search" && (
        <Stack.Screen name="Search" component={Search} />
      )}
      {screenName === "Notification" && (
        <Stack.Screen name="Notification" component={Notification} />
      )}
      {screenName === "Me" ? <Stack.Screen name="Me" component={Me} /> : null}
      <Stack.Screen name="Profile" component={isLoggedIn ? Profile : LogIn} />
      <Stack.Screen name="Photo" component={Photo} />
    </Stack.Navigator>
  );
}

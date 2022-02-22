import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

import Feed from "../screens/Feed";
import Search from "../screens/Search";
import LogIn from "../screens/LogIn";
import Profile from "../screens/Profile";
import Notification from "../screens/Notification";

const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        headerTintColor: "white",
        tabBarStyle: {
          borderTopColor: "rgba(255,255,255,0.2)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen name="Feed" component={Feed} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="Notification" component={Notification} />
      <Tabs.Screen name="Profile" component={isLoggedIn ? Profile : LogIn} />
    </Tabs.Navigator>
  );
}

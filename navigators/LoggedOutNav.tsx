import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../screens/Home";
import Search from "../screens/Search";
import LogIn from "../screens/LogIn";
import CreateAccount from "../screens/CreateAccount";

const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        headerTitle: () => false,
        headerTransparent: true,
        headerTintColor: "white",
      }}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Search" component={Search} />
      <Tabs.Screen name="LogIn" component={LogIn} />
      <Tabs.Screen name="CreateAccount" component={CreateAccount} />
    </Tabs.Navigator>
  );
}

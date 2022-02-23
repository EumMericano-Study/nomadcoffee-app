import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Search from "../screens/Search";
import Notification from "../screens/Notification";
import TabIcon from "../components/nav/TabIcon";
import StackNavFactory from "./SharedStackNav";

const Tabs = createBottomTabNavigator();

export default function LoggedOutNav() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "rgba(255,255,255,0.2)",
          backgroundColor: "black",
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="home" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="search" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="camera"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="camera" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="heart" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notification" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="me"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon iconName="person" color={color} focused={focused} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}

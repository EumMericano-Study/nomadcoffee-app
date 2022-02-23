import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  iconName: "camera" | "home" | "search" | "heart" | "person";
  color: string;
  focused: boolean;
}

export default function TabIcon({ iconName, color, focused }: Props) {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={22}
    />
  );
}

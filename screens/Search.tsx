import { Text, TouchableOpacity, View } from "react-native";
import { Props } from "../types";

export default function Search({ navigation }: Props) {
  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Text style={{ color: "white" }}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
  Search: undefined;
  LogIn?: { username: string; password: string };
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

export default Props;

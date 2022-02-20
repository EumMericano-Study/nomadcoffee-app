import { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  LogIn: undefined;
  CreateAccount: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList>;

export default Props;

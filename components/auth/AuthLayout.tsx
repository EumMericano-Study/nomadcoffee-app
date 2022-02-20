import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";

interface Prop {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Prop) {
  const dismiss = () => Keyboard.dismiss();
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={dismiss}
      disabled={Platform.OS === "web"}
    >
      <Container>
        <KeyboardAvoidingView
          style={{
            width: "100%",
          }}
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 0}
        >
          <Logo
            resizeMode="contain"
            source={require("../../assets/charLogo.png")}
          />
          {children}
        </KeyboardAvoidingView>
      </Container>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: black;

  padding: 0px 30px;
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 150px;
`;

import React from "react";
import styled from "styled-components/native";
import { color } from "../color";
import { Props } from "../types";

export default function Welcome({ navigation }: Props) {
  return (
    <Container>
      <Logo resizeMode="contain" source={require("../assets/charLogo.png")} />
      <CreateAccount>
        <CreateAccountText onPress={() => navigation.navigate("LogIn")}>
          Home
        </CreateAccountText>
      </CreateAccount>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${color.black};
`;

const Logo = styled.Image`
  max-width: 50%;
  height: 200px;
`;

const CreateAccount = styled.View`
  background-color: ${color.darkYellow};
`;
const CreateAccountText = styled.Text`
  color: ${color.black};
`;

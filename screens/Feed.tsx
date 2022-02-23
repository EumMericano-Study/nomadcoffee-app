import React from "react";
import styled from "styled-components/native";
import { color } from "../color";
import { Props } from "../types";

export default function Feed({ navigation }: Props) {
  return (
    <Container>
      <CreateAccount>
        <CreateAccountText onPress={() => navigation.navigate("Profile")}>
          Feed
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

const CreateAccount = styled.View`
  background-color: ${color.darkYellow};
`;
const CreateAccountText = styled.Text`
  color: ${color.black};
`;

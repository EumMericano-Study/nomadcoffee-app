import { gql, useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components/native";
import { logUserOut } from "../apollo";
import { color } from "../color";
import { Props } from "../types";

const FEED_QUERY = gql`
  query seeCoffeeShops {
    seeCoffeeShops {
      name
      user {
        username
        avatarURL
      }
      photos {
        url
      }
      categories {
        name
        slug
      }
    }
  }
`;

export default function Feed({ navigation }: Props) {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <Container>
      <CreateAccount>
        <CreateAccountText onPress={() => navigation.navigate("Profile")}>
          Feed
        </CreateAccountText>
        <CreateAccountText onPress={() => logUserOut()}>
          Logout
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

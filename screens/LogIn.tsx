import React, { useEffect } from "react";
import { Text } from "react-native";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { Props } from "../types";
import { isLoggedInVar } from "../apollo";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function LogIn({ navigation }: Props) {
  const { register, handleSubmit, setValue, watch } = useForm();

  const onCompleted = (data: any) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onValid = (data: { [x: string]: string }) => {
    if (!loading) {
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("userame");
    register("password");
  }, [register]);

  return (
    <AuthLayout>
      <Text>LogIn</Text>
      <AuthButton
        text="Go to Create Account"
        disabled={false}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

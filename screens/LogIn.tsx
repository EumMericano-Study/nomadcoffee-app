import React, { useEffect, useRef } from "react";
import { Text, TextInput } from "react-native";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { isLoggedInVar, logUserIn } from "../apollo";
import { StyledTextInput } from "../components/auth/AuthShared";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function LogIn({ route: { params } }: any) {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: { password: params?.password, username: params?.username },
  });

  const passwordRef = useRef<TextInput>(null);

  const onCompleted = async (data: any) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
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

  const onNext = (nextOne: React.RefObject<TextInput>) =>
    nextOne?.current?.focus();

  useEffect(() => {
    register("username", {
      required: true,
    });
    register("password", {
      required: true,
    });
  }, [register]);

  return (
    <AuthLayout>
      <Text>LogIn</Text>
      <StyledTextInput
        placeholder="아이디"
        placeholderTextColor="rgba(255,255,255,0.8)"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text: string) => setValue("username", text)}
      />
      <StyledTextInput
        ref={passwordRef}
        placeholder="비밀번호"
        placeholderTextColor="rgba(255,255,255,0.8)"
        returnKeyType="next"
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text: string) => setValue("password", text)}
      />
      <AuthButton
        text="계정 생성"
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

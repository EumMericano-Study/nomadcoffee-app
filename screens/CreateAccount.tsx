import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput } from "react-native";
import { gql, useMutation } from "@apollo/client";

import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { StyledTextInput } from "../components/auth/AuthShared";
import { Props } from "../types";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }: Props) {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onCompleted = (data: any) => {
    console.log(data);
    const {
      createAccount: { ok },
    } = data;
    const { username, password } = getValues();
    if (ok) navigation.navigate("LogIn", { username, password });
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const onNext = (nextRef: React.RefObject<TextInput>) =>
    nextRef?.current?.focus();

  const onValid = (data: { [x: string]: string }) => {
    console.log(loading, data);
    if (!loading) createAccountMutation({ variables: { ...data } });
  };

  useEffect(() => {
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <Text>CreateAccount</Text>
      <StyledTextInput
        placeholder="아이디"
        placeholderTextColor="rgba(255,255,255,0.8)"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text: string) => setValue("username", text)}
      />
      <StyledTextInput
        ref={emailRef}
        placeholder="이메일"
        placeholderTextColor="rgba(255,255,255,0.8)"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text: string) => setValue("email", text)}
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
        text="Create Account"
        disabled={!watch("username") || !watch("email") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

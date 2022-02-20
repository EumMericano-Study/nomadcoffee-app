import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Text, TextInput } from "react-native";

import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

export default function CreateAccount() {
  const { register, handleSubmit, setValue } = useForm();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onNext = (nextRef: React.RefObject<TextInput>) =>
    nextRef?.current?.focus();

  const onValid = (data: { [x: string]: string }) => {
    console.log(data);
  };

  useEffect(() => {
    register("userame");
    register("email");
    register("password");
  }, [register]);

  return (
    <AuthLayout>
      <Text>CreateAccount</Text>

      <TextInput
        autoFocus
        placeholder="Username"
        placeholderTextColor="gray"
        returnKeyType="next"
        style={{ width: "100%", backgroundColor: "white" }}
        onSubmitEditing={() => onNext(emailRef)}
        onChangeText={(text: string) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="gray"
        keyboardType="email-address"
        returnKeyType="next"
        style={{ width: "100%", backgroundColor: "white" }}
        onSubmitEditing={() => onNext(passwordRef)}
        onChangeText={(text: string) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="gray"
        secureTextEntry
        returnKeyType="done"
        style={{ width: "100%", backgroundColor: "white" }}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text: string) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={true}
        loading
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

import React, { useEffect } from "react";
import { Text } from "react-native";
import { useForm } from "react-hook-form";
import { gql } from "@apollo/client";

import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";
import { Props } from "../types";

const LOG_IN_MUTATION = gql``;

export default function LogIn({ navigation }: Props) {
  const { register, handleSubmit, setValue } = useForm();

  const onValid = (data: { [x: string]: string }) => {
    console.log(data);
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
        loading
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

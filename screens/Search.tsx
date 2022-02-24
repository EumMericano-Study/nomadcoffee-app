import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import DismissKeyboard from "../components/DismissKeyboard";
import { Props } from "../types";
import Photo from "./Photo";

const SEARCH_COFFEESHOPS = gql`
  query searchCoffeeShops($keyword: String!) {
    searchCoffeeShops(keyword: $keyword) {
      id
      name
    }
  }
`;

export default function Search({ navigation }: Props) {
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const { register, setValue, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data, called }] = useLazyQuery(
    SEARCH_COFFEESHOPS,
    {
      variables: {
        keyword: watch("keyword"),
      },
    }
  );

  const onValid = ({ keyword }: { [x: string]: string }) => {
    startQueryFn({ variables: { keyword } });
  };

  const SearchBox = () => (
    <Input
      width={width}
      placeholderTextColor="rgba(0,0,0,0.8)"
      placeholder="Search photos"
      autoCapitalize="none"
      returnKeyLabel="Search"
      returnKeyType="search"
      onChangeText={(text: string) => setValue("keyword", text)}
      autoCorrect={false}
      onSubmitEditing={handleSubmit(onValid)}
    />
  );

  const renderItem = ({ item: coffeeShop }: any) => (
    <TouchableOpacity>
      <Image
        source={{ uri: coffeeShop?.file }}
        style={{ width: width / numColumns, height: 100 }}
      />
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
    register("keyword", { required: true, minLength: 3 });
  }, []);

  return (
    <DismissKeyboard>
      <View style={{ flex: 1, backgroundColor: "black" }}>
        {loading && (
          <MessageContainer>
            <ActivityIndicator size="large" />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        )}
        {!called && (
          <MessageContainer>
            <MessageText>Search by Keyword</MessageText>
          </MessageContainer>
        )}
        {data?.searchCoffeeShops !== undefined ? (
          data?.searchCoffeeShops.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              numColumns={numColumns}
              data={data?.searchCoffeeShops}
              keyExtractor={(coffeeShop) => String(coffeeShop.id)}
              renderItem={renderItem}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
}

const Input = styled.TextInput`
  width: ${(props: { width: number }) => props.width / 1.5}px;

  background-color: white;
  color: black;

  padding: 5px 10px;
  border-radius: 7px;
`;

const MessageContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const MessageText = styled.Text`
  color: ${color.darkYellow};
  font-weight: 600;

  margin-top: 15px;
`;

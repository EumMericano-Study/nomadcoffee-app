import styled from "styled-components/native";

export const StyledTextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  color: white;

  padding: 15px 5px;
  margin-bottom: ${(props: { lastOne: boolean }) => (props.lastOne ? 15 : 8)}px;
  border-radius: 4px;
`;

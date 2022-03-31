import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 90%;
  height: 50px;
  background-color: ${props => (props.disabled ? 'gray' : 'blue')};
  border: 2px solid black;
  color: white;
  align-self: center;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 20px;
  color: white;
`;

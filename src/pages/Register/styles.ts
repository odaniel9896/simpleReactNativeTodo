import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: black;
  font-family: sans-serif;
  text-align: center;
  margin-top: 20px;
`;

export const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  margin-top: 20px;
  border: 1px solid black;
  align-self: center;
`;

export const ImageView = styled.Image`
  width: 200px;
  margin-top: 20px;
  height: 200px;
  align-self: center;
`;

export const ContainerData = styled.View`
  width: 90%;
  align-self: center;
  height: 60px;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
`;

export const DataText = styled.Text`
  font-size: 20px;
  color: black;
  margin-left: 15px;
`;

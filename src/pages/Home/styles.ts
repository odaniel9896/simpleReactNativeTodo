import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const CardUser = styled.View`
  width: 90%;
  height: 70px;
  border: 2px solid black;
  align-self: center;
  margin-top: 20px;
  flex-direction: row;
`;

export const UserNameContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: center;
  margin-left: 20px;
  /* flex-direction: row; */
`;

export const OptionsContainer = styled.View`
  width: 50%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* flex-direction: row; */
`;

export const UserName = styled.Text`
  font-size: 20px;
  color: black;
  font-weight: bold;
`;

export const ButtonAddUser = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 3px solid black;
  color: black;
  position: absolute;
  background-color: cyan;
  bottom: 20px;
  right: 10px;
  justify-content: center;
  align-items: center;
`;

export const TextAdd = styled.Text`
  font-size: 30px;
  color: black;
`;

export const Loading = styled.ActivityIndicator`
  margin: auto auto;
  z-index: 999;
`;

export const NotUsersFound = styled.Text`
  margin: auto auto;
  font-size: 20px;
  width: 80%;
  text-align: center;
  font-weight: bold;
`;

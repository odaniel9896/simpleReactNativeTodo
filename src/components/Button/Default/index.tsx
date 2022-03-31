import React from 'react';
import {TextStyle} from 'react-native';
import {Container, Text} from './styles';

type Props = {
  onPress: () => void;
  text: string;
  style?: TextStyle;
};

const DefaultButton: React.FC<Props> = ({onPress, style, text}) => {
  return (
    <Container onPress={onPress} style={style}>
      <Text>{text}</Text>
    </Container>
  );
};
export {DefaultButton};

import React from 'react';
import {TextStyle} from 'react-native';
import {Container, Text} from './styles';

type Props = {
  onPress: () => void;
  text: string;
  style?: TextStyle;
  disabled: true | false;
};

const DefaultButton: React.FC<Props> = ({onPress, style, text, disabled}) => {
  return (
    <Container onPress={onPress} style={style} disabled={disabled}>
      <Text>{text}</Text>
    </Container>
  );
};
export {DefaultButton};

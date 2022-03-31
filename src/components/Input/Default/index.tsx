import React from 'react';
import {Container} from './styles';

type Props = {
  placeholder: string;
  keyboardType?: any;
  id: string;
};

const Input: React.FC<Props> = ({placeholder, keyboardType}) => {
  return (
    <Container
      placeholder={placeholder}
      keyboardType={keyboardType || 'default'}
      placeholderTextColor="black"
    />
  );
};
export {Input};

import React, {useCallback, useEffect, useState} from 'react';
import {Container, Title, Input, ImageView} from './styles';
import DatePicker from 'react-native-date-picker';
import {DefaultButton} from '../../components/Button/Default';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {storageInFirebase} from '../../utils/firebase';

const Register: React.FC = () => {
  const [dateModal, setDateModal] = useState(false);
  const [values, setValues] = useState({});
  const [date] = useState(new Date());
  const [image, setImage] = useState<any | null>(null);

  const handleGetImage = useCallback(async options => {
    launchImageLibrary(options, setImage);
  }, []);

  const handleChangeText = (text: string, type: string) => {
    setValues({...values, [type]: text});
  };

  const handleCreateUser = () => {
    storageInFirebase(image.assets[0].uri);
  };

  // useEffect(() => {
  //   if (image) {
  //     setImage(image.assets[0].uri);
  //   }
  // }, [image]);

  return (
    <Container>
      <Title>Cadastre um usuário</Title>
      <Input
        placeholder="Nome"
        keyboardType="default"
        onChangeText={(text: string) => handleChangeText(text, 'name')}
      />
      <Input
        placeholder="Código"
        keyboardType="numeric"
        onChangeText={(text: string) => handleChangeText(text, 'code')}
      />
      <DefaultButton
        text="Selecione a data"
        onPress={() => setDateModal(true)}
        style={{
          backgroundColor: 'black',
          width: 'auto',
          padding: 10,
          alignSelf: 'flex-start',
          marginLeft: '5%',
        }}
      />

      {image ? (
        <ImageView source={{uri: image.assets[0].uri}} />
      ) : (
        <TouchableOpacity
          onPress={() =>
            handleGetImage({
              selectionLimit: 0,
              mediaType: 'photo',
              includeBase64: false,
            })
          }>
          <Icon
            name="image"
            size={200}
            color="gray"
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
      )}

      <DefaultButton onPress={handleCreateUser} text="Cadastrar" />
      <DatePicker
        modal
        date={date}
        open={dateModal}
        mode="date"
        onConfirm={confirmDate => {
          setDateModal(false);
          setValues({...values, date: confirmDate});
        }}
        onCancel={() => setDateModal(false)}
        locale="pt-br"
      />
    </Container>
  );
};

export {Register};

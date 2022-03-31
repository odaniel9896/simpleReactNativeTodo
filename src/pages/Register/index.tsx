import React, {useCallback, useEffect, useState} from 'react';
import {
  Container,
  Title,
  Input,
  ImageView,
  ContainerData,
  DataText,
} from './styles';
import DatePicker from 'react-native-date-picker';
import {DefaultButton} from '../../components/Button/Default';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import {
  registerUserInFirebase,
  storageInFirebase,
  updateFirebaseData,
} from '../../utils/firebase';
import {Loading} from '../Home/styles';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {useRoute} from '@react-navigation/native';

const Register: React.FC = () => {
  const [dateModal, setDateModal] = useState(false);
  const [values, setValues] = useState({
    date: '',
    name: '',
    code: '',
    id: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [imageResponse, setImageResponse] = useState<any | null>(null);
  const [image, setImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleGetImage = useCallback(async options => {
    launchImageLibrary(options, setImageResponse);
  }, []);

  const handleChangeText = (text: string, type: string) => {
    setValues({...values, [type]: text});
  };

  useEffect(() => {
    if (imageResponse && imageResponse.didCancel !== true) {
      setImage(imageResponse.assets[0].uri);
    }
  }, [imageResponse]);

  const handleOnSubmit = async () => {
    setIsLoading(true);
    if (!isEditing) {
      const url = await storageInFirebase(image);
      registerUserInFirebase({
        code: Number(values.code),
        date: values.date,
        name: values.name,
        image: url,
      });
    } else {
      updateFirebaseData({
        code: Number(values.code),
        date: values.date,
        name: values.name,
        image,
        id: values.id,
      });
    }
    setIsLoading(false);

    Toast.show({
      type: 'success',
      text1: 'Usuário cadastrado/Atualizado',
      position: 'bottom',
      visibilityTime: 2000,
    });
    return navigation.goBack();
  };

  useEffect(() => {
    const params: any = route.params;
    if (params) {
      setIsEditing(true);
      setValues({
        code: String(params.code),
        date: params.date,
        name: params.name,
        id: params.id,
      });
      setImage(params.image);
    }
  }, [route]);

  return (
    <Container>
      {isLoading ? (
        <Loading size={90} color="black" />
      ) : (
        <>
          <Title>Cadastre um usuário</Title>
          <Input
            placeholder="Nome"
            keyboardType="default"
            onChangeText={(text: string) => handleChangeText(text, 'name')}
            value={values.name}
          />
          <Input
            placeholder="Código"
            keyboardType="numeric"
            onChangeText={(text: string) => handleChangeText(text, 'code')}
            value={values.code}
          />
          <TouchableOpacity onPress={() => setDateModal(true)}>
            <ContainerData>
              <Icon name="calendar" size={35} color="black" />

              <DataText>
                {values.date ? values.date : 'Selecione uma data'}
              </DataText>
            </ContainerData>
          </TouchableOpacity>

          {image ? (
            <TouchableOpacity
              onPress={() =>
                handleGetImage({
                  selectionLimit: 0,
                  mediaType: 'photo',
                  includeBase64: false,
                })
              }>
              <ImageView
                source={{uri: image}}
                onLoadEnd={() => setIsLoading(false)}
              />
            </TouchableOpacity>
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

          <DefaultButton
            onPress={handleOnSubmit}
            text="Cadastrar"
            disabled={!values.code || !values.date || !image || !values.name}
          />

          <DatePicker
            modal
            date={date}
            onDateChange={setDate}
            title="Selecione uma data"
            open={dateModal}
            mode="date"
            locale="pt-br"
            onConfirm={confirmDate => {
              setDateModal(false);
              setDate(confirmDate);
              setValues({
                ...values,
                date: confirmDate.toLocaleDateString('pt-br', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                }),
              });
            }}
            onCancel={() => setDateModal(false)}
          />
        </>
      )}
    </Container>
  );
};

export {Register};

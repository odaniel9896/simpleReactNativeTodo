import React, {useEffect, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import {removeFirebaseData} from '../../utils/firebase';
import {
  CardUser,
  Container,
  UserNameContainer,
  OptionsContainer,
  UserName,
  ButtonAddUser,
  TextAdd,
  Loading,
  NotUsersFound,
} from './styles';
import {UserRepository} from '../../entities/user';
import Toast from 'react-native-toast-message';

type Navigation = {
  navigation: any;
};

const Home: React.FC<Navigation> = ({navigation}) => {
  const [users, setUsers] = useState<UserRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditUser = (params: UserRepository) => {
    navigation.navigate('Register', params);
  };

  const handleDeleteUser = (id: string) => {
    removeFirebaseData(id);
    Toast.show({
      type: 'success',
      text1: 'Usuário Deletado',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  useEffect(() => {
    setIsLoading(true);
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(query => {
        const response: any = [];
        query.forEach(document => {
          response.push({
            ...document.data(),
            id: document.id,
          });
        });
        setUsers(response);
        setIsLoading(false);
      });
    return () => subscriber();
  }, []);

  return (
    <Container>
      {users.length ? (
        <FlatList
          data={users.sort((ascend, descend) =>
            ascend.name.localeCompare(descend.name),
          )}
          renderItem={({item}) => {
            return (
              <CardUser>
                <UserNameContainer>
                  <UserName>
                    {item.name} | {item.code}
                  </UserName>
                </UserNameContainer>
                <OptionsContainer>
                  <Icon
                    name="deleteuser"
                    size={30}
                    color={'black'}
                    onPress={() =>
                      Alert.alert(
                        'Deletar usuário',
                        'Deseja deletar esse usuário ?',
                        [
                          {
                            text: 'Deletar',
                            onPress: () => handleDeleteUser(item.id),
                          },
                          {
                            text: 'Cancelar',
                          },
                        ],
                        {cancelable: false},
                      )
                    }
                  />
                  <Icon
                    name="edit"
                    size={30}
                    color={'black'}
                    style={{marginLeft: 15}}
                    onPress={() => handleEditUser(item)}
                  />
                </OptionsContainer>
              </CardUser>
            );
          }}
        />
      ) : isLoading ? (
        <Loading size={90} color="black" />
      ) : (
        <NotUsersFound>
          Nenhum usuário encontrado. Cadastre algum.
        </NotUsersFound>
      )}

      <ButtonAddUser onPress={() => navigation.navigate('Register')}>
        <TextAdd>+</TextAdd>
      </ButtonAddUser>
    </Container>
  );
};
export {Home};

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
} from './styles';
import {UserRepository} from '../../entities/user';

type Navigation = {
  navigation: any;
};

const Home: React.FC<Navigation> = ({navigation}) => {
  const [users, setUsers] = useState<UserRepository[]>([]);

  const handleEditUser = () => {
    navigation.navigate('Register');
  };

  const handleDeleteUser = (id: string) => {
    removeFirebaseData(id);
  };

  useEffect(() => {
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
      });
    return () => subscriber();
  }, []);

  return (
    <Container>
      {users.length ? (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
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
                    onPress={() => handleEditUser()}
                  />
                </OptionsContainer>
              </CardUser>
            );
          }}
        />
      ) : (
        <Loading size={90} color="black" />
      )}

      <ButtonAddUser onPress={() => navigation.navigate('Register')}>
        <TextAdd>+</TextAdd>
      </ButtonAddUser>
    </Container>
  );
};
export {Home};

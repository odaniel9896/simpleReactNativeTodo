import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {Platform} from 'react-native';
import {utils} from '@react-native-firebase/app';

import {UserRepository} from '../entities/user';

export function addDataInDocument(params: UserRepository) {
  firestore()
    .collection('users')
    .add(params)
    .then(() => {});
}

export function removeFirebaseData(id: string) {
  firestore()
    .collection('users')
    .doc(id)
    .delete()
    .then(() => {
      console.log('user deleted');
    });
}

export async function storageInFirebase(uri: string) {
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  const reference = storage().ref(fileName);
  // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  // console.log(
  //   '🚀 ~ file: firebase.ts ~ line 29 ~ storageInFirebase ~ uploadUri',
  //   uploadUri,
  // );

  // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/${uri}`;

  const task = reference.putFile(uri);

  task.on('state_changed', taskSnapshot => {
    console.log(
      `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    );
  });

  task.then(() => {
    console.log('Image uploaded to the bucket!');
  });
}

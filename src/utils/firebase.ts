import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {UserRepository} from '../entities/user';

export function registerUserInFirebase(params: UserRepository) {
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

export async function updateFirebaseData(params: UserRepository) {
  firestore()
    .collection('users')
    .doc(params.id)
    .update(params)
    .then(() => {
      console.log('user updated');
    })
    .catch(error => console.log(error));
}

export async function storageInFirebase(uri: string): Promise<string> {
  const fileName = uri.substring(uri.lastIndexOf('/') + 1);
  const reference = storage().ref(fileName);

  const task = reference.putFile(uri);

  task.on('state_changed', taskSnapshot => taskSnapshot);

  return task.then(async () => await storage().ref(fileName).getDownloadURL());
}

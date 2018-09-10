import firebase from './firebase';

const getAll = () => {
  return  firebase
    .database()
    .collection('pokemon')
    .get()
    .then(firebase.mapQuerySnapshot);
};

export default {
  getAll,
};

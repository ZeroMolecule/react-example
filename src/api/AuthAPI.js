import firebase from 'api/firebase';
import get from 'lodash/get'

const getLocalUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(get(user, 'providerData[0]', null));
    }, reject);
  });

};

export default {
  getLocalUser,
};

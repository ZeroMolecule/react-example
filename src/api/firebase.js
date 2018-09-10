import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyD4Rr0_eZmaW3rKsk_lgLDtZfUTg-mDfZk',
  authDomain: 'pokemon-bcc6b.firebaseapp.com',
  databaseURL: 'https://pokemon-bcc6b.firebaseio.com',
  projectId: 'pokemon-bcc6b',
  storageBucket: 'pokemon-bcc6b.appspot.com',
  messagingSenderId: '693820157724'
};

const app = firebase.initializeApp(config);

const initFirestore = () => {
  app.firestore();
  firebase.firestore().settings({timestampsInSnapshots: true});
  return app;
};

const auth = firebase.auth;

const database = () => firebase.firestore();

const querySnapshot = snapshot => ({id: snapshot.id, ...snapshot.data()});

const mapQuerySnapshot = snapshot => snapshot.docs.map(doc => querySnapshot(doc));

export default {
  initFirestore,
  database,
  auth,
  querySnapshot,
  mapQuerySnapshot,
};

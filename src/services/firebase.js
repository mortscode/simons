import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAbXIVE-YBEpNfevnuJ84uvmD5WqzVbfTI',
  authDomain: 'wimpy-17.firebaseapp.com',
  databaseURL: 'https://wimpy-17.firebaseio.com',
  projectId: 'wimpy-17',
  storageBucket: 'wimpy-17.appspot.com',
  messagingSenderId: '693148209366',
};

firebase.initializeApp(config);

export default {
  database: firebase.database(),
};

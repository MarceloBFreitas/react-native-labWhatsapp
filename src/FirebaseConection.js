import firebase from 'firebase';

var config = {
    apiKey: "xxxxxxx",
    authDomain: "xxxxxxx",
    databaseURL: "xxxxx",
    projectId: "xxxxxx",
    storageBucket: "xxxxx",
    messagingSenderId: "xxxxxxxx"
  };
  firebase.initializeApp(config);

  export default firebase;

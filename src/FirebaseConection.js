import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAZTiUXPNqMX9T382zkXvOgKRQOGyIv-qE",
    authDomain: "devapp-cc207.firebaseapp.com",
    databaseURL: "https://devapp-cc207.firebaseio.com",
    projectId: "devapp-cc207",
    storageBucket: "devapp-cc207.appspot.com",
    messagingSenderId: "379945487180"
  };
  firebase.initializeApp(config);

  export default firebase;
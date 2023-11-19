import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyB9ZV0BRlgNDZhJO_ob3rhLL4uL4thUEOk",
  authDomain: "mustplaygame.firebaseapp.com",
  projectId: "mustplaygame",
  databaseURL: "https://mustplaygame-default-rtdb.firebaseio.com",
  storageBucket: "mustplaygame.appspot.com",
  messagingSenderId: "84110381925",
  appId: "1:84110381925:web:94a91a358c4674a50fc78c"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
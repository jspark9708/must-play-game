import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB9ZV0BRlgNDZhJO_ob3rhLL4uL4thUEOk",
  authDomain: "mustplaygame.firebaseapp.com",
  projectId: "mustplaygame",
  storageBucket: "mustplaygame.appspot.com",
  messagingSenderId: "84110381925",
  appId: "1:84110381925:web:94a91a358c4674a50fc78c",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

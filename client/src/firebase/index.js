import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAg05L6L9s_xTNRgFM3cF9BdZfu6CiSH4Q",
  authDomain: "skill-share-4a7df.firebaseapp.com",
  databaseURL: "https://skill-share-4a7df-default-rtdb.firebaseio.com",
  projectId: "skill-share-4a7df",
  storageBucket: "skill-share-4a7df.appspot.com",
  messagingSenderId: "1040576611320",
  appId: "1:1040576611320:web:7178ac5938eea68cbb8c0d",
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase as default, storage };

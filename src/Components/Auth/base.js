import * as firebase from 'firebase'
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_NYquO4aJEoU76IJJAFvb4uXxNFnTf38",
  authDomain: "tweetly-d85db.firebaseapp.com",
  databaseURL: "https://tweetly-d85db-default-rtdb.firebaseio.com",
  projectId: "tweetly-d85db",
  storageBucket: "tweetly-d85db.appspot.com",
  messagingSenderId: "972460050749",
  appId: "1:972460050749:web:a53be973b5d52ce3815d54",
  measurementId: "G-X595PYFGT5"
};

const firebaseApp = firebase.default.initializeApp(firebaseConfig);
export default firebaseApp;
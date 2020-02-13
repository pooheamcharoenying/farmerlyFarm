import * as firebase from "firebase/app";
import "firebase/auth";

const Firebase = firebase.initializeApp( {
  apiKey: "AIzaSyDKWjWpeoYL2hgo08h739lM-pdziaH1oTc",
  authDomain: "studysabaiapp.firebaseapp.com",
  databaseURL: "https://studysabaiapp.firebaseio.com",
  projectId: "studysabaiapp",
  storageBucket: "studysabaiapp.appspot.com",
  messagingSenderId: "213085120828",
  appId: "1:213085120828:web:f03401527fa648a1261639",
  measurementId: "G-LRKZ42YP35"
});

export default Firebase;

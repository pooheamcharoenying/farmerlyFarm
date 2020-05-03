import * as firebase from "firebase/app";
import "firebase/auth";

const Firebase = firebase.initializeApp( {
  apiKey: "AIzaSyBBECuRReDCu9OtEUJugn5pbpJsTJ2_kjQ",
  authDomain: "farmerly-farm-firebase.firebaseapp.com",
  databaseURL: "https://farmerly-farm-firebase.firebaseio.com",
  projectId: "farmerly-farm-firebase",
  storageBucket: "farmerly-farm-firebase.appspot.com",
  messagingSenderId: "1028504904717",
  appId: "1:1028504904717:web:c1349733ba0002fe276144"
});

export default Firebase;

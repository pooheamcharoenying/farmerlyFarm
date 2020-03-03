import React, { useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import {message} from 'antd'
import Firebase from '../hook/firebase'
import * as firebase from "firebase/app";
function GetTokenAction(GlobalHook, uid) {

  axios
    .post("/api/user/getToken", {"uid":uid})
    .then(res => {
     
    
      GlobalHook.setGlobalToken(res.data.token);
      Cookies.set("globalToken", res.data.token, { expires: 7 });

      GlobalHook.setGlobalUser(res.data.user);
      localStorage.setItem("globalUser", JSON.stringify(res.data.user));

      localStorage.setItem("uid", uid);



      axios.defaults.headers.common['Authorization'] = res.data.token;

      GlobalHook.setGlobalLoading(false);
    })
    .catch(err =>{ console.log(err); message.error("Invalid Username or Password"); GlobalHook.setGlobalLoading(false); });
}

async function LoginAction(GlobalHook,userData,vender){
  GlobalHook.setGlobalShowLoginModal(false);

  GlobalHook.setGlobalLoading(true);
  if(vender == "userpass"){
    try {
      await Firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password).then((data)=>{
          GetTokenAction(GlobalHook,data.user.uid)
        })
     
    } catch (error) {
      GlobalHook.setGlobalLoading(false);
      message.error("Invalid Username or Password");
      console.log(error)
  
    }
  

  }else if(vender == "facebook"){
    let facebook = new firebase.auth.FacebookAuthProvider();
    facebook.addScope('email');

    try {
      await Firebase.auth().signInWithPopup(facebook).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        GetTokenAction(GlobalHook,user.uid)


        // ...
      })
     
    } catch (error) {
      GlobalHook.setGlobalLoading(false);
      message.error("Invalid Username or Password");
      console.log(error)
  
    }


  }else if(vender == "google"){
    let google = new firebase.auth.GoogleAuthProvider();

    try {
      await Firebase.auth().signInWithPopup(google).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
        GetTokenAction(GlobalHook,user.uid)


        // ...
      })
     
    } catch (error) {
      GlobalHook.setGlobalLoading(false);
      message.success("Invalid Username or Password");
      console.log(error)
  
    }


  }else if(vender == "twitter"){
    // let twitter = new Firebase.auth.TwitterAuthProvider();
    // twitter.setCustomParameters({
    //   'display': 'popup'
    // });

    GlobalHook.setGlobalLoading(false);
    message.warn("twitter")

  }

}

async function SignUpAction(GlobalHook,userData){
  GlobalHook.setGlobalShowLoginModal(false);

  GlobalHook.setGlobalLoading(true);
  
  try {
    await Firebase
      .auth()
      .createUserWithEmailAndPassword(userData.email, userData.password).then((data)=>{
      
        data.user.updateProfile({
          displayName: userData.name,
          photoURL:'https://i.ya-webdesign.com/images/profile-avatar-png-9.png'
        })

        console.log(data.user.uid)
        GetTokenAction(GlobalHook,data.user.uid)
      })
   
  } catch (error) {
    console.log(error)
    message.error(error.message)
    GlobalHook.setGlobalLoading(false);

  }

}


async function ResetPassAction (GlobalHook,email){
  GlobalHook.setGlobalShowLoginModal(false);

  GlobalHook.setGlobalLoading(true);
  
  try {
    await Firebase
      .auth()
      .sendPasswordResetEmail(email).then((data)=>{

        console.log(email)
      
        GlobalHook.setGlobalLoading(false);
        message.success("password reset link has been sent to your email")
      })
   
  } catch (error) {
    console.log(error)
    message.error(error.message)
    GlobalHook.setGlobalLoading(false);

  }

}


// function SignUpToken(GlobalHook, uid) {

//   axios
//     .post("/api/user/register", {"uid":uid})
//     .then(res => {
//   GetTokenAction(GlobalHook, uid)
//     })
//     .catch(err =>{ console.log(err); message.error("Invalid Username or Password"); GlobalHook.setGlobalLoading(false); });
// }

// function SignUpToken(GlobalHook, userData) {
//   GlobalHook.setGlobalShowLoginModal(false);

//   GlobalHook.setGlobalLoading(true);

//   axios
//     .post("/api/user/register", userData)
//     .then(res => {
//       LoginAction(GlobalHook, userData);

//       GlobalHook.setGlobalLoading(false);
//     })
//     .catch(err => console.log(err));
// }
function LogoutAction(GlobalHook) {
  
  Firebase.auth().signOut();
  Cookies.remove("globalToken");
  localStorage.removeItem("globalUser");
  localStorage.removeItem("uid");

  GlobalHook.setGlobalToken(null);
  GlobalHook.setGlobalUser(null);


  window.location.href = "/";
}

function CourseSubscriptionAction(GlobalHook) {
  GlobalHook.setGlobalLoading(true);
  const pushData = { courseId: GlobalHook.getGlobalcourseId };

  // console.log(pushData)
  axios
    .post("/api/user/subscription", pushData)
    .then(res => {
      // console.log(res.data)
      GlobalHook.setGlobalUser(res.data);
      localStorage.setItem("globalUser", JSON.stringify(res.data));
     // CourseSubscriptorActior(GlobalHook)
      GlobalHook.setGlobalLoading(false);
    })
    .catch(err => console.log(err));
}

// function CourseSubscriptorActior(GlobalHook){
//   GlobalHook.setGlobalLoading(true);
//   const pushData = { courseId: GlobalHook.getGlobalcourseId };
//   axios
//     .post("/api/course/subscriptor", pushData)
//     .then(res => {  

//       GlobalHook.setGlobalLoading(false);
//     })
//     .catch(err => console.log(err));
//}

function LessionVisitedLogAction(GlobalHook,mediaId) {
  GlobalHook.setGlobalLoading(false);
  const pushLogData = {
    courseId: GlobalHook.getGlobalcourseId,
    lessionId: mediaId
  };

  axios
    .post("/api/user/log", pushLogData)
    .then(res => {
      GlobalHook.setGlobalUser(res.data);
      localStorage.setItem("globalUser", JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(err);
    });
}

function QuizLogAction(GlobalHook) {
  const pushLogData = {
    courseId: GlobalHook.getGlobalcourseId,
    lessionId: GlobalHook.getGlobalLessionSelect.mediaId,
    quizData:GlobalHook.getGlobalUserAnswerPool
  };
  axios
    .post("/api/user/quizlog", pushLogData)
    .then(res => {
    
    })
    .catch(err => {
      console.log(err);
    });
}

// function ResetPassAction(GlobalHook){
//   GlobalHook.setGlobalShowLoginModal(false);
//   GlobalHook.setGlobalLoading(true);

//   setTimeout(() => {
//     GlobalHook.setGlobalLoading(false);
//   }, 1000);

// }

export { LoginAction, SignUpAction, LogoutAction, CourseSubscriptionAction,LessionVisitedLogAction,QuizLogAction,ResetPassAction };

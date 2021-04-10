import firebase from 'firebase/app'
import "firebase/auth";

var authUser = {
    apiKey: "AIzaSyCXN_Phk0jORpzput2lgDJ05R-zNavuLwg",
    authDomain: "diplomauth-f7375.firebaseapp.com",
    databaseURL: "https://diplomauth-f7375.firebaseio.com",
    projectId: "diplomauth-f7375",
    storageBucket: "diplomauth-f7375.appspot.com",
    messagingSenderId: "132018868615",
    appId: "1:132018868615:web:a5acc9f3ffb8a4b4684322",
  };
  var authRieltor = {
    apiKey: "AIzaSyDZk61tSL8h-xG3U136sKNCt-MgWSzBdOc",
    authDomain: "diplomauthrieltor.firebaseapp.com",
    databaseURL: "https://diplomauthrieltor.firebaseio.com",
    projectId: "diplomauthrieltor",
    storageBucket: "diplomauthrieltor.appspot.com",
    messagingSenderId: "554530271671",
    appId: "1:554530271671:web:1d0f464bf6ff8a9dbdb832",
  };
  var authAdmin = {
    apiKey: "AIzaSyBVRABGOiidkLxaiJ1ak1uvk8dzuxsuAR4",
    authDomain: "diplomauthadmin.firebaseapp.com",
    databaseURL: "https://diplomauthadmin.firebaseio.com",
    projectId: "diplomauthadmin",
    storageBucket: "diplomauthadmin.appspot.com",
    messagingSenderId: "837910311221",
    appId: "1:837910311221:web:7ce7bbc50e5f1ab0a39c7c",
  };

const AuthUser = firebase.initializeApp(authUser,'AuthUser')
const AuthRieltor = firebase.initializeApp(authRieltor, 'AuthRieltor')
const AuthAdmin = firebase.initializeApp(authAdmin, 'AuthAdmin')

export const appAuthUser = AuthUser;
export const appAuthRieltor = AuthRieltor;
export const appAuthAdmin = AuthAdmin;
import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCq9cnPgAdgZ2YFnpqWNdcO_9Sl6OAsMiw",
    authDomain: "oniochat.firebaseapp.com",
    projectId: "oniochat",
    storageBucket: "oniochat.appspot.com",
    messagingSenderId: "539573199124",
    appId: "1:539573199124:web:58ca28aec1199ca8c36201"
  }).auth();
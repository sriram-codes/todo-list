import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCnMrNpGT1riAQhqOJRFrPaMK_NZ-Q7muw",
  authDomain: "todoist-d8ed1.firebaseapp.com",
  projectId: "todoist-d8ed1",
  storageBucket: "todoist-d8ed1.appspot.com",
  messagingSenderId: "724444261986",
  appId: "1:724444261986:web:a804dfb9b80e5862ac2b3b",
});

const db = firebaseApp.firestore();

export default db;

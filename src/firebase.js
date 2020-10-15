// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp=firebase.initializeApp( {
    apiKey: "AIzaSyCsynMmvghOuXM2VQ_XLc-eUvTDQdS0VRM",
    authDomain: "cotereie.firebaseapp.com",
    databaseURL: "https://cotereie.firebaseio.com",
    projectId: "cotereie",
    storageBucket: "cotereie.appspot.com",
    messagingSenderId: "975597383470",
    appId: "1:975597383470:web:616692c062ca8a4f1ad4bf",
    measurementId: "G-SS0LP95XVD"
  });

  const db=firebase.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export {db, auth, storage}

import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import 'firebase/compat/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSf7X9Jvyxb5i1i3QUoSeufUF7V_gwcSk",
  authDomain: "spotifyplaylistplatform.firebaseapp.com",
  projectId: "spotifyplaylistplatform",
  storageBucket: "spotifyplaylistplatform.appspot.com",
  messagingSenderId: "934948172883",
  appId: "1:934948172883:web:a1d4b938b67d096fb342a6",
  measurementId: "G-87Z9CW2M8T"
};

firebase.initializeApp(firebaseConfig);

//init firestore service
const projectAuth = firebase.auth();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;
const projectStorage = firebase.storage();
export {
    projectFirestore,
    timestamp,
    projectAuth,
    projectStorage
}
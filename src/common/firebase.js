import firebaseCred from './FirebaseCred';
import firebase from 'firebase/app';
import 'firebase/firestore';
require('firebase/auth');

const firebaseApp = firebase.initializeApp(firebaseCred);
const firestore = firebase.firestore(firebaseApp);

export { firebase, firebaseApp, firestore };

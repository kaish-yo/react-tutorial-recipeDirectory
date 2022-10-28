import firebase from "firebase/app";
import "firebase/firestore";

// from firebase
const firebaseConfig = {
  apiKey: "AIzaSyDikRTdJyW_CNq9-sCypxELro1KgaxnwnQ",
  authDomain: "cooking-ninja-site-933a0.firebaseapp.com",
  projectId: "cooking-ninja-site-933a0",
  storageBucket: "cooking-ninja-site-933a0.appspot.com",
  messagingSenderId: "915888432925",
  appId: "1:915888432925:web:5b5522951b121b90da23f4",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();

export { projectFirestore };

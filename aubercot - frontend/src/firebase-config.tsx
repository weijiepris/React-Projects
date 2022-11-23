import firebase from "firebase";
const devMode = true;
let firebaseConfig = {};
if (devMode) {
  firebaseConfig = {
    apiKey: "AIzaSyABCjScfxa3kg-tqWM_5M1DLBMd3UJ-VJA",
    authDomain: "aubercot.firebaseapp.com",
    projectId: "aubercot",
    storageBucket: "aubercot.appspot.com",
    messagingSenderId: "739343955711",
    appId: "1:739343955711:web:22d293aa7b18c4d3eb3eca",
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyABCjScfxa3kg-tqWM_5M1DLBMd3UJ-VJA",
    authDomain: "aubercot.firebaseapp.com",
    projectId: "aubercot",
    storageBucket: "aubercot.appspot.com",
    messagingSenderId: "739343955711",
    appId: "1:739343955711:web:22d293aa7b18c4d3eb3eca",
  };
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

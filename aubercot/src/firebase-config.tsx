import firebase from "firebase";
const devMode = true;
let firebaseConfig = {};
if (devMode) {
  firebaseConfig = {
    apiKey: "AIzaSyC1LNlojAnXPYhsCN54uNPrmQXEeoOmvJE",
    authDomain: "development-6b127.firebaseapp.com",
    projectId: "development-6b127",
    storageBucket: "development-6b127.appspot.com",
    messagingSenderId: "361276343360",
    appId: "1:361276343360:web:e4468781cb62702c9c0ba5",
    measurementId: "G-Q10GPV5LKN",
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyDgECrWknG3jZG24XWOuDkMmXkaW7LS3as",
    authDomain: "forrestbrew.firebaseapp.com",
    projectId: "forrestbrew",
    storageBucket: "forrestbrew.appspot.com",
    messagingSenderId: "220722053401",
    appId: "1:220722053401:web:b445beb10d5a3b73b28588",
  };
}

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

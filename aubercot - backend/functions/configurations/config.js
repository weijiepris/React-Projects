const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: process.env.SECRET_API_KEY,
  authDomain: process.env.SECRET_AUTH_DOMAIN,
  projectId: process.env.SECRET_PROJECT_ID,
  storageBucket: process.env.SECRET_STORAGE_BUCKET,
  messagingSenderId: process.env.SECRET_MESSAGING_SENDER_ID,
  appId: process.env.SECRET_APP_ID,
};

const firebase = admin.initializeApp(firebaseConfig);

module.exports = firebase;
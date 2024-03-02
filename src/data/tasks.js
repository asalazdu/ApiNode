const { initializeApp } = require("firebase/app");

// Configuración de tu aplicación Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDh0D4oaoYpz-rI5WLKjwNubNsLNXiW5ik",
  authDomain: "apinodejs-17833.firebaseapp.com",
  projectId: "apinodejs-17833",
  storageBucket: "apinodejs-17833.appspot.com",
  messagingSenderId: "786670488061",
  appId: "1:786670488061:web:ea9f43b51ba19c7de17194"
};

// Inicializa tu aplicación Firebase
const firebaseApp = initializeApp(firebaseConfig);

module.exports = firebaseApp;
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAJTS0_n9adluG8FIO-HQaVZ5bZd8Cw6Ok",
  authDomain: "react-proyecto-9080c.firebaseapp.com",
  projectId: "react-proyecto-9080c",
  storageBucket: "react-proyecto-9080c.firebasestorage.app",
  messagingSenderId: "215476009976",
  appId: "1:215476009976:web:491f6a612d9407b426b40d",
  measurementId: "G-9TCX0GDMPB"
};

// Inicializamos Firebase
const app = initializeApp(firebaseConfig);

// Exportamos la base de datos y la autenticación para usarlas en los componentes
export const db = getFirestore(app);
export const auth = getAuth(app);
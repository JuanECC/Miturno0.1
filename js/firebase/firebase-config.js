// Importaciones Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";


// Configuración de tu proyecto

const firebaseConfig = {

apiKey: "AIzaSyA5iWLHMampBdqg5CQSdYVM6SAtj1J2RsY",
authDomain: "miturno-6e60e.firebaseapp.com",
projectId: "miturno-6e60e",
storageBucket: "miturno-6e60e.firebasestorage.app",
messagingSenderId: "1021176371725",
appId: "1:1021176371725:web:8f32cb061f8967ea22d344",
measurementId: "G-TZW6KN04NM"

};


// Inicializar Firebase

const app = initializeApp(firebaseConfig);


// Inicializar servicios

const db = getFirestore(app);
const auth = getAuth(app);


// Exportar

export { db, auth };
import { auth, db } from "../firebase/firebase-config.js";

import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

import { doc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const correo = document.getElementById("correo");
const password = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");


btnLogin.addEventListener("click", async () => {

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            correo.value,
            password.value
        );

        const user = userCredential.user;

        // Buscar rol en Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {

            const datos = userDoc.data();
            const rol = datos.rol;

            redireccionarPorRol(rol);

        } else {

            alert("Usuario sin registro en base de datos");

        }

    } catch (error) {

    console.error("Error Firebase:", error.code, error.message);

    alert(error.code);

}

});


function redireccionarPorRol(rol){

    if(rol === "recepcion"){
        window.location.href = "./pages/recepcion.html";
    }

    if(rol === "doctor"){
        window.location.href = "./pages/doctor.html";
    }

    if(rol === "enfermeria"){
        window.location.href = "./pages/enfermeria.html";
    }

    if(rol === "admin"){
        window.location.href = "./pages/admin.html";
    }

}
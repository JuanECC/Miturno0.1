import { db, auth } from "../firebase/firebase-config.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// ==============================
// CALCULAR NIVEL DE TRIAJE
// ==============================

function calcularTriaje(signosVitales, sintomas){

let nivel = 5; // leve por defecto

if(
sintomas.paroCardiaco ||
sintomas.convulsiones ||
sintomas.choque ||
signosVitales.saturacionOxigeno < 85
){
nivel = 1;
}

else if(
sintomas.dificultadRespirar ||
sintomas.dolorPecho ||
sintomas.sangradoExcesivo ||
signosVitales.saturacionOxigeno < 90
){
nivel = 2;
}

else if(
signosVitales.temperatura > 39 ||
signosVitales.frecuenciaCardiaca > 120
){
nivel = 3;
}

else if(
signosVitales.temperatura > 38 ||
signosVitales.frecuenciaCardiaca > 100
){
nivel = 4;
}

return nivel;

}


// ==============================
// CALCULAR TIEMPO ESTIMADO
// ==============================

function calcularTiempoEspera(nivel){

switch(nivel){

case 1:
return 0;

case 2:
return 10;

case 3:
return 30;

case 4:
return 60;

case 5:
return 120;

default:
return 60;

}

}


// ==============================
// REGISTRAR PACIENTE
// ==============================

const form = document.getElementById("formPaciente");

if(form){

form.addEventListener("submit", async (e)=>{

e.preventDefault();


// DATOS DEL PACIENTE

const nombre = document.getElementById("nombre").value;
const edad = Number(document.getElementById("edad").value);
const sexo = document.getElementById("sexo").value;
const telefono = document.getElementById("telefono").value;
const curp = document.getElementById("curp").value;
const peso = Number(document.getElementById("peso").value);

const motivoIngreso = document.getElementById("motivoIngreso").value;
const observaciones = document.getElementById("observaciones").value;


// SIGNOS VITALES

const signosVitales = {

presionSistolica: Number(document.getElementById("ps").value),
presionDiastolica: Number(document.getElementById("pd").value),
frecuenciaCardiaca: Number(document.getElementById("fc").value),
saturacionOxigeno: Number(document.getElementById("spo2").value),
temperatura: Number(document.getElementById("temp").value)

};


// SÍNTOMAS CRÍTICOS

const sintomasCriticos = {

choque: document.getElementById("choque").checked,
dificultadRespirar: document.getElementById("dificultadRespirar").checked,
accidenteGrave: document.getElementById("accidenteGrave").checked,
dolorPecho: document.getElementById("dolorPecho").checked,
convulsiones: document.getElementById("convulsiones").checked,
sangradoExcesivo: document.getElementById("sangradoExcesivo").checked,
paroCardiaco: document.getElementById("paroCardiaco").checked

};


// CALCULAR TRIAJE

const nivelTriaje = calcularTriaje(signosVitales, sintomasCriticos);


// CALCULAR TIEMPO DE ESPERA

const tiempoEstimado = calcularTiempoEspera(nivelTriaje);


try{

await addDoc(collection(db,"pacientes"),{

nombre,
edad,
sexo,
telefono,
curp,
peso,

motivoIngreso,
observaciones,

signosVitales,
sintomasCriticos,

nivelTriaje,
tiempoEstimado,

estado:"espera",

areaAsignada:"",
camaAsignada:"",

horaIngreso: serverTimestamp(),
horaAtencion:null,

createdBy: auth.currentUser ? auth.currentUser.uid : null,

createdAt: serverTimestamp(),
updatedAt: serverTimestamp()

});


alert("Paciente registrado correctamente");

form.reset();

}catch(error){

console.error("Error al registrar paciente:", error);
alert("Error al registrar paciente");

}

});

}
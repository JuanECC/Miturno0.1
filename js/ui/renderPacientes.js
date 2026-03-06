import { db } from "../firebase/firebase-config.js";

import {
collection,
query,
where,
orderBy,
onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const tabla = document.getElementById("tablaPacientes");


// =============================
// COLOR DEL TRIAJE
// =============================

function colorTriaje(nivel){

switch(nivel){

case 1:
return "🔴";

case 2:
return "🟠";

case 3:
return "🟡";

case 4:
return "🟢";

case 5:
return "🔵";

default:
return "⚪";

}

}


// =============================
// RENDER PACIENTES
// =============================

function renderPacientes(pacientes){

tabla.innerHTML = "";

pacientes.forEach(paciente => {

const tr = document.createElement("tr");

const color = colorTriaje(paciente.nivelTriaje);

tr.innerHTML = `

<td>${color} ${paciente.nivelTriaje}</td>
<td>${paciente.nombre}</td>
<td>${paciente.edad}</td>
<td>${paciente.motivoIngreso}</td>
<td>${paciente.tiempoEstimado} min</td>

`;

tabla.appendChild(tr);

});

}


// =============================
// ESCUCHAR FIREBASE
// =============================

const q = query(
collection(db,"pacientes"),
where("estado","==","espera"),
orderBy("nivelTriaje"),
orderBy("horaIngreso")
);


onSnapshot(q,(snapshot)=>{

const pacientes = [];

snapshot.forEach(doc => {

pacientes.push(doc.data());

});

renderPacientes(pacientes);

});
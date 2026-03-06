import { db } from "../firebase/firebase-config.js";

import {
collection,
query,
where,
orderBy,
onSnapshot,
doc,
updateDoc
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
// ACCIONES
// =============================

async function llamarPaciente(id){

try{

const ref = doc(db,"pacientes",id);

await updateDoc(ref,{
estado:"llamado"
});

}catch(error){

console.error("Error llamando paciente:",error);

}

}


async function enviarDoctor(id){

try{

const ref = doc(db,"pacientes",id);

await updateDoc(ref,{
estado:"doctor"
});

}catch(error){

console.error("Error enviando a doctor:",error);

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
<td>${paciente.estado}</td>

<td>

<button class="btn-llamar" data-id="${paciente.id}">
Llamar
</button>

<button class="btn-doctor" data-id="${paciente.id}">
Doctor
</button>

</td>

`;

tabla.appendChild(tr);

});


// =============================
// EVENTOS BOTONES
// =============================

document.querySelectorAll(".btn-llamar").forEach(btn => {

btn.addEventListener("click",(e)=>{

const id = e.target.dataset.id;

llamarPaciente(id);

});

});


document.querySelectorAll(".btn-doctor").forEach(btn => {

btn.addEventListener("click",(e)=>{

const id = e.target.dataset.id;

enviarDoctor(id);

});

});

}



// =============================
// CONSULTA FIREBASE
// =============================

const q = query(
collection(db,"pacientes"),
where("estado","==","espera"),
orderBy("nivelTriaje"),
orderBy("horaIngreso")
);


onSnapshot(q,(snapshot)=>{

console.log("Docs encontrados:", snapshot.size);

const pacientes = [];

snapshot.forEach(docu => {

pacientes.push({
id: docu.id,
...docu.data()
});

});

console.log(pacientes);

renderPacientes(pacientes);

});
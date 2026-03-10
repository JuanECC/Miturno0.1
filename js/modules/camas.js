import { db } from "../firebase/firebase-config.js";

import {
collection,
doc,
updateDoc,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// =============================
// OBTENER CAMAS
// =============================

export async function obtenerCamas(){

const snapshot = await getDocs(collection(db,"camas"));

const camas = [];

snapshot.forEach(docu => {

camas.push({
id: docu.id,
...docu.data()
});

});

return camas;

}


// =============================
// ASIGNAR CAMA A PACIENTE
// =============================

export async function asignarCama(idCama,idPaciente){

try{

const ref = doc(db,"camas",idCama);

await updateDoc(ref,{
estado:"ocupada",
pacienteId:idPaciente
});

}catch(error){

console.error("Error asignando cama:",error);

}

}


// =============================
// LIBERAR CAMA
// =============================

export async function liberarCama(idCama){

try{

const ref = doc(db,"camas",idCama);

await updateDoc(ref,{
estado:"libre",
pacienteId:null
});

}catch(error){

console.error("Error liberando cama:",error);

}

}
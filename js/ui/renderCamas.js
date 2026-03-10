import { obtenerCamas } from "../modules/camas.js";

const contenedor = document.getElementById("contenedorCamas");


// =============================
// RENDER CAMAS
// =============================

function renderCamas(camas){

contenedor.innerHTML = "";

camas.forEach(cama => {

const estado = cama.pacienteId ? "ocupada" : "libre";

const div = document.createElement("div");

div.classList.add("cama");

if(estado === "ocupada"){
div.classList.add("ocupada");
}else{
div.classList.add("libre");
}

div.innerHTML = `

<h3>Cama ${cama.numero}</h3>
<p>${cama.area}</p>
<p>Estado: ${estado}</p>

`;

contenedor.appendChild(div);

});

}


// =============================
// CARGAR CAMAS
// =============================

async function cargarCamas(){

const camas = await obtenerCamas();

renderCamas(camas);

}

cargarCamas();
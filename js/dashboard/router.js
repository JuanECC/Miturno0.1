const contenedor = document.getElementById("contenido");

export async function cargarModulo(modulo){

try{

const res = await fetch(`../pages/${modulo}.html`);
const html = await res.text();

contenedor.innerHTML = html;

// ejecutar scripts tipo module dentro del html
const scripts = contenedor.querySelectorAll("script");

scripts.forEach(script => {

const nuevoScript = document.createElement("script");

if(script.type === "module"){
nuevoScript.type = "module";
}

if(script.src){
nuevoScript.src = script.src;
}else{
nuevoScript.textContent = script.textContent;
}

document.body.appendChild(nuevoScript);

});

}catch(error){

console.error("Error cargando módulo:",error);

}

}

window.cargarModulo = cargarModulo;
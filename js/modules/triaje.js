// =====================================
// CALCULAR NIVEL DE TRIAJE
// =====================================

export function calcularTriaje(signosVitales, sintomas){

let nivel = 5;

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


// =====================================
// TIEMPO DE ESPERA SEGÚN TRIAJE
// =====================================

export function calcularTiempoEspera(nivel){

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
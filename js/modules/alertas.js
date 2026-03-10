// =============================
// DETECTAR ALERTAS MEDICAS
// =============================

export function detectarAlertas(paciente){

const alertas = [];

const signos = paciente.signosVitales;
const sintomas = paciente.sintomasCriticos;


// PARO CARDIACO

if(sintomas.paroCardiaco){

alertas.push("🚨 PARO CARDIACO");

}


// CONVULSIONES

if(sintomas.convulsiones){

alertas.push("⚠ CONVULSIONES");

}


// SANGRADO

if(sintomas.sangradoExcesivo){

alertas.push("🩸 SANGRADO EXCESIVO");

}


// DIFICULTAD RESPIRAR

if(sintomas.dificultadRespirar){

alertas.push("🫁 DIFICULTAD RESPIRATORIA");

}


// SATURACION BAJA

if(signos.saturacionOxigeno < 90){

alertas.push("🔴 SATURACION CRITICA");

}


// PRESION BAJA

if(signos.presionSistolica < 90){

alertas.push("🔻 PRESION BAJA");

}

return alertas;

}
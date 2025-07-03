
// Obtiene la referencia al campo de entrada (pantalla de la calculadora)
const display = document.getElementById("display");

// Obtiene la referencia al contenedor donde se muestra el historial
const historialCont = document.getElementById("historial");

// Agrega un número u operador al display
function agregarNumero(num) {
  display.value += num; // Añade el carácter (número u operador) al final del valor actual del display
}

// Limpia todo el contenido del display
function limpiar() {
  display.value = ""; // Borra el contenido del display
}
// Borra solo el último carácter ingresado
function borrarUltimo() {
  display.value = display.value.slice(0, -1); // Elimina el último carácter del string
}

// Realiza el cálculo matemático
function calcular() {
  try {
    const resultado = eval(display.value); // Evalúa la expresión del display (ej. "2+3*4")
    
    // Guarda el cálculo en el historial (ej. "2+3*4 = 14")
    guardarHistorial(display.value + ' = ' + resultado);

    display.value = resultado; // Muestra el resultado en el display
  } catch {
    display.value = "Error"; // Si hay error en la expresión, muestra "Error"
  }
}

// Guarda el historial del cálculo en el almacenamiento local del navegador
function guardarHistorial(entrada) {
  // Obtiene el historial actual desde localStorage (o crea uno nuevo si no existe)
  let historial = JSON.parse(localStorage.getItem("historial") || "[]");

  historial.unshift(entrada); // Agrega el nuevo cálculo al principio del arreglo

  // Guarda solo los últimos 5 cálculos
  localStorage.setItem("historial", JSON.stringify(historial.slice(0, 5)));

  mostrarHistorial(); // Actualiza la vista del historial en pantalla
}

// Muestra el historial almacenado en el navegador
function mostrarHistorial() {
  const historial = JSON.parse(localStorage.getItem("historial") || "[]"); // Carga historial
  historialCont.innerHTML = "<strong>Historial:</strong><br>" + 
    historial.map(h => `• ${h}`).join("<br>"); // Formatea y muestra cada línea del historial
}

// Cambia entre modo claro y modo oscuro
function toggleModo() {
  document.body.classList.toggle("modo-oscuro"); // Agrega o quita la clase CSS
}

// Agrega soporte para teclado
document.addEventListener("keydown", (e) => {
  if ("0123456789.+-*/".includes(e.key)) {
    // Si la tecla es un número o un operador, lo agrega al display
    agregarNumero(e.key);
  } else if (e.key === "Enter") {
    // Si presiona Enter, calcula
    calcular();
  } else if (e.key === "Escape") {
    // Escape limpia todo
    limpiar();
  } else if (e.key === "Backspace") {
    // Borra el último carácter
    borrarUltimo();
  }
});

// Al cargar la página, muestra el historial guardado previamente
window.onload = mostrarHistorial;


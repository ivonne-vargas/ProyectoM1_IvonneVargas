function numeroAleatorio (max) {
    return Math.floor(Math.random() * (max + 1));
}

function generarHex() {
    const hex = numeroAleatorio(16777215).toString(16).padStart(6, "0");
    return "#" + hex;
}

function generarHsl() {
    const tono = numeroAleatorio(360);
    const saturacion = 40 + numeroAleatorio(50);
    const luminosidad = 35 + numeroAleatorio(40);
    return `hsl(${tono}, ${saturacion}%, ${luminosidad}%)`;
}


// Crea una tarjeta con el color de fondo y su código escrito
function crearTarjeta(color) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.style.backgroundColor = color;

    const codigo = document.createElement("p");
    codigo.className = "codigo";
    codigo.textContent = color;

    tarjeta.appendChild(codigo);
    return tarjeta;
}

const selectCantidad = document.getElementById("select-cantidad");
const selectFormato = document.getElementById("select-formato");
const contenedorPaleta = document.getElementById("paleta");

function generarPaleta() {
    const cantidad = Number(selectCantidad.value);
    const formato = selectFormato.value;

    contenedorPaleta.innerHTML = "";

    for (let i = 0; i < cantidad; i++) {
        const color = formato === "hex" ? generarHex() : generarHsl();
        contenedorPaleta.appendChild(crearTarjeta(color));
    }
}


const botonGenerar = document.getElementById("btn-generar");
botonGenerar.addEventListener("click", function () {
    generarPaleta();
    mostrarToast("¡Paleta generada!");
});
generarPaleta(); // Muestra una paleta al cargar la página //

const toast = document.getElementById("toast");
let temporizador;

function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add("visible");

    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
        toast.classList.remove("visible");
    }, 1000);
}
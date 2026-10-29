
const selectCantidad = document.getElementById("select-cantidad");
const selectFormato = document.getElementById("select-formato");
const contenedorPaleta = document.getElementById("paleta");
const botonGenerar = document.getElementById("btn-generar");
const toast = document.getElementById("toast");


let paletaActual = [];
let temporizador;


function numeroAleatorio(max) {
    return Math.floor(Math.random() * (max + 1));
}


function generarColor() {
    return {
        tono: numeroAleatorio(360),
        saturacion: 40 + numeroAleatorio(50),
        luminosidad: 35 + numeroAleatorio(40)
    };
}

// Convierte el color a texto HSL//
function aTextoHsl(color) {
    return `hsl(${color.tono}, ${color.saturacion}%, ${color.luminosidad}%)`;
}

// Convierte el color a texto HEX //
function aTextoHex(color) {
    const s = color.saturacion / 100;
    const l = color.luminosidad / 100;
    const a = s * Math.min(l, 1 - l);

    function canal(n) {
        const k = (n + color.tono / 30) % 12;
        const valor = l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
        return Math.round(255 * valor).toString(16).padStart(2, "0");
    }

    return "#" + canal(0) + canal(8) + canal(4);
}

// Devuelve el texto según el formato elegido //
function obtenerCodigo(color, formato) {
    return formato === "hex" ? aTextoHex(color) : aTextoHsl(color);
}


function crearTarjeta(color, formato) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "tarjeta";
    tarjeta.style.backgroundColor = aTextoHsl(color);

    const codigo = document.createElement("p");
    codigo.className = "codigo";
    codigo.textContent = obtenerCodigo(color, formato);

    tarjeta.appendChild(codigo);
    return tarjeta;
}


function mostrarPaleta() {
    const formato = selectFormato.value;
    contenedorPaleta.innerHTML = "";

    paletaActual.forEach(function (color) {
        contenedorPaleta.appendChild(crearTarjeta(color, formato));
    });
}


function generarPaleta() {
    const cantidad = Number(selectCantidad.value);
    paletaActual = [];

    for (let i = 0; i < cantidad; i++) {
        paletaActual.push(generarColor());
    }

    mostrarPaleta();
}


function mostrarToast(mensaje) {
    toast.textContent = mensaje;
    toast.classList.add("visible");

    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
        toast.classList.remove("visible");
    }, 1000);
}


botonGenerar.addEventListener("click", function () {
    generarPaleta();
    mostrarToast("¡Paleta generada!");
});

selectFormato.addEventListener("change", mostrarPaleta);

generarPaleta(); // Muestra una paleta al cargar la página
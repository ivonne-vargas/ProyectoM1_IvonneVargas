
const selectCantidad = document.getElementById("select-cantidad");
const selectFormato = document.getElementById("select-formato");
const contenedorPaleta = document.getElementById("paleta");
const botonGenerar = document.getElementById("btn-generar");
const toast = document.getElementById("toast");
const botonGuardar = document.getElementById("btn-guardar");
const botonBorrarHistorial = document.getElementById("btn-borrar-historial");
const contenedorHistorial = document.getElementById("historial");

const CLAVE_HISTORIAL = "historialPaletas";
const MAXIMO_GUARDADAS = 10;
let historial = [];

let paletaActual = [];
let temporizador;


function numeroAleatorio(max) {
    return Math.floor(Math.random() * (max + 1));
}


function generarColor() {
    return {
        tono: numeroAleatorio(360),
        saturacion: 40 + numeroAleatorio(50),
        luminosidad: 35 + numeroAleatorio(40),
        anclado: false
    };
}

// Genera un color con tono cercano al de un color base//
function generarColorParecido(base) {
    const variacion = numeroAleatorio(40) - 20; // entre -20 y +20
    return {
        tono: (base.tono + variacion + 360) % 360,
        saturacion: 40 + numeroAleatorio(50),
        luminosidad: 35 + numeroAleatorio(40),
        anclado: false
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
    codigo.tabIndex = 0;
    codigo.setAttribute("role", "button");
    codigo.setAttribute("aria-label", "Copiar código " + codigo.textContent);

    codigo.addEventListener("click", function () {
        copiarCodigo(codigo.textContent);
    });

    codigo.addEventListener("keydown", function (evento) {
        if (evento.key === "Enter" || evento.key === " ") {
            evento.preventDefault();
            copiarCodigo(codigo.textContent);
        }
    });

    const botonAncla = document.createElement("button");
    botonAncla.type = "button";
    botonAncla.className = "btn-ancla";
    botonAncla.textContent = color.anclado ? "Desanclar" : "Anclar";
    botonAncla.setAttribute("aria-pressed", color.anclado);

    botonAncla.addEventListener("click", function () {
        alternarAncla(color);
    });

   tarjeta.appendChild(botonAncla);
   tarjeta.appendChild(codigo);
   return tarjeta;
}


function mostrarPaleta() {
    const formato = selectFormato.value;
    contenedorPaleta.innerHTML = "";
    contenedorPaleta.dataset.cantidad = paletaActual.length;

    paletaActual.forEach(function (color) {
        contenedorPaleta.appendChild(crearTarjeta(color, formato));
    });
}

historial = cargarHistorial();
mostrarHistorial();

function generarPaleta() {
    const cantidad = Number(selectCantidad.value);
    const ancla = paletaActual.find(function (color) {
        return color.anclado;
    });

    const nuevaPaleta = [];

    for (let i = 0; i < cantidad; i++) {
        if (i === 0 && ancla) {
            nuevaPaleta.push(ancla);
        } else if (ancla) {
            nuevaPaleta.push(generarColorParecido(ancla));
        } else {
            nuevaPaleta.push(generarColor());
        }
    }

    paletaActual = nuevaPaleta;
    mostrarPaleta();
}

// Ancla un color (solo uno a la vez) o lo desancla//
function alternarAncla(color) {
    const estabaAnclado = color.anclado;
    paletaActual.forEach(function (c) {
        c.anclado = false;
    });
    color.anclado = !estabaAnclado;
    mostrarPaleta();
    mostrarToast(color.anclado ? "Color anclado" : "Color desanclado");
}

// Lee el historial guardado (si no hay nada o está dañado, devuelve [])
function cargarHistorial() {
    try {
        const texto = localStorage.getItem(CLAVE_HISTORIAL);
        return texto ? JSON.parse(texto) : [];
    } catch (error) {
        return [];
    }
}

function guardarHistorial() {
    try {
        localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(historial));
    } catch (error) {
        mostrarToast("No se pudo guardar");
    }
}

// Guarda una copia de la paleta actual al inicio del historial
function guardarPaletaActual() {
    const copia = paletaActual.map(function (color) {
        return {
            tono: color.tono,
            saturacion: color.saturacion,
            luminosidad: color.luminosidad,
            anclado: false
        };
    });

    historial.unshift(copia);
    historial = historial.slice(0, MAXIMO_GUARDADAS);
    guardarHistorial();
    mostrarHistorial();
    mostrarToast("Paleta guardada");
}

// Devuelve una paleta guardada a la zona principal
function cargarPaletaGuardada(indice) {
    paletaActual = historial[indice].map(function (color) {
        return { ...color };
    });
    selectCantidad.value = String(paletaActual.length);
    mostrarPaleta();
    mostrarToast("Paleta cargada");
}

function eliminarPaletaGuardada(indice) {
    historial.splice(indice, 1);
    guardarHistorial();
    mostrarHistorial();
    mostrarToast("Paleta eliminada");
}

function borrarHistorial() {
    historial = [];
    guardarHistorial();
    mostrarHistorial();
    mostrarToast("Historial borrado");
}

function mostrarHistorial() {
    contenedorHistorial.innerHTML = "";

    if (historial.length === 0) {
        const vacio = document.createElement("p");
        vacio.textContent = "Aún no hay paletas guardadas.";
        contenedorHistorial.appendChild(vacio);
        return;
    }

    historial.forEach(function (paleta, indice) {
        const item = document.createElement("article");
        item.className = "item-historial";

        const muestras = document.createElement("div");
        muestras.className = "muestras";

        paleta.forEach(function (color) {
            const muestra = document.createElement("span");
            muestra.className = "muestra";
            muestra.style.backgroundColor = aTextoHsl(color);
            muestras.appendChild(muestra);
        });

        const botonCargar = document.createElement("button");
        botonCargar.type = "button";
        botonCargar.textContent = "Cargar";
        botonCargar.setAttribute("aria-label", "Cargar paleta guardada " + (indice + 1));
        botonCargar.addEventListener("click", function () {
            cargarPaletaGuardada(indice);
        });

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("aria-label", "Eliminar paleta guardada " + (indice + 1));
        botonEliminar.addEventListener("click", function () {
            eliminarPaletaGuardada(indice);
        });

        item.appendChild(muestras);
        item.appendChild(botonCargar);
        item.appendChild(botonEliminar);
        contenedorHistorial.appendChild(item);
    });
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

botonGuardar.addEventListener("click", guardarPaletaActual);
botonBorrarHistorial.addEventListener("click", borrarHistorial);

generarPaleta(); // Muestra una paleta al cargar la página//

// Copia un texto al portapapeles y avisa con el toast//
function copiarCodigo(texto) {
    navigator.clipboard.writeText(texto)
        .then(function () {
            mostrarToast("Texto copiado");
        })
        .catch(function () {
            mostrarToast("No se pudo copiar");
        });
}
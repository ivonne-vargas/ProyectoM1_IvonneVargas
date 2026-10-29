
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

    paletaActual.forEach(function (color) {
        contenedorPaleta.appendChild(crearTarjeta(color, formato));
    });
}


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
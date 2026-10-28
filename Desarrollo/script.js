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


const botonGenerar = document.getElementById("btn-generar");

botonGenerar.addEventListener("click", function () {
    console.log("Botón presionado");
});
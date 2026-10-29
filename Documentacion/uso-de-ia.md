## 🤖 Uso de IA en el desarrollo

### Prompt No.1 utilizado

> Soy principiante en desarrollo web. Estoy haciendo un generador de paletas de colores con HTML, CSS y JavaScript puro. Ya tengo el HTML y el CSS terminados. Actúa como mentor de programación frontend. Explícame cómo generar un color HEX y HSL aleatorio con una función. Sin librerías. Usa solo funciones, Math.random y toString(16). Evita conceptos avanzados. Primero explica la lógica en 3 pasos simples, luego muestra el código comentado línea por línea.

📸 [Ver captura del prompt con la IA](./capturas/promt-1-agregaJs.png)

### Respuesta obtenida

**Lógica HEX:**
1. Hay 16,777,216 colores posibles (de `0` a `16777215`). Se saca un número al azar en ese rango.
2. Se convierte a base 16 con `toString(16)`.
3. Se agrega `#` al inicio (y ceros si quedó muy corto).

**Lógica HSL:**
1. **H** (tono): `0` a `360`
2. **S** (saturación): `0` a `100`
3. **L** (luminosidad): `0` a `100`

```javascript
// ---------- HEX ----------
function generarHex() {
  // Número al azar entre 0 y 16777215
  const numero = Math.floor(Math.random() * 16777216);

  // Convierte el número a base 16 (ej: 255 -> "ff")
  let hex = numero.toString(16);

  // Rellena con ceros a la izquierda hasta tener 6 caracteres
  hex = hex.padStart(6, "0");

  // Agrega el # y lo devuelve
  return "#" + hex;
}

// ---------- HSL ----------
function generarHsl() {
  const h = Math.floor(Math.random() * 361); // Tono: 0 a 360
  const s = Math.floor(Math.random() * 101); // Saturación: 0 a 100
  const l = Math.floor(Math.random() * 101); // Luminosidad: 0 a 100

  return "hsl(" + h + ", " + s + "%, " + l + "%)";
}
```

### Qué aprendí / cómo lo adapté

- Entendí que `Math.random()` genera un decimal entre 0 y 1, y que
  al multiplicarlo y usar `Math.floor()` obtengo un número entero al azar.
  Con `toString(16)` lo convierto a base 16, que es el formato de los
  colores HEX. También aprendí que `padStart(6, "0")` evita colores
  inválidos cuando el número es pequeño.
- Adapté las funciones para generar 5 colores y guardarlos en un array.
  Cambié los nombres de las variables para que sean más claros y mostré
  el código HEX debajo de cada color en pantalla, esto lo hice como ejercicio practico antes de integrarlo en el PI. 

### Prompt No.2 utilizado

📸 [Ver captura del prompt con la IA](./capturas/promt-2-render-paleta.png)

### Respuesta obtenida

Pasos numerados con código y prueba en consola:
1. Crear una tarjeta (`crearTarjeta`): crea un `<article>` con el color de fondo y el código escrito.
2. Capturar elementos del DOM (`getElementById`).
3. `generarPaleta`: lee cantidad y formato, vacía `#paleta` y repite con un `for`.
4. Conectar el botón con `addEventListener("click", generarPaleta)`.
5. Llamar `generarPaleta()` al final para la paleta inicial.

### Qué aprendí / cómo lo adapté

- Aprendí que con `document.createElement` puedo crear elementos HTML desde JavaScript y con `appendChild` meterlos dentro de otro. Así la cantidad de tarjetas cambia según lo que la persona elija, sin escribir el HTML a mano.
- Entendí que `innerHTML = ""` limpia el contenedor antes de dibujar, para que las paletas nuevas no se acumulen sobre las anteriores.
- Aprendí la diferencia entre `generarPaleta` y `generarPaleta()`. En el `addEventListener` va sin paréntesis porque solo le indico qué función ejecutar cuando hagan clic. Con paréntesis se ejecutaría de inmediato.
- El valor de un `select` llega como texto, así que usé `Number()` para convertir la cantidad a número antes del `for`.
- Adapté el resultado de la IA agregando una llamada a `generarPaleta()` al final del script, para que la página muestre una paleta apenas carga y no se vea vacía.
- Probé cada paso en la consola del navegador (DevTools) antes de hacer el commit.
  
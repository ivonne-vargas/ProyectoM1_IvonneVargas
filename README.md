# Generador de Paletas Interactivo

Aplicación web estática que genera paletas de colores aleatorias con un botón, pensada como herramienta rápida para el equipo creativo de Colorfly Studio. Proyecto Integrador del Módulo 1.

🔗 **Demo:** https://ivonne-vargas.github.io/ProyectoM1_IvonneVargas/Desarrollo/

## Tecnologías

- HTML5 semántico
- CSS3 (Flexbox, Grid, media queries)
- JavaScript puro (sin librerías)
- Git y GitHub
- GitHub Pages

## Funcionalidades

**Requisitos obligatorios**
- Botón "Generar paleta" y selector de tamaño (6, 8 o 9 colores)
- Formatos HEX y HSL, con el código visible en cada color
- Render dinámico y paleta inicial al cargar
- Microfeedback con toast
- Accesibilidad: labels asociados, foco visible y contraste

**Extras implementados**
- Cambio de formato sin perder la paleta
- Copiar el código al hacer clic en el código
- Anclar un color y generar una gama parecida
- Guardado de paletas en `localStorage` con historial
- Diseño responsive
- Instrucciones de uso plegables

## Cómo usar la app

1. Elige la cantidad de colores y el formato de código.
2. Presiona **Generar paleta**.
3. Cambia el formato cuando quieras: los colores no cambian, solo el código.
4. Haz clic en el código de un color para copiarlo.
5. Presiona **Anclar** para conservar un color; los demás saldrán con un tono parecido.
6. Presiona **Guardar paleta** para enviarla al historial, desde donde puedes cargarla o eliminarla.

## Cómo ejecutarla en local

1. Clona o descarga el repositorio.
2. Abre `Desarrollo/index.html` en el navegador.

No requiere instalar nada. Para copiar al portapapeles necesitas HTTPS o `localhost` (por ejemplo, con Live Server).

## Cómo desplegarla en GitHub Pages

1. Sube el proyecto a GitHub (`git push`).
2. En el repositorio: **Settings > Pages**.
3. En **Source** elige **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
4. Espera 1 o 2 minutos. La app queda en la URL de la demo, con `/Desarrollo/` al final.

## Proceso de desarrollo

*La numeración de los GIFs corresponde al orden de mi muestra de desarrollo, no a la numeración de las tareas del proyecto.*

### 1. Estructura HTML semántica
Base de la página con `header`, `main`, `section` y `footer`, labels asociados a los selects y contenedores vacíos que JavaScript llena después.

![Estructura HTML y CSS inicial](Documentacion/capturas/paso-1-html-css.gif)

### 2. Estilos y layout
Estilos externos con Flexbox y Grid, foco visible y footer al pie de la página.

![Estilos y layout](Documentacion/capturas/agrega-estilos-layout.png)

### 3. Generación de colores aleatorios
Funciones que generan colores aleatorios, probadas en la Console de DevTools.

![Colores aleatorios en la consola](Documentacion/capturas/paso-02-colores-aleatorios.gif)

### 4. Evento del botón
Conexión del botón "Generar paleta" con `addEventListener`.

![Evento del botón](Documentacion/capturas/paso-03-evento-boton.gif)

### 5. Render dinámico según el tamaño
La paleta se dibuja con 6, 8 o 9 colores, cada uno con su código visible, y aparece una paleta inicial al cargar la página.

![Render de la paleta según el tamaño](Documentacion/capturas/paso-04-render-tamano.gif)

### 6. Microfeedback (toast)
Mensaje breve que confirma cada acción y desaparece solo.

![Toast de microfeedback](Documentacion/capturas/paso-05-toast.gif)

### 7. Cambio de formato sin perder la paleta
Cada color se guarda como números (tono, saturación y luminosidad) y se convierte a HEX o HSL solo para mostrar el código.

![Cambio de formato sin perder la paleta](Documentacion/capturas/paso-06-formato-sin-perder-paleta.gif)

### 8. Copiar el código al portapapeles
Al hacer clic en el código de un color se copia el texto y aparece el toast.

![Copiar el código](Documentacion/capturas/paso-07-copiar-codigo.gif)

### 9. Anclar un color
El color anclado se conserva y los demás se generan como una gama de colores armónica.

![Anclar color](Documentacion/capturas/paso-08-anclar-color.gif)

### 10. Historial de paletas con localStorage
Las paletas guardadas siguen disponibles al recargar la página (se guardan en LocalStorage) y se pueden cargar o eliminar.

![Historial de paletas](Documentacion/capturas/paso-09-historial-uso-devtools.gif)

### 11. Diseño responsive
Las columnas se ajustan según el ancho de la pantalla.

![Diseño responsive](Documentacion/capturas/paso-10-responsive.gif)

### 12. Instrucciones de uso
Bloque plegable con `<details>` que explica cómo usar el generador.

![Instrucciones de uso](Documentacion/capturas/paso-11-instrucciones.gif)

## Uso de DevTools

Usé las DevTools del navegador durante todo el desarrollo, no solo al final:

| Herramienta | Para qué la usé | Evidencia |
|---|---|---|
| **Console** | Probar las funciones de color, verificar el evento del botón y detectar errores de sintaxis | `paso-02-colores-aleatorios.gif`, `paso-03-evento-boton.gif` |
| **Elements** | Ver los `<article>` creados por JavaScript y cómo cambian clases y atributos (`visible`, `data-cantidad`) | `paso-04-render-tamano.gif`, `paso-05-toast.gif` |
| **Elements > Accessibility** | Confirmar que cada `label` queda asociado a su `select` y que el código se anuncia como botón | `labels-asociados.png` |
| **Application > Local Storage** | Revisar la clave `historialPaletas` y comprobar que el historial persiste | `paso-09-historial-uso-devtools.gif` |
| **Modo dispositivo** | Probar la app en 1280px, 768px y 360px | `paso-10-responsive.gif` |

![Labels asociados en DevTools](Documentacion/capturas/labels-asociados.png)

### Errores depurados

- **Coma faltante en `generarColor`:** la Console mostró `Unexpected identifier 'anclado'` con el número de línea. Al agregar la coma, el script volvió a funcionar.
- **Typo en el HTML (`seelect-formato`):** el `id` no coincidía con el `for` del label, por lo que el label quedaba desconectado. Lo corregí al revisar el código.
- **Paleta inicial que desapareció:** al reemplazar el `addEventListener` se borró la llamada `generarPaleta()` del final del script. La Console no mostraba error, así que revisé el orden del código y la restauré.

Recorrido final de la revisión:

![Pruebas finales con DevTools](Documentacion/capturas/paso-12-pruebas-devtools.gif)

## Pruebas realizadas

Las pruebas se hicieron sobre la demo publicada en GitHub Pages.

| Prueba | Resultado esperado | Resultado |
|---|---|---|
| Recargar la página | Paleta inicial de 6 colores en HEX, sin toast | ✅ Correcto |
| Generar con 6, 8 y 9 colores | Aparece esa cantidad de tarjetas | ✅ Correcto |
| Cambiar entre HEX y HSL | Los colores no cambian, solo el texto | ✅ Correcto |
| Clic en un código | Copia el texto y muestra "Texto copiado" | ✅ Correcto |
| Anclar un color y generar | El anclado se conserva y los demás tienen tono parecido | ✅ Correcto |
| Guardar paleta | Aparece en el historial | ✅ Correcto |
| Recargar con historial guardado | Las paletas siguen ahí | ✅ Correcto |
| Cargar y eliminar del historial | Funcionan y muestran toast | ✅ Correcto |
| Navegar con la tecla Tab | Todos los elementos interactivos muestran foco visible | ✅ Correcto |
| Anchos 1280px, 768px y 360px | Sin scroll horizontal ni elementos rotos | ✅ Correcto |
| Toast con scroll | Se ve arriba sin importar el scroll | ✅ Correcto |
| Console | Sin errores en rojo | ✅ Correcto |

## Documentación del uso de IA

Los prompts, resultados y aprendizajes están en [Documentacion/uso-de-ia.md](Documentacion/uso-de-ia.md).

## Decisiones técnicas

- **Colores como datos:** cada color se guarda como objeto (tono, saturación y luminosidad) y se convierte a HEX o HSL solo para mostrarlo. Así, cambiar de formato no pierde la paleta.
- **Conversión a HEX:** uso una fórmula estándar de conversión HSL a HEX. La validé con `aTextoHex({ tono: 0, saturacion: 100, luminosidad: 50 })`, que devuelve `#ff0000`.
- **Separar crear de mostrar:** `generarPaleta()` crea colores nuevos y `mostrarPaleta()` solo los dibuja.
- **Toast:** usa una clase CSS (`visible`) activada desde JS, y `role="status"` para que los lectores de pantalla lo anuncien.
- **Responsive con `data-cantidad`:** JS escribe la cantidad de colores en un atributo y CSS lo usa para acomodar las columnas (8 colores en 4 columnas, sin tarjeta huérfana).
- **Botón principal a la derecha:** "Generar paleta" está al final de los controles, para alcanzarlo mejor con el pulgar en celular. Lo moví en el HTML y no con `order`, para que el orden visual y el de teclado coincidan.
- **Historial en `localStorage`:** guarda como máximo 10 paletas, como copias de números, con `try/catch` por si el navegador bloquea el almacenamiento.
- **Instrucciones con `<details>`:** elemento HTML nativo, plegable y operable con teclado, sin JavaScript.
- **Estructura de carpetas y demo:** la consigna exige `Desarrollo/` y `Documentación/`, por eso la demo se publica en `.../Desarrollo/`.
- **Desarrollo vs. producción:** en local se abre `index.html`; en producción GitHub Pages sirve el repositorio por HTTPS, requisito para `navigator.clipboard`.

## Accesibilidad

- Foco visible en botones, selects, códigos y enlaces.
- Los códigos de color se operan con teclado (Tab, Enter o espacio) y se anuncian como botón.
- `aria-pressed` en el botón de anclar y `aria-label` en los botones del historial.
- Toast con `role="status"`.
- Contraste revisado en los colores principales.

## Mejoras futuras

- Anclar varios colores a la vez.
- Exportar la paleta como imagen o como variables CSS.
- Permitir nombrar las paletas guardadas.

## Autora

Ivonne Vargas · [LinkedIn](https://www.linkedin.com/in/ivonne-alexandra-vargas-1b70a9388) · [GitHub](https://github.com/ivonne-vargas)
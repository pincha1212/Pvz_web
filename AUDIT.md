# Flora Defenders v1.0 — Auditoría y estabilización

## Alcance

Fuente auditada: `Flora Defenders v0.8.html`.

La versión original concentraba HTML, CSS, configuración, estado, UI, entidades, oleadas, renderizado, entrada y ciclo principal en un único archivo de 1136 líneas.

## Cambios estructurales

- `index.html`: estructura HTML y carga de módulos.
- `css/styles.css`: todos los estilos.
- `js/config.js`: constantes, plantas, enemigos y mapas.
- `js/state.js`: estado global del juego.
- `js/progression.js`: progreso persistente mediante `localStorage`.
- `js/ui.js`: menú, banco de semillas, recursos y pantallas de estado.
- `js/entities.js`: entidades, proyectiles, recursos, partículas y textos flotantes.
- `js/waves.js`: gestión y aparición de oleadas.
- `js/renderer.js`: tablero, entidades y niebla.
- `js/input.js`: mouse, colocación de plantas y recolección.
- `js/game.js`: inicialización, acciones y game loop.
- `js/main.js`: punto de entrada.

## Problemas detectados y correcciones

| Área | Hallazgo | Corrección |
|---|---|---|
| Arquitectura | Un solo archivo de 1136 líneas | Separación por responsabilidades y módulos ES |
| HTML | `onclick` inline | Eventos registrados desde JavaScript |
| CSS | Todo embebido en HTML | Hoja `styles.css` independiente |
| Datos | Catálogos y mapas mezclados con lógica | `config.js` independiente |
| Estado | Estado global mezclado con comportamiento | `state.js` |
| Entrada | Coordenadas basadas directamente en CSS del canvas | Conversión proporcional al tamaño real renderizado |
| Game loop | `deltaTime` sin límite | Límite de 100 ms para evitar saltos grandes después de pausas |
| Progreso | `parseInt()` sin validar resultado | Validación y acotación al rango de mapas |
| UI | Creación del menú y lógica del juego mezcladas | `ui.js` |
| Oleadas | Gestión mezclada con el resto del juego | `waves.js` |
| Renderizado | Dibujado mezclado con entrada y lógica | `renderer.js` |

## Verificación realizada

- Comprobación sintáctica de todos los archivos JavaScript mediante `node --check`.
- Estructura de módulos ES coherente con `<script type="module">`.
- Referencias de archivos revisadas dentro de la estructura final.
- No se introdujo Node.js, bundler ni dependencia de backend.
- Se conserva el enfoque de aplicación web estática.

## Estructura final

```text
flora_defenders_v0.9/
├── index.html
├── AUDIT.md
├── css/
│   └── styles.css
└── js/
    ├── config.js
    ├── entities.js
    ├── game.js
    ├── input.js
    ├── main.js
    ├── progression.js
    ├── renderer.js
    ├── state.js
    ├── ui.js
    └── waves.js
```

## Nota de ejecución

Al usar módulos ES (`type="module"`), se recomienda ejecutar el proyecto mediante un servidor HTTP local o publicarlo en un hosting estático como GitHub Pages. Abrir `index.html` directamente mediante `file://` puede quedar limitado por las políticas de módulos del navegador.


## Cambios de v0.9 → v1.0

- `js/progression.js`: nueva clave de progreso v1.0 con migración automática desde `floraDefendersProgress_v08` y tolerancia a errores de `localStorage`.
- `js/ui.js`: cancelación de temporizadores de mensajes para evitar que un mensaje antiguo cierre prematuramente el de un mapa nuevo.
- `js/entities.js`: el segundo disparo del Tirador Doble ya no usa `setTimeout`; queda integrado al ciclo de actualización de la entidad y no puede sobrevivir a la planta destruida.
- `js/renderer.js`: el orden de dibujo se calcula sobre una copia de las entidades; el renderizador ya no modifica el arreglo de estado. La niebla tampoco muta el estado mientras dibuja.
- `js/game.js`: el movimiento de la niebla pasa a actualizarse dentro del ciclo de juego.
- `css/styles.css`: soporte responsive para pantallas pequeñas sin cambiar la resolución interna del canvas.
- `index.html`: versión visible actualizada a v1.0.

## Verificación de v1.0

- Todos los módulos JavaScript pasan `node --check`.
- Se verificaron las referencias ES modules.
- Se ejecutó un smoke test automatizado con DOM/canvas simulados para validar carga de módulos, construcción del menú, carga del mapa 1 y ejecución del game loop.

# Angular Modern Backoffice Template & AI-Agent Boilerplate

Este repositorio es una plantilla diseñada de desarrollador a desarrollador para acelerar el inicio de proyectos administrativos, paneles de control (dashboards) y sistemas de backoffice usando **Angular moderno (v21+)**, **Angular Material 3** y **Tailwind CSS v4**.

El objetivo es proveer una base sólida preconfigurada que te ahorre semanas de setup inicial, garantizando consistencia arquitectónica mediante **Agent-Skills** nativos para agentes de desarrollo basados en IA (como Gemini o Antigravity).

---

## 🚀 Filosofía de Diseño y Arquitectura

Esta plantilla sigue estándares modernos del ecosistema Angular para lograr un código altamente escalable, mantenible y reactivo:

1. **Componentes Standalone e Inline (SFC)**: Componentes desacoplados sin módulos (`NgModule`). Preferencia por la arquitectura de archivo único (Single-File Components) con plantillas y estilos inline para componentes pequeños/medianos, reduciendo el ruido de archivos en el espacio de trabajo.
2. **Reactividad Nativa con Signals**: Transición total hacia el uso de reactividad por señales. Uso consistente de **Signal Inputs** (`input()`, `input.required()`) y **Signal Outputs** (`output()`) en lugar de los decoradores heredados `@Input` / `@Output`.
3. **Inyección Funcional**: Uso exclusivo de la API de inyección funcional `inject()` a nivel de propiedad de clase, promoviendo consistencia sintáctica y tipado seguro frente a la inyección por constructor.
4. **Arquitectura Facade-Service**:
   - **Vistas y Formularios**: Componentes de UI puros (típicamente síncronos) que interactúan exclusivamente con su controlador de estado local (Facade).
   - **Facades**: Gestionan el estado asincrónico mediante Signals (`actionStatus`, `errorMessage`, señales de datos) y orquestan las operaciones complejas limpiando flujos con `takeUntilDestroyed(this.destroyRef)`.
   - **Servicios REST**: Clases desacopladas del ciclo de vida de los componentes que extienden un `BaseService` compartido para obtener métodos de persistencia listos para usar (`getById`, `create`, `update`, `delete`, etc.).
5. **Formularios Estrictamente Tipados**: Formularios reactivos construidos con `NonNullableFormBuilder` y tipado explícito para la estructura de valores y controles (`FormValueGroup`), protegiendo el estado de modificaciones externas mediante modificadores `protected readonly`.
6. **Coexistencia CSS Avanzada**: Fusión elegante de los tokens de diseño y mixins Sass específicos de **Angular Material 3** (`mat.button-overrides`, `mat.sidenav-overrides`, etc.) dentro de `src/themes/custom-theme.scss`, trabajando en conjunto con la flexibilidad responsiva de **Tailwind CSS v4** sobre PostCSS.

---

## 🤖 Desarrollo Impulsado por Agentes (Agent-Skills)

El repositorio incluye un conjunto de archivos de instrucción optimizados en el directorio `.gemini/skills/` que instruyen a tu agente de IA a seguir rigurosamente los estándares de código de este boilerplate:

- [`.gemini/skills/component/`](file:///.gemini/skills/component/): Reglas para componentes modernos con Signals, SFC y native control flow.
- [`.gemini/skills/form-component/`](file:///.gemini/skills/form-component/): Reglas de formularios reactivos estructurados, tipados y protegidos.
- [`.gemini/skills/service/`](file:///.gemini/skills/service/): Normas de encapsulación HTTP y extensión del `BaseService`.
- [`.gemini/skills/facade/`](file:///.gemini/skills/facade/): Patrones de orquestación de llamadas y gestión reactiva de estado local.
- [`.gemini/skills/angular-standalone-sfc-practices.md`](file:///.gemini/skills/angular-standalone-sfc-practices.md): Estándares de componentes autónomos.
- [`.gemini/skills/angular-material-m3-theming.md`](file:///.gemini/skills/angular-material-m3-theming.md): Guías de personalización de temas M3.
- [`.gemini/skills/tailwind-v4-angular.md`](file:///.gemini/skills/tailwind-v4-angular.md): Pautas de integración y utilidades rápidas.

---

## 🛠️ Comandos de Desarrollo

La plantilla utiliza la CLI estándar de Angular para compilación y desarrollo:

### Servidor de Desarrollo
Ejecuta el servidor de pruebas local en `http://localhost:4200/`:
```bash
ng serve
```

### Generación de Código
Para generar rápidamente piezas de código bajo los estándares de Angular, usa la herramienta integrada de andamiaje:
```bash
ng generate component mi-componente
```

### Compilación para Producción
Compila el bundle optimizado y minificado dentro de la carpeta `dist/`:
```bash
ng build
```

### Pruebas Unitarias
Ejecuta los tests configurados mediante Karma/Jasmine:
```bash
ng test
```

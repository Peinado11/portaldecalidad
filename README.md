# Portal de Entrenamiento Onboarding

Sistema web intuitivo para el entrenamiento de nuevos empleados mediante videos de YouTube, con seguimiento de progreso y gestión de exámenes.

---

## 🚀 INICIO RÁPIDO

### ¿Primera vez usando esta aplicación?

**📖 Guías paso a paso (explicadas muy fácilmente):**

1. **[⚡ INICIO RÁPIDO](INICIO_RAPIDO.md)** - Empieza aquí (5 minutos)
2. **[💻 Guía Local Completa](GUIA_LOCAL.md)** - Cómo probar en tu computadora (explicado para principiantes)
3. **[🌐 Guía de Despliegue](GUIA_HOSTGATOR.md)** - Cómo ponerlo en internet (HostGator, Railway, Render)

### Comandos rápidos para usuarios experimentados:
```bash
npm install    # Instalar dependencias
npm start      # Iniciar servidor
```
Luego abre: `http://localhost:3000` | Login: `admin` / `admin1`

---

## Características

- **Panel de Administración**: Gestión completa de videos y empleados
- **Panel de Empleado**: Visualización de videos con seguimiento de progreso
- **Base de datos SQLite**: Sin necesidad de configuración compleja
- **Diseño Responsive**: Funciona perfectamente en dispositivos móviles y escritorio
- **Interfaz Intuitiva**: Diseño moderno y fácil de usar

## Funcionalidades

### Para Administradores (RH)
- Crear y gestionar videos de entrenamiento
- Agregar enlaces de YouTube, PDFs y exámenes
- Crear usuarios de empleados
- Ver estadísticas de progreso de todos los empleados
- Dashboard con información completa

### Para Empleados
- Ver videos de entrenamiento
- Seguimiento de progreso personal
- Acceso a documentos PDF
- Realizar exámenes
- Visualización de estadísticas personales

## Requisitos

- Node.js (versión 14 o superior)
- npm (gestor de paquetes de Node.js)

## Instalación

### 1. Clonar o descargar el proyecto

```bash
git clone <url-del-repositorio>
cd portaldecalidad
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar el servidor

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## Uso

### Primer Acceso - Administrador

1. Abre tu navegador en `http://localhost:3000`
2. Usa las credenciales del administrador:
   - **Usuario**: `admin`
   - **Contraseña**: `admin1`

### Panel de Administración

Una vez dentro del panel de administración, puedes:

#### Agregar Videos de Entrenamiento

1. Ve a la pestaña "Videos de Entrenamiento"
2. Haz clic en "+ Agregar Video"
3. Completa el formulario:
   - **Nombre del Video**: Título descriptivo
   - **Descripción**: Breve descripción del contenido
   - **URL del Video de YouTube**: Link completo del video
     - Ejemplo: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - **URL del PDF**: (Opcional) Link al documento de apoyo
   - **URL del Examen**: (Opcional) Link al formulario de examen
     - Puede ser Google Forms, Microsoft Forms, etc.
   - **Orden**: Número para ordenar los videos
4. Haz clic en "Guardar"

#### Crear Empleados

1. Ve a la pestaña "Empleados"
2. Haz clic en "+ Agregar Empleado"
3. Completa el formulario:
   - **Nombre Completo**: Nombre del empleado
   - **Puesto**: Cargo del empleado
   - **Usuario (Correo)**: Email del empleado
   - **Contraseña (RFC)**: RFC del empleado (recomendado)
4. Haz clic en "Guardar"

#### Ver Estadísticas

1. Ve a la pestaña "Estadísticas"
2. Verás el progreso de todos los empleados:
   - Videos completados
   - Exámenes completados
   - Porcentaje de avance

### Panel del Empleado

Los empleados pueden acceder con el usuario y contraseña creados por el administrador:

1. Iniciar sesión con sus credenciales
2. Ver estadísticas personales de progreso
3. Ver todos los videos disponibles
4. Hacer clic en un video para verlo
5. Marcar videos como completados
6. Acceder a documentos PDF
7. Realizar exámenes cuando completen un video

## Estructura del Proyecto

```
portaldecalidad/
├── public/                 # Archivos públicos (frontend)
│   ├── css/
│   │   └── styles.css     # Estilos de la aplicación
│   ├── js/
│   │   ├── login.js       # Lógica del login
│   │   ├── admin.js       # Lógica del panel admin
│   │   └── employee.js    # Lógica del panel empleado
│   ├── login.html         # Página de login
│   ├── admin.html         # Panel de administración
│   └── employee.html      # Panel del empleado
├── database.js            # Configuración de la base de datos
├── server.js              # Servidor Express
├── package.json           # Dependencias del proyecto
└── README.md             # Este archivo
```

## Base de Datos

La aplicación usa SQLite, que crea automáticamente un archivo `onboarding.db` en la raíz del proyecto. Este archivo contiene todas las tablas necesarias:

- **users**: Administradores y empleados
- **videos**: Videos de entrenamiento
- **progreso**: Seguimiento del progreso de empleados

No necesitas configurar nada, la base de datos se crea automáticamente al iniciar el servidor.

## Tecnologías Utilizadas

- **Backend**: Node.js + Express
- **Base de datos**: SQLite3
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Sesiones**: express-session

## Consejos de Uso

### Para Videos de YouTube

1. Asegúrate de que los videos sean públicos o no listados
2. Copia el link completo del video:
   - Formato válido: `https://www.youtube.com/watch?v=VIDEO_ID`
   - También funciona: `https://youtu.be/VIDEO_ID`

### Para Exámenes

Puedes usar cualquier plataforma de formularios:
- Google Forms
- Microsoft Forms
- Typeform
- SurveyMonkey

Solo necesitas copiar el enlace público del formulario.

### Para Documentos PDF

Puedes usar:
- Google Drive (con permisos públicos)
- Dropbox (con link público)
- OneDrive (con link público)
- Servidor propio

## Seguridad

**IMPORTANTE**: Esta aplicación es para uso interno. Para producción, considera:

1. Cambiar las credenciales del administrador
2. Usar contraseñas hasheadas (bcrypt)
3. Implementar HTTPS
4. Agregar rate limiting
5. Implementar CSRF protection
6. Validación más robusta en el backend

## Solución de Problemas

### El servidor no inicia

```bash
# Verifica que Node.js esté instalado
node --version

# Reinstala las dependencias
rm -rf node_modules
npm install
```

### No se pueden ver los videos

- Verifica que el link de YouTube sea correcto
- Asegúrate de que el video sea público o no listado
- Revisa la consola del navegador para errores

### Error de base de datos

- Elimina el archivo `onboarding.db` y reinicia el servidor
- Se creará una nueva base de datos automáticamente

## Soporte

Para problemas o preguntas, contacta al departamento de TI o RH.

## Licencia

MIT

---

Desarrollado para facilitar el proceso de onboarding de nuevos empleados.

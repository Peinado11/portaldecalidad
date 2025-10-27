# 📥 CÓMO DESCARGAR EL PROYECTO A TU COMPUTADORA

## 🎯 Opción 1: Descargar ZIP (MÁS FÁCIL - No necesitas Git)

### Paso 1: Ir a GitHub
1. Abre tu navegador
2. Ve a la página de tu proyecto en GitHub
3. La URL es algo como: `https://github.com/TU_USUARIO/portaldecalidad`

### Paso 2: Descargar
1. Busca el botón verde que dice **"Code"** (arriba a la derecha)
2. Haz clic en él
3. Verás un menú desplegable
4. Haz clic en **"Download ZIP"**

### Paso 3: Descomprimir
1. Ve a tu carpeta de Descargas
2. Busca el archivo `portaldecalidad-main.zip` (o similar)
3. Haz clic derecho sobre él
4. Selecciona "Extraer aquí" o "Descomprimir"

### Paso 4: Abrir la carpeta
1. Entra a la carpeta descomprimida
2. Verás todos los archivos: `GUIA_LOCAL.md`, `server.js`, etc.
3. **¡Ahora SÍ puedes abrir los archivos!**

### Paso 5: Leer las guías
1. Haz doble clic en `GUIA_LOCAL.md`
2. Se abrirá con tu editor de texto o navegador
3. ¡Lee y sigue los pasos! 📖

---

## 🎯 Opción 2: Clonar con Git (Si ya tienes Git instalado)

### ¿Tienes Git?
Para verificar, abre tu terminal/cmd y escribe:
```bash
git --version
```

Si ves algo como `git version 2.x.x` → ¡Tienes Git! ✅

### Clonar el proyecto
```bash
# Opción A: Si tienes acceso al repositorio
git clone https://github.com/TU_USUARIO/portaldecalidad.git
cd portaldecalidad

# Opción B: Cambiar a la rama específica
git checkout claude/employee-onboarding-platform-011CUY84h225spGsyV9BFGFY
```

---

## 🎯 Opción 3: Ya lo tienes pero no sabes dónde

### ¿Descargaste el proyecto antes?
Búscalo en estas carpetas comunes:
- Windows: `C:\Users\TU_USUARIO\Documentos\`
- Windows: `C:\Users\TU_USUARIO\Desktop\`
- Mac: `/Users/TU_USUARIO/Documents/`
- Mac: `/Users/TU_USUARIO/Desktop/`

### Usa la búsqueda de tu computadora:
- Windows: Presiona `Windows + S` y busca "portaldecalidad"
- Mac: Presiona `Cmd + Espacio` y busca "portaldecalidad"

---

## 📂 Cómo saber que estás en la carpeta correcta

Cuando estés en la carpeta `portaldecalidad`, deberías ver estos archivos:

```
✅ INICIO_RAPIDO.md
✅ GUIA_LOCAL.md
✅ GUIA_HOSTGATOR.md
✅ README.md
✅ server.js
✅ database.js
✅ package.json
✅ Carpeta: public/
```

Si ves todos estos archivos, ¡estás en el lugar correcto! 🎉

---

## 🚀 SIGUIENTE PASO

Una vez que tengas los archivos:

1. **Abre `GUIA_LOCAL.md`** con:
   - Bloc de notas (Windows)
   - TextEdit (Mac)
   - Navegador web
   - Visual Studio Code
   - Cualquier editor de texto

2. **Lee la guía completa**

3. **Sigue los pasos uno por uno**

---

## 🆘 ¿Todavía no lo encuentras?

### Opción SUPER FÁCIL: Te lo copio aquí abajo

Si no puedes descargar o encontrar los archivos, aquí está el contenido de las guías principales:

---

# 📖 GUÍA LOCAL - Versión en Texto Plano

## 🎯 LO QUE VAS A HACER:

1. Instalar Node.js (el motor que hace funcionar la aplicación)
2. Descargar el proyecto
3. Instalar las piezas que necesita (dependencias)
4. Iniciar la aplicación
5. Abrirla en tu navegador
6. ¡Usarla!

---

## PASO 1: Instalar Node.js

### ¿Qué es?
Node.js es como el motor de un carro. Sin él, la aplicación no arranca.

### ¿Cómo instalarlo?

**Si usas WINDOWS:**
1. Abre tu navegador (Chrome, Firefox, Edge)
2. Ve a esta página: https://nodejs.org
3. Verás 2 botones grandes de descarga
4. Dale clic al que dice "LTS" (Recommended)
5. Se descargará un archivo como: `node-v18.17.0-x64.msi`
6. Cuando termine, búscalo en tus Descargas
7. Haz doble clic en él
8. Te aparecerá un instalador
9. Dale "Next" (Siguiente) a todo
10. Al final dale "Finish" (Finalizar)
11. ¡Listo! Node.js está instalado ✅

**Si usas MAC:**
1. Abre Safari o tu navegador
2. Ve a: https://nodejs.org
3. Dale clic al botón "LTS"
4. Se descargará un archivo .pkg
5. Ábrelo desde Descargas
6. Sigue las instrucciones (dale continuar a todo)
7. Te pedirá tu contraseña de Mac (escríbela)
8. ¡Listo! ✅

### ¿Cómo verifico que funcionó?

**En WINDOWS:**
1. Presiona la tecla de Windows
2. Escribe: `cmd`
3. Se abrirá una ventana negra (Command Prompt)
4. Escribe exactamente esto y presiona Enter:
   ```
   node --version
   ```
5. Si ves algo como `v18.17.0` → ¡Funciona! ✅
6. Si dice "no se reconoce el comando" → Reinicia tu computadora y vuelve a intentar

**En MAC:**
1. Presiona Cmd + Espacio
2. Escribe: `terminal`
3. Se abrirá la Terminal
4. Escribe:
   ```
   node --version
   ```
5. Si ves un número como `v18.17.0` → ¡Funciona! ✅

---

## PASO 2: Abrir la carpeta del proyecto

Ya debes tener la carpeta `portaldecalidad` en tu computadora (si no, lee la parte de arriba de este archivo).

### En WINDOWS:
1. Abre la carpeta donde está el proyecto
2. Haz clic en la barra de direcciones (arriba)
3. Escribe: `cmd`
4. Presiona Enter
5. Se abrirá el Command Prompt YA en esa carpeta ✅

**O también puedes:**
1. Abrir cmd (Windows + R, escribir `cmd`, Enter)
2. Escribir:
   ```
   cd C:\ruta\a\tu\carpeta\portaldecalidad
   ```
   (Cambia esa ruta por donde realmente está tu proyecto)

### En MAC:
1. Abre Terminal (Cmd + Espacio, escribe "terminal")
2. Escribe `cd ` (con espacio al final)
3. Arrastra la carpeta del proyecto a la ventana de Terminal
4. Presiona Enter

---

## PASO 3: Instalar las dependencias

Las dependencias son como las "piezas" que necesita la aplicación para funcionar.

### En la terminal/cmd (que debe estar en la carpeta del proyecto):

1. Escribe exactamente esto:
   ```
   npm install
   ```

2. Presiona Enter

3. Verás MUCHAS letras corriendo en la pantalla
   - Esto es NORMAL ✅
   - NO cierres la ventana
   - Puede tardar 1-3 minutos

4. Cuando termine verás algo como:
   ```
   added 50 packages
   ```

5. ¡Listo! Las piezas están instaladas ✅

### Si ves errores:
- Asegúrate de estar en la carpeta correcta
- Verifica que Node.js esté instalado (`node --version`)
- Cierra la terminal y ábrela de nuevo

---

## PASO 4: Iniciar la aplicación

¡Momento emocionante! Vamos a encender la aplicación.

### En la misma terminal:

1. Escribe:
   ```
   npm start
   ```

2. Presiona Enter

3. Espera unos segundos...

4. Cuando veas esto, significa que FUNCIONA:
   ```
   ========================================
   🚀 Servidor iniciado en http://localhost:3000
   ========================================

   👤 Usuario Admin:
      Usuario: admin
      Contraseña: admin1
   ```

5. ⚠️ IMPORTANTE: NO CIERRES esta ventana
   - Mientras esté abierta, la aplicación está funcionando
   - Si la cierras, la aplicación se apaga

---

## PASO 5: Abrir en el navegador

1. Abre tu navegador favorito (Chrome, Firefox, Edge, Safari)

2. En la barra de direcciones (arriba) escribe EXACTAMENTE:
   ```
   http://localhost:3000
   ```

3. Presiona Enter

4. ¡Deberías ver la página de LOGIN! 🎉

### Si no carga:
- Asegúrate de escribir `http://` (no `https://`)
- Verifica que la terminal diga "Servidor iniciado"
- Espera 10 segundos más y refresca la página

---

## PASO 6: Hacer Login

1. En la página de login verás dos campos

2. Escribe:
   - **Usuario**: admin
   - **Contraseña**: admin1

3. Dale clic a "Iniciar Sesión"

4. ¡Deberías entrar al Panel de Administración! 🎊

---

## PASO 7: Probar la aplicación

### Agregar tu primer video:

1. Busca un video en YouTube, por ejemplo:
   https://www.youtube.com/watch?v=dQw4w9WgXcQ

2. En el Panel de Admin, dale clic a "+ Agregar Video"

3. Llena el formulario:
   - **Nombre**: Video de Bienvenida
   - **Descripción**: Este es el primer video de prueba
   - **URL del Video**: (pega el link de YouTube)
   - **Orden**: 1

4. Dale "Guardar"

5. ¡Deberías ver tu video en la lista! ✅

### Crear un empleado de prueba:

1. Ve a la pestaña "Empleados"

2. Dale "+ Agregar Empleado"

3. Llena:
   - **Nombre**: Juan Pérez
   - **Puesto**: Vendedor
   - **Usuario**: juan@empresa.com
   - **Contraseña**: JUAP850101ABC

4. Dale "Guardar"

### Probar como empleado:

1. Cierra sesión (botón arriba a la derecha)

2. Haz login con:
   - Usuario: juan@empresa.com
   - Contraseña: JUAP850101ABC

3. ¡Verás el panel del empleado con el video! 🎉

4. Haz clic en el video para verlo

5. Prueba marcar el video como completado

---

## PASO 8: Detener la aplicación

Cuando termines de probar:

1. Ve a la ventana de terminal/cmd

2. Presiona: `Ctrl + C` (en Windows y Mac)

3. La aplicación se detendrá

4. Para volver a iniciarla: `npm start`

---

## 🆘 PROBLEMAS COMUNES

### Error: "npm no se reconoce"
**Problema**: Node.js no está instalado correctamente
**Solución**:
- Reinstala Node.js
- Reinicia tu computadora
- Verifica con `node --version`

### Error: "Puerto 3000 ya está en uso"
**Problema**: Algo más está usando el puerto 3000
**Solución**:
- Cierra otras aplicaciones
- O cambia el puerto editando `server.js` y cambiando `3000` por `3001`

### La página no carga
**Problema**: El servidor no está corriendo o hay un error de conexión
**Solución**:
- Verifica que la terminal diga "Servidor iniciado"
- Asegúrate de usar `http://` no `https://`
- Revisa si hay errores en la terminal

### Error al instalar dependencias
**Problema**: Puede ser problema de internet o permisos
**Solución**:
- Verifica tu conexión a internet
- En Mac/Linux: prueba con `sudo npm install`
- Borra la carpeta `node_modules` y vuelve a ejecutar `npm install`

---

## ✅ LISTA DE VERIFICACIÓN

Marca cada paso cuando lo completes:

- [ ] Node.js instalado (verificado con `node --version`)
- [ ] Proyecto descargado/descomprimido
- [ ] Terminal abierta en la carpeta del proyecto
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor iniciado (`npm start`)
- [ ] Navegador abierto en `http://localhost:3000`
- [ ] Login exitoso con admin/admin1
- [ ] Video de prueba agregado
- [ ] Empleado de prueba creado
- [ ] Login de empleado probado
- [ ] Video marcado como completado

---

## 🎉 ¡FELICIDADES!

Si completaste todos los pasos, ¡ya tienes tu plataforma de onboarding funcionando!

**Siguiente paso**: Leer `GUIA_HOSTGATOR.md` para ponerla en internet.

---

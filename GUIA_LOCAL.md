# 🚀 GUÍA FÁCIL: Cómo Probar la Plataforma en Tu Computadora

## 📦 Paso 1: Instalar Node.js (Solo la primera vez)

### ¿Qué es Node.js?
Es como el "motor" que hace funcionar la aplicación. Sin él, la aplicación no funciona.

### ¿Cómo instalarlo?

**Para Windows:**
1. Ve a: https://nodejs.org
2. Descarga la versión LTS (la que dice "Recommended")
3. Haz doble clic en el archivo descargado
4. Dale "Siguiente, Siguiente, Siguiente" a todo
5. Al final, dale "Finalizar"

**Para Mac:**
1. Ve a: https://nodejs.org
2. Descarga la versión LTS
3. Abre el archivo .pkg descargado
4. Sigue las instrucciones

### Verificar que se instaló:
1. Abre la "Terminal" o "Símbolo del sistema":
   - **Windows**: Presiona la tecla Windows + R, escribe `cmd` y Enter
   - **Mac**: Busca "Terminal" en Spotlight (Cmd + Espacio)

2. Escribe esto y presiona Enter:
   ```
   node --version
   ```

3. Si ves algo como `v18.17.0` o similar, ¡funciona! ✅

---

## 📂 Paso 2: Abrir el Proyecto

1. **Abre la terminal/cmd** (como en el paso anterior)

2. **Ve a la carpeta del proyecto**. Escribe:
   ```
   cd ruta/donde/esta/portaldecalidad
   ```

   **💡 Truco fácil:**
   - En Windows: Arrastra la carpeta a la ventana del cmd
   - En Mac: Escribe `cd ` (con espacio) y arrastra la carpeta

3. **Verifica que estás en el lugar correcto**. Escribe:
   ```
   dir
   ```
   (En Mac/Linux usa: `ls`)

   Deberías ver archivos como: `server.js`, `package.json`, `database.js`

---

## 📥 Paso 3: Instalar las Dependencias

**¿Qué son las dependencias?**
Son como las "piezas" que necesita la aplicación para funcionar. Como los ingredientes de una receta.

**¿Cómo instalarlas?**

1. En la terminal (asegúrate de estar en la carpeta del proyecto)

2. Escribe este comando y presiona Enter:
   ```
   npm install
   ```

3. **Espera...** Verás muchas letras corriendo. Esto es NORMAL ✅
   - Puede tardar 1-3 minutos
   - Cuando termine, verás algo como "added 50 packages"

4. **¡Listo!** Se creó una carpeta llamada `node_modules` con todas las piezas

---

## 🎬 Paso 4: ¡Iniciar la Aplicación!

1. En la misma terminal, escribe:
   ```
   npm start
   ```

2. **¡ESPERA!** No cierres la ventana. Verás algo como:
   ```
   ========================================
   🚀 Servidor iniciado en http://localhost:3000
   ========================================

   📚 Portal de Entrenamiento Onboarding

   👤 Usuario Admin:
      Usuario: admin
      Contraseña: admin1
   ```

3. **¡Eso significa que FUNCIONA!** 🎉

---

## 🌐 Paso 5: Abrir en el Navegador

1. **Abre tu navegador favorito** (Chrome, Firefox, Edge, Safari)

2. **En la barra de direcciones** escribe exactamente:
   ```
   http://localhost:3000
   ```

3. Presiona Enter

4. **¡Deberías ver la página de login!** 🎊

---

## 🔐 Paso 6: Probar el Login de Administrador

1. En la página de login, escribe:
   - **Usuario**: `admin`
   - **Contraseña**: `admin1`

2. Dale clic a "Iniciar Sesión"

3. **¡Deberías entrar al Panel de Administración!** 🎉

---

## 🎥 Paso 7: Agregar un Video de Prueba

Vamos a agregar tu primer video:

1. **Busca un video en YouTube**. Por ejemplo:
   - https://www.youtube.com/watch?v=dQw4w9WgXcQ

2. **En el Panel de Admin**, dale clic a "+ Agregar Video"

3. **Llena el formulario**:
   - **Nombre**: "Video de Prueba 1"
   - **Descripción**: "Este es mi primer video"
   - **URL del Video**: Pega el link de YouTube
   - **Orden**: 1

4. Dale clic a "Guardar"

5. **¡Deberías ver tu video en la lista!** ✅

---

## 👤 Paso 8: Crear un Empleado de Prueba

1. **En el Panel de Admin**, ve a la pestaña "Empleados"

2. Dale clic a "+ Agregar Empleado"

3. **Llena el formulario**:
   - **Nombre**: "Juan Pérez"
   - **Puesto**: "Vendedor"
   - **Usuario**: "juan@empresa.com"
   - **Contraseña**: "JUAP850101ABC"

4. Dale clic a "Guardar"

5. **¡El empleado está creado!** ✅

---

## 🧪 Paso 9: Probar como Empleado

1. **Cierra sesión** (botón arriba a la derecha)

2. **Vuelve a hacer login**, pero ahora con:
   - **Usuario**: `juan@empresa.com`
   - **Contraseña**: `JUAP850101ABC`

3. **¡Deberías ver el Panel del Empleado!** con:
   - Estadísticas de progreso
   - El video que agregaste

4. **Haz clic en el video** para verlo

5. **Prueba marcar el video como completado**

---

## 🛑 Paso 10: Detener la Aplicación

Cuando termines de probar:

1. Ve a la terminal donde está corriendo
2. Presiona: `Ctrl + C` (en Windows y Mac)
3. La aplicación se detendrá

**Para volver a iniciarla:**
- Escribe otra vez: `npm start`

---

## 🆘 ¿Problemas Comunes?

### ❌ "npm no se reconoce como comando"
**Solución**: Node.js no está instalado. Vuelve al Paso 1.

### ❌ "Puerto 3000 ya está en uso"
**Solución**: Algo ya está usando ese puerto. Cierra otras aplicaciones o usa:
```
npm start -- --port 3001
```
Y abre: http://localhost:3001

### ❌ "Cannot find module..."
**Solución**: Las dependencias no se instalaron. Ejecuta:
```
npm install
```

### ❌ La página no carga
**Solución**:
1. Verifica que la terminal diga "Servidor iniciado"
2. Asegúrate de escribir exactamente: `http://localhost:3000`
3. No uses `https://` solo `http://`

---

## ✅ Lista de Verificación

- [ ] Node.js instalado
- [ ] Proyecto descargado/clonado
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor iniciado (`npm start`)
- [ ] Navegador abierto en `http://localhost:3000`
- [ ] Login exitoso con admin/admin1
- [ ] Video de prueba agregado
- [ ] Empleado de prueba creado
- [ ] Login de empleado funciona

---

## 🎉 ¡Felicidades!

Si llegaste hasta aquí y todo funciona, ¡lo lograste! Ahora estás listo para el siguiente paso: subirlo a HostGator.

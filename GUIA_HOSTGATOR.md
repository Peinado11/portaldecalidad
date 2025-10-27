# 🌐 GUÍA: Cómo Poner tu Aplicación en Internet

## 🤔 INFORMACIÓN IMPORTANTE PRIMERO

### ⚠️ Sobre HostGator

**HostGator tiene 2 tipos de hosting:**

1. **Hosting Compartido** (el más común, más barato)
   - ❌ **NO soporta Node.js directamente**
   - ✅ Solo soporta PHP, HTML, WordPress
   - 💰 Cuesta $3-10/mes

2. **Hosting VPS/Cloud** (más caro, más control)
   - ✅ **SÍ soporta Node.js**
   - ✅ Tienes control total del servidor
   - 💰 Cuesta $20-100/mes

### 🎯 ¿Qué opción tienes?

**Para saber qué tipo tienes:**
1. Entra a tu panel de HostGator (cPanel)
2. Si ves opciones como "Setup Node.js App" → Tienes VPS ✅
3. Si NO ves esa opción → Tienes hosting compartido ❌

---

## 🚀 OPCIÓN 1: Usar un Servicio GRATIS y Fácil (RECOMENDADO)

En lugar de HostGator, te recomiendo usar **Railway.app** o **Render.com**:

### ✅ Ventajas:
- 🆓 **GRATIS** (con límites generosos)
- ⚡ **MUY FÁCIL** de usar (más fácil que HostGator)
- 🔄 Se actualiza automáticamente desde GitHub
- ⚙️ Soporta Node.js perfectamente
- 🌍 Tu aplicación estará disponible 24/7

### 📦 Opción A: Railway.app (La más fácil)

#### Paso 1: Crear cuenta en Railway
1. Ve a: https://railway.app
2. Dale clic a "Start a New Project"
3. Inicia sesión con GitHub (o crea cuenta gratis)

#### Paso 2: Conectar tu proyecto
1. Dale clic a "Deploy from GitHub repo"
2. Selecciona tu repositorio: `portaldecalidad`
3. Railway detectará automáticamente que es Node.js ✅

#### Paso 3: Configurar el proyecto
1. Railway preguntará qué comando usar
2. Déjalo en: `npm start`
3. Dale clic a "Deploy"

#### Paso 4: Esperar el despliegue
1. Verás un progreso de "Building..."
2. Tarda 2-5 minutos
3. Cuando termine dirá "Success" ✅

#### Paso 5: Obtener la URL
1. Ve a "Settings" → "Networking"
2. Dale clic a "Generate Domain"
3. Te dará una URL como: `https://tu-app.railway.app`

#### Paso 6: ¡Abrir tu aplicación!
1. Abre esa URL en tu navegador
2. ¡Deberías ver el login! 🎉
3. Usa: `admin` / `admin1`

**💰 Costo:** GRATIS hasta 500 horas/mes (suficiente para uso normal)

---

### 📦 Opción B: Render.com (También muy fácil)

#### Paso 1: Crear cuenta
1. Ve a: https://render.com
2. Dale clic a "Get Started for Free"
3. Inicia sesión con GitHub

#### Paso 2: Crear Web Service
1. Dale clic a "New +"
2. Selecciona "Web Service"
3. Conecta tu repositorio de GitHub

#### Paso 3: Configurar
1. **Name**: portaldecalidad
2. **Environment**: Node
3. **Build Command**: `npm install`
4. **Start Command**: `npm start`
5. **Plan**: Free

#### Paso 4: Deploy
1. Dale clic a "Create Web Service"
2. Espera 3-5 minutos
3. ¡Listo! ✅

#### Paso 5: Obtener URL
1. En el dashboard verás una URL como: `https://portaldecalidad.onrender.com`
2. Ábrela en tu navegador
3. ¡Ya está funcionando! 🎉

**💰 Costo:** GRATIS (con algunas limitaciones)

---

## 🖥️ OPCIÓN 2: Usar HostGator VPS (Si tienes plan VPS)

### ⚠️ Solo si tu HostGator tiene Node.js

#### Paso 1: Conectarte por SSH
1. Abre tu terminal/cmd
2. Usa el comando SSH que te dio HostGator:
   ```
   ssh usuario@tu-servidor.hostgator.com
   ```
3. Escribe tu contraseña

#### Paso 2: Instalar Node.js (si no está)
```bash
# Para CentOS/AlmaLinux (común en HostGator)
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Verificar
node --version
npm --version
```

#### Paso 3: Subir tu aplicación

**Opción A: Con Git (más fácil)**
```bash
cd /home/tu-usuario/
git clone https://github.com/tu-usuario/portaldecalidad.git
cd portaldecalidad
npm install
```

**Opción B: Con FileZilla (más visual)**
1. Descarga FileZilla: https://filezilla-project.org
2. Conéctate con tus credenciales SFTP
3. Arrastra toda la carpeta `portaldecalidad` a tu servidor
4. En SSH ejecuta:
   ```bash
   cd portaldecalidad
   npm install
   ```

#### Paso 4: Instalar PM2 (para que corra siempre)
```bash
sudo npm install -g pm2
pm2 start server.js --name portaldecalidad
pm2 save
pm2 startup
```

#### Paso 5: Configurar el puerto
```bash
# Editar server.js para usar puerto 80 o el que te asigne HostGator
```

#### Paso 6: Configurar dominio
1. En cPanel de HostGator
2. Ve a "Domains" o "Addon Domains"
3. Apunta tu dominio al puerto de la aplicación

**💰 Costo:** Lo que ya pagas por VPS ($20-100/mes)

---

## 🔧 OPCIÓN 3: HostGator Compartido + Backend Externo

Si solo tienes hosting compartido:

### Arquitectura:
1. **Frontend** (HTML/CSS/JS) → HostGator
2. **Backend** (Node.js) → Railway/Render

### Pasos:
1. Sube solo la carpeta `public/` a HostGator
2. Despliega el backend en Railway/Render
3. Modifica los archivos JS para apuntar al backend

**⚠️ Esto requiere modificar código, no lo recomiendo si es tu primera vez**

---

## 🎯 MI RECOMENDACIÓN PARA TI

### Si es tu primera vez:
**✅ USA RAILWAY.APP O RENDER.COM**

**¿Por qué?**
- 🆓 Es GRATIS
- 😊 Es MUY FÁCIL (más que HostGator)
- ⚡ Se despliega en 5 minutos
- 🔄 Se actualiza automáticamente
- 🌍 Funciona 24/7

### Si tienes HostGator VPS:
**✅ Usa HostGator** pero necesitarás conocimientos de SSH

### Si tienes HostGator compartido:
**✅ Usa Railway/Render** para esta app y guarda HostGator para otras cosas

---

## 📋 Pasos Rápidos para Railway (Recomendado)

1. **Preparar el proyecto** (solo la primera vez):
   ```bash
   # En tu terminal, dentro de la carpeta del proyecto
   git add .
   git commit -m "Preparar para despliegue"
   git push
   ```

2. **Ir a Railway**:
   - https://railway.app
   - Login con GitHub
   - "New Project" → "Deploy from GitHub"
   - Seleccionar `portaldecalidad`

3. **Esperar 3 minutos** ⏱️

4. **Generar dominio**:
   - Settings → Networking → Generate Domain

5. **¡LISTO!** 🎉
   - Copia la URL
   - Ábrela en tu navegador
   - Login: `admin` / `admin1`

---

## 🆘 Problemas Comunes

### "Build failed" en Railway
**Solución**: Asegúrate de que `package.json` esté en la raíz

### "Application error"
**Solución**: Revisa los logs en Railway/Render dashboard

### "Cannot connect to database"
**Solución**: SQLite debería funcionar automáticamente

### No puedo ver mi aplicación
**Solución**:
1. Verifica que el deploy haya terminado (status: "Active")
2. Espera 1-2 minutos después del primer deploy
3. Refresca la página

---

## 💡 Consejos Finales

### Para Seguridad:
1. **Cambia la contraseña del admin** después del primer login
2. **Usa HTTPS** (Railway/Render lo dan gratis)
3. **No compartas las credenciales** en público

### Para Mantenimiento:
1. **Haz backups** de la base de datos (`onboarding.db`)
2. **Revisa los logs** regularmente
3. **Actualiza** cuando agregues nuevas funciones

### Para Costos:
1. **Railway Free**: 500 horas/mes (suficiente para 1 usuario)
2. **Render Free**: Ilimitado pero se duerme después de 15 min inactivo
3. **Planes pagados**: $5-20/mes si necesitas más

---

## ✅ Resumen

| Opción | Dificultad | Costo | Tiempo | Recomendado |
|--------|-----------|-------|---------|-------------|
| Railway.app | 😊 Fácil | 🆓 Gratis | 5 min | ✅ SÍ |
| Render.com | 😊 Fácil | 🆓 Gratis | 5 min | ✅ SÍ |
| HostGator VPS | 😰 Difícil | 💰 $20+/mes | 30 min | ⚠️ Solo si ya tienes |
| HostGator Compartido | 😱 Muy Difícil | 💰 $10/mes | 2 horas | ❌ NO |

---

## 🎓 Siguiente Paso

1. **Pruébalo primero localmente** (GUIA_LOCAL.md)
2. **Cuando funcione bien**, súbelo a Railway
3. **Comparte la URL** con tu equipo
4. **¡Disfruta tu plataforma de onboarding!** 🎉

const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear o abrir la base de datos
const dbPath = path.join(__dirname, 'onboarding.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
        initDatabase();
    }
});

// Inicializar las tablas
function initDatabase() {
    // Tabla de usuarios (administradores y empleados)
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        puesto TEXT,
        usuario TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        tipo TEXT NOT NULL CHECK(tipo IN ('admin', 'empleado')),
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error al crear tabla users:', err.message);
        } else {
            // Insertar usuario administrador por defecto
            db.run(`INSERT OR IGNORE INTO users (nombre, puesto, usuario, password, tipo)
                    VALUES ('Administrador', 'RH', 'admin', 'admin1', 'admin')`, (err) => {
                if (err) {
                    console.error('Error al crear usuario admin:', err.message);
                } else {
                    console.log('Usuario administrador creado correctamente.');
                }
            });
        }
    });

    // Tabla de videos de entrenamiento
    db.run(`CREATE TABLE IF NOT EXISTS videos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        url_video TEXT NOT NULL,
        url_pdf TEXT,
        url_examen TEXT,
        orden INTEGER,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error al crear tabla videos:', err.message);
        }
    });

    // Tabla de progreso de empleados
    db.run(`CREATE TABLE IF NOT EXISTS progreso (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_id INTEGER NOT NULL,
        video_id INTEGER NOT NULL,
        completado INTEGER DEFAULT 0,
        examen_completado INTEGER DEFAULT 0,
        fecha_completado DATETIME,
        FOREIGN KEY (usuario_id) REFERENCES users(id),
        FOREIGN KEY (video_id) REFERENCES videos(id),
        UNIQUE(usuario_id, video_id)
    )`, (err) => {
        if (err) {
            console.error('Error al crear tabla progreso:', err.message);
        }
    });
}

module.exports = db;

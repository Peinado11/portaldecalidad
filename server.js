const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configurar sesiones
app.use(session({
    secret: 'onboarding-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 horas
}));

// Middleware para verificar autenticación
function requireAuth(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ error: 'No autorizado' });
    }
}

function requireAdmin(req, res, next) {
    if (req.session.user && req.session.user.tipo === 'admin') {
        next();
    } else {
        res.status(403).json({ error: 'Acceso denegado' });
    }
}

// ==================== RUTAS DE AUTENTICACIÓN ====================

// Login
app.post('/api/login', (req, res) => {
    const { usuario, password } = req.body;

    db.get('SELECT * FROM users WHERE usuario = ? AND password = ?',
        [usuario, password], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
        }

        req.session.user = {
            id: user.id,
            nombre: user.nombre,
            usuario: user.usuario,
            tipo: user.tipo,
            puesto: user.puesto
        };

        res.json({
            success: true,
            user: req.session.user
        });
    });
});

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Verificar sesión
app.get('/api/session', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json({ error: 'No hay sesión activa' });
    }
});

// ==================== RUTAS DE ADMINISTRADOR ====================

// Crear usuario empleado
app.post('/api/admin/users', requireAdmin, (req, res) => {
    const { nombre, puesto, usuario, password } = req.body;

    db.run('INSERT INTO users (nombre, puesto, usuario, password, tipo) VALUES (?, ?, ?, ?, ?)',
        [nombre, puesto, usuario, password, 'empleado'], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }
            return res.status(500).json({ error: 'Error al crear usuario' });
        }
        res.json({ success: true, id: this.lastID });
    });
});

// Obtener lista de empleados
app.get('/api/admin/users', requireAdmin, (req, res) => {
    db.all('SELECT id, nombre, puesto, usuario, fecha_creacion FROM users WHERE tipo = ?',
        ['empleado'], (err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.json(users);
    });
});

// Eliminar empleado
app.delete('/api/admin/users/:id', requireAdmin, (req, res) => {
    db.run('DELETE FROM users WHERE id = ? AND tipo = ?', [req.params.id, 'empleado'], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
        res.json({ success: true });
    });
});

// Crear video
app.post('/api/admin/videos', requireAdmin, (req, res) => {
    const { nombre, descripcion, url_video, url_pdf, url_examen, orden } = req.body;

    db.run('INSERT INTO videos (nombre, descripcion, url_video, url_pdf, url_examen, orden) VALUES (?, ?, ?, ?, ?, ?)',
        [nombre, descripcion, url_video, url_pdf, url_examen, orden], function(err) {
        if (err) {
            return res.status(500).json({ error: 'Error al crear video' });
        }
        res.json({ success: true, id: this.lastID });
    });
});

// Obtener todos los videos (admin)
app.get('/api/admin/videos', requireAdmin, (req, res) => {
    db.all('SELECT * FROM videos ORDER BY orden, id', (err, videos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener videos' });
        }
        res.json(videos);
    });
});

// Actualizar video
app.put('/api/admin/videos/:id', requireAdmin, (req, res) => {
    const { nombre, descripcion, url_video, url_pdf, url_examen, orden } = req.body;

    db.run('UPDATE videos SET nombre = ?, descripcion = ?, url_video = ?, url_pdf = ?, url_examen = ?, orden = ? WHERE id = ?',
        [nombre, descripcion, url_video, url_pdf, url_examen, orden, req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar video' });
        }
        res.json({ success: true });
    });
});

// Eliminar video
app.delete('/api/admin/videos/:id', requireAdmin, (req, res) => {
    db.run('DELETE FROM videos WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar video' });
        }
        res.json({ success: true });
    });
});

// Obtener estadísticas de progreso de todos los empleados
app.get('/api/admin/stats', requireAdmin, (req, res) => {
    const query = `
        SELECT
            u.id,
            u.nombre,
            u.puesto,
            COUNT(DISTINCT v.id) as total_videos,
            COUNT(DISTINCT CASE WHEN p.completado = 1 THEN p.video_id END) as videos_completados,
            COUNT(DISTINCT CASE WHEN p.examen_completado = 1 THEN p.video_id END) as examenes_completados
        FROM users u
        CROSS JOIN videos v
        LEFT JOIN progreso p ON u.id = p.usuario_id AND v.id = p.video_id
        WHERE u.tipo = 'empleado'
        GROUP BY u.id
    `;

    db.all(query, (err, stats) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
        res.json(stats);
    });
});

// ==================== RUTAS DE EMPLEADO ====================

// Obtener videos con progreso
app.get('/api/videos', requireAuth, (req, res) => {
    const userId = req.session.user.id;

    const query = `
        SELECT
            v.*,
            COALESCE(p.completado, 0) as completado,
            COALESCE(p.examen_completado, 0) as examen_completado,
            p.fecha_completado
        FROM videos v
        LEFT JOIN progreso p ON v.id = p.video_id AND p.usuario_id = ?
        ORDER BY v.orden, v.id
    `;

    db.all(query, [userId], (err, videos) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener videos' });
        }
        res.json(videos);
    });
});

// Marcar video como completado
app.post('/api/progress/video/:videoId', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const videoId = req.params.videoId;

    db.run(`INSERT INTO progreso (usuario_id, video_id, completado, fecha_completado)
            VALUES (?, ?, 1, datetime('now'))
            ON CONFLICT(usuario_id, video_id)
            DO UPDATE SET completado = 1, fecha_completado = datetime('now')`,
        [userId, videoId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar progreso' });
        }
        res.json({ success: true });
    });
});

// Marcar examen como completado
app.post('/api/progress/exam/:videoId', requireAuth, (req, res) => {
    const userId = req.session.user.id;
    const videoId = req.params.videoId;

    db.run(`INSERT INTO progreso (usuario_id, video_id, examen_completado)
            VALUES (?, ?, 1)
            ON CONFLICT(usuario_id, video_id)
            DO UPDATE SET examen_completado = 1`,
        [userId, videoId], (err) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar progreso del examen' });
        }
        res.json({ success: true });
    });
});

// Obtener estadísticas del usuario
app.get('/api/progress/stats', requireAuth, (req, res) => {
    const userId = req.session.user.id;

    const query = `
        SELECT
            COUNT(DISTINCT v.id) as total_videos,
            COUNT(DISTINCT CASE WHEN p.completado = 1 THEN p.video_id END) as videos_completados,
            COUNT(DISTINCT CASE WHEN p.examen_completado = 1 THEN p.video_id END) as examenes_completados
        FROM videos v
        LEFT JOIN progreso p ON v.id = p.video_id AND p.usuario_id = ?
    `;

    db.get(query, [userId], (err, stats) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener estadísticas' });
        }
        res.json(stats);
    });
});

// ==================== RUTAS DE PÁGINAS HTML ====================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.get('/employee', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'employee.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\n========================================`);
    console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    console.log(`========================================`);
    console.log(`\n📚 Portal de Entrenamiento Onboarding`);
    console.log(`\n👤 Usuario Admin:`);
    console.log(`   Usuario: admin`);
    console.log(`   Contraseña: admin1`);
    console.log(`\n========================================\n`);
});

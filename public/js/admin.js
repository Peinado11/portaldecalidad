let currentEditVideoId = null;

// Verificar sesión al cargar
document.addEventListener('DOMContentLoaded', async function() {
    await checkSession();
    loadVideos();
    loadEmployees();
    loadStats();
});

// Verificar sesión
async function checkSession() {
    try {
        const response = await fetch('/api/session');
        if (!response.ok) {
            window.location.href = '/';
            return;
        }

        const data = await response.json();
        if (data.user.tipo !== 'admin') {
            window.location.href = '/employee';
            return;
        }

        document.getElementById('user-name').textContent = data.user.nombre;
    } catch (error) {
        console.error('Error:', error);
        window.location.href = '/';
    }
}

// Cerrar sesión
async function logout() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/';
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==================== TABS ====================

function switchTab(tabName) {
    // Actualizar tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Actualizar contenido
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById(`${tabName}-tab`).classList.add('active');

    // Recargar datos si es necesario
    if (tabName === 'stats') {
        loadStats();
    }
}

// ==================== VIDEOS ====================

async function loadVideos() {
    try {
        const response = await fetch('/api/admin/videos');
        const videos = await response.json();

        const tbody = document.getElementById('videos-table-body');

        if (videos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No hay videos registrados</td></tr>';
            return;
        }

        tbody.innerHTML = videos.map(video => `
            <tr>
                <td>${video.orden || '-'}</td>
                <td><strong>${video.nombre}</strong></td>
                <td>${video.descripcion || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-outline" onclick="editVideo(${video.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteVideo(${video.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al cargar videos', 'error');
    }
}

function showAddVideoModal() {
    currentEditVideoId = null;
    document.getElementById('video-modal-title').textContent = 'Agregar Video';
    document.getElementById('video-form').reset();
    document.getElementById('video-id').value = '';
    document.getElementById('video-modal').classList.add('active');
}

async function editVideo(id) {
    try {
        const response = await fetch('/api/admin/videos');
        const videos = await response.json();
        const video = videos.find(v => v.id === id);

        if (!video) return;

        currentEditVideoId = id;
        document.getElementById('video-modal-title').textContent = 'Editar Video';
        document.getElementById('video-id').value = video.id;
        document.getElementById('video-nombre').value = video.nombre;
        document.getElementById('video-descripcion').value = video.descripcion || '';
        document.getElementById('video-url').value = video.url_video;
        document.getElementById('video-pdf').value = video.url_pdf || '';
        document.getElementById('video-examen').value = video.url_examen || '';
        document.getElementById('video-orden').value = video.orden || 1;
        document.getElementById('video-modal').classList.add('active');
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al cargar video', 'error');
    }
}

async function saveVideo() {
    const id = document.getElementById('video-id').value;
    const nombre = document.getElementById('video-nombre').value.trim();
    const descripcion = document.getElementById('video-descripcion').value.trim();
    const url_video = document.getElementById('video-url').value.trim();
    const url_pdf = document.getElementById('video-pdf').value.trim();
    const url_examen = document.getElementById('video-examen').value.trim();
    const orden = parseInt(document.getElementById('video-orden').value) || 1;

    if (!nombre || !url_video) {
        showAlert('Por favor completa los campos requeridos', 'error');
        return;
    }

    const data = { nombre, descripcion, url_video, url_pdf, url_examen, orden };

    try {
        let response;
        if (id) {
            // Actualizar
            response = await fetch(`/api/admin/videos/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            // Crear
            response = await fetch('/api/admin/videos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }

        if (response.ok) {
            showAlert('Video guardado exitosamente', 'success');
            closeVideoModal();
            loadVideos();
        } else {
            const error = await response.json();
            showAlert(error.error || 'Error al guardar video', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

async function deleteVideo(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este video?')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/videos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('Video eliminado exitosamente', 'success');
            loadVideos();
        } else {
            showAlert('Error al eliminar video', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

function closeVideoModal() {
    document.getElementById('video-modal').classList.remove('active');
    document.getElementById('video-form').reset();
}

// ==================== EMPLEADOS ====================

async function loadEmployees() {
    try {
        const response = await fetch('/api/admin/users');
        const employees = await response.json();

        const tbody = document.getElementById('employees-table-body');

        if (employees.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">No hay empleados registrados</td></tr>';
            return;
        }

        tbody.innerHTML = employees.map(emp => `
            <tr>
                <td><strong>${emp.nombre}</strong></td>
                <td>${emp.puesto || '-'}</td>
                <td>${emp.usuario}</td>
                <td>${new Date(emp.fecha_creacion).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.id})">Eliminar</button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al cargar empleados', 'error');
    }
}

function showAddEmployeeModal() {
    document.getElementById('employee-form').reset();
    document.getElementById('employee-modal').classList.add('active');
}

async function saveEmployee() {
    const nombre = document.getElementById('emp-nombre').value.trim();
    const puesto = document.getElementById('emp-puesto').value.trim();
    const usuario = document.getElementById('emp-usuario').value.trim();
    const password = document.getElementById('emp-password').value.trim();

    if (!nombre || !puesto || !usuario || !password) {
        showAlert('Por favor completa todos los campos', 'error');
        return;
    }

    try {
        const response = await fetch('/api/admin/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, puesto, usuario, password })
        });

        if (response.ok) {
            showAlert('Empleado creado exitosamente', 'success');
            closeEmployeeModal();
            loadEmployees();
        } else {
            const error = await response.json();
            showAlert(error.error || 'Error al crear empleado', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

async function deleteEmployee(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showAlert('Empleado eliminado exitosamente', 'success');
            loadEmployees();
        } else {
            showAlert('Error al eliminar empleado', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

function closeEmployeeModal() {
    document.getElementById('employee-modal').classList.remove('active');
    document.getElementById('employee-form').reset();
}

// ==================== ESTADÍSTICAS ====================

async function loadStats() {
    try {
        const response = await fetch('/api/admin/stats');
        const stats = await response.json();

        const container = document.getElementById('stats-container');

        if (stats.length === 0) {
            container.innerHTML = '<p class="text-center">No hay datos de progreso</p>';
            return;
        }

        container.innerHTML = `
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Empleado</th>
                            <th>Puesto</th>
                            <th>Videos Completados</th>
                            <th>Examenes Completados</th>
                            <th>Progreso</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${stats.map(stat => {
                            const progress = stat.total_videos > 0
                                ? Math.round((stat.videos_completados / stat.total_videos) * 100)
                                : 0;
                            return `
                                <tr>
                                    <td><strong>${stat.nombre}</strong></td>
                                    <td>${stat.puesto || '-'}</td>
                                    <td>${stat.videos_completados} / ${stat.total_videos}</td>
                                    <td>${stat.examenes_completados} / ${stat.total_videos}</td>
                                    <td>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${progress}%"></div>
                                        </div>
                                        <small>${progress}%</small>
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al cargar estadísticas', 'error');
    }
}

// ==================== UTILIDADES ====================

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `
        <div class="alert alert-${type} fade-in">
            ${message}
        </div>
    `;

    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

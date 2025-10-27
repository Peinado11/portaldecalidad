let videos = [];
let currentVideo = null;

// Verificar sesión al cargar
document.addEventListener('DOMContentLoaded', async function() {
    await checkSession();
    await loadVideos();
    await loadStats();
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
        if (data.user.tipo === 'admin') {
            window.location.href = '/admin';
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

// ==================== CARGAR VIDEOS ====================

async function loadVideos() {
    try {
        const response = await fetch('/api/videos');
        videos = await response.json();

        const container = document.getElementById('videos-container');

        if (videos.length === 0) {
            container.innerHTML = '<p class="text-center">No hay videos disponibles en este momento</p>';
            return;
        }

        container.innerHTML = videos.map((video, index) => {
            const thumbnail = getYouTubeThumbnail(video.url_video);
            const isCompleted = video.completado === 1;
            const examCompleted = video.examen_completado === 1;

            return `
                <div class="video-card" onclick="openVideo(${video.id})">
                    <div class="video-thumbnail">
                        <img src="${thumbnail}" alt="${video.nombre}" onerror="this.style.display='none'">
                        <div class="play-icon">▶</div>
                    </div>
                    <div class="video-content">
                        <div class="video-title">${index + 1}. ${video.nombre}</div>
                        <div class="video-description">${video.descripcion || 'Sin descripción'}</div>
                        <div class="video-status">
                            ${isCompleted
                                ? '<span class="status-badge status-completed">✓ Completado</span>'
                                : '<span class="status-badge status-pending">Pendiente</span>'
                            }
                            ${examCompleted
                                ? '<span class="status-badge status-completed">✓ Examen</span>'
                                : ''
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error al cargar videos', 'error');
    }
}

// ==================== ESTADÍSTICAS ====================

async function loadStats() {
    try {
        const response = await fetch('/api/progress/stats');
        const stats = await response.json();

        document.getElementById('total-videos').textContent = stats.total_videos;
        document.getElementById('completed-videos').textContent = stats.videos_completados;
        document.getElementById('completed-exams').textContent = stats.examenes_completados;

        const progress = stats.total_videos > 0
            ? Math.round((stats.videos_completados / stats.total_videos) * 100)
            : 0;

        document.getElementById('general-progress').style.width = progress + '%';
        document.getElementById('progress-percentage').textContent = progress;
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==================== MODAL DE VIDEO ====================

function openVideo(videoId) {
    currentVideo = videos.find(v => v.id === videoId);
    if (!currentVideo) return;

    document.getElementById('modal-video-title').textContent = currentVideo.nombre;
    document.getElementById('modal-video-name').textContent = currentVideo.nombre;
    document.getElementById('modal-video-description').textContent = currentVideo.descripcion || 'Sin descripción';

    // Cargar video de YouTube
    const videoEmbed = getYouTubeEmbedUrl(currentVideo.url_video);
    document.getElementById('video-player').innerHTML = `
        <iframe
            src="${videoEmbed}?enablejsapi=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            id="youtube-iframe"
        ></iframe>
    `;

    // Cargar botones de acción
    const actionsHtml = [];

    // Botón de PDF
    if (currentVideo.url_pdf) {
        actionsHtml.push(`
            <a href="${currentVideo.url_pdf}" target="_blank" class="btn btn-outline">
                📄 Ver Documento PDF
            </a>
        `);
    }

    // Botón de marcar como completado
    if (currentVideo.completado !== 1) {
        actionsHtml.push(`
            <button class="btn btn-secondary" onclick="markAsCompleted()">
                ✓ Marcar como Completado
            </button>
        `);
    } else {
        actionsHtml.push(`
            <button class="btn btn-secondary" disabled>
                ✓ Video Completado
            </button>
        `);
    }

    // Botón de examen (solo si el video está completado)
    if (currentVideo.url_examen && currentVideo.completado === 1) {
        if (currentVideo.examen_completado !== 1) {
            actionsHtml.push(`
                <a href="${currentVideo.url_examen}" target="_blank" class="btn btn-primary" onclick="markExamAsCompleted()">
                    📝 Realizar Examen
                </a>
            `);
        } else {
            actionsHtml.push(`
                <button class="btn btn-primary" disabled>
                    ✓ Examen Completado
                </button>
            `);
        }
    }

    document.getElementById('video-actions').innerHTML = actionsHtml.join('');

    // Abrir modal
    document.getElementById('video-modal').classList.add('active');

    // Detectar cuando el video termina (aproximado)
    setupVideoEndDetection();
}

function closeVideoModal() {
    document.getElementById('video-modal').classList.remove('active');
    document.getElementById('video-player').innerHTML = '';
    currentVideo = null;
}

// ==================== MARCAR PROGRESO ====================

async function markAsCompleted() {
    if (!currentVideo) return;

    try {
        const response = await fetch(`/api/progress/video/${currentVideo.id}`, {
            method: 'POST'
        });

        if (response.ok) {
            showAlert('Video marcado como completado', 'success');
            await loadVideos();
            await loadStats();
            closeVideoModal();
            // Reabrir el modal para actualizar los botones
            setTimeout(() => openVideo(currentVideo.id), 300);
        } else {
            showAlert('Error al actualizar progreso', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión', 'error');
    }
}

async function markExamAsCompleted() {
    if (!currentVideo) return;

    try {
        const response = await fetch(`/api/progress/exam/${currentVideo.id}`, {
            method: 'POST'
        });

        if (response.ok) {
            showAlert('Examen marcado como completado', 'success');
            await loadVideos();
            await loadStats();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// ==================== UTILIDADES DE YOUTUBE ====================

function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

function getYouTubeThumbnail(url) {
    const videoId = getYouTubeVideoId(url);
    return videoId
        ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        : 'https://via.placeholder.com/480x360?text=Video';
}

function getYouTubeEmbedUrl(url) {
    const videoId = getYouTubeVideoId(url);
    return videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : url;
}

// Detectar cuando el video termina (aproximadamente)
function setupVideoEndDetection() {
    // Esta es una implementación básica
    // Para una detección más precisa, se podría usar la API de YouTube IFrame
    const iframe = document.getElementById('youtube-iframe');
    if (!iframe) return;

    // Escuchar eventos del iframe
    window.addEventListener('message', function(event) {
        if (event.origin !== 'https://www.youtube.com') return;

        try {
            const data = JSON.parse(event.data);
            // Cuando el video termina, mostrar sugerencia de marcar como completado
            if (data.event === 'onStateChange' && data.info === 0) {
                if (currentVideo && currentVideo.completado !== 1) {
                    showAlert('Has terminado el video. No olvides marcarlo como completado.', 'info');
                }
            }
        } catch (e) {
            // Ignorar errores de parsing
        }
    });
}

// ==================== ALERTAS ====================

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

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const modal = document.getElementById('video-modal');
    if (event.target === modal) {
        closeVideoModal();
    }
});

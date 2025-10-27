document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const loginBtn = document.getElementById('login-btn');
    const loginText = document.getElementById('login-text');
    const loginLoading = document.getElementById('login-loading');
    const alertContainer = document.getElementById('alert-container');

    // Verificar si ya hay una sesión activa
    checkSession();

    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value.trim();
        const password = document.getElementById('password').value;

        if (!usuario || !password) {
            showAlert('Por favor completa todos los campos', 'error');
            return;
        }

        // Mostrar loading
        loginBtn.disabled = true;
        loginText.classList.add('hidden');
        loginLoading.classList.remove('hidden');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ usuario, password })
            });

            const data = await response.json();

            if (response.ok) {
                showAlert('Inicio de sesión exitoso', 'success');

                // Redirigir según el tipo de usuario
                setTimeout(() => {
                    if (data.user.tipo === 'admin') {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/employee';
                    }
                }, 500);
            } else {
                showAlert(data.error || 'Error al iniciar sesión', 'error');
                loginBtn.disabled = false;
                loginText.classList.remove('hidden');
                loginLoading.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error:', error);
            showAlert('Error de conexión. Por favor intenta de nuevo.', 'error');
            loginBtn.disabled = false;
            loginText.classList.remove('hidden');
            loginLoading.classList.add('hidden');
        }
    });

    async function checkSession() {
        try {
            const response = await fetch('/api/session');
            if (response.ok) {
                const data = await response.json();
                if (data.user) {
                    // Ya hay sesión activa, redirigir
                    if (data.user.tipo === 'admin') {
                        window.location.href = '/admin';
                    } else {
                        window.location.href = '/employee';
                    }
                }
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    }

    function showAlert(message, type) {
        alertContainer.innerHTML = `
            <div class="alert alert-${type} fade-in">
                ${message}
            </div>
        `;

        setTimeout(() => {
            alertContainer.innerHTML = '';
        }, 5000);
    }
});

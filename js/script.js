// Variables globales
let modelViewer;
let currentModel = './assets/models/genshin_impact_-_furina.glb';
let isAnimating = true;

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    registerServiceWorker();
});

// Función principal de inicialización
function initializeApp() {
    modelViewer = document.getElementById('model-viewer');
    
    if (!modelViewer) {
        console.error('Model viewer no encontrado');
        return;
    }

    // Configurar event listeners
    setupEventListeners();
    
    // Configurar controles
    setupControls();
    
    // Mostrar información de carga inicial
    showLoadingMessage();
}

// Configurar todos los event listeners
function setupEventListeners() {
    // Progress bar
    modelViewer.addEventListener('progress', onProgress);
    
    // Model loading events
    modelViewer.addEventListener('load', onModelLoad);
    modelViewer.addEventListener('error', onModelError);
    
    // AR events
    modelViewer.addEventListener('ar-status', onARStatusChange);
    
    // Model selector
    const modelSelect = document.getElementById('model-select');
    if (modelSelect) {
        modelSelect.addEventListener('change', onModelChange);
    }
    
    // Control buttons
    const resetCameraBtn = document.getElementById('reset-camera');
    const toggleAnimationBtn = document.getElementById('toggle-animation');
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const retryBtn = document.getElementById('retry-btn');
    
    if (resetCameraBtn) {
        resetCameraBtn.addEventListener('click', resetCamera);
    }
    
    if (toggleAnimationBtn) {
        toggleAnimationBtn.addEventListener('click', toggleAnimation);
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }
    
    if (retryBtn) {
        retryBtn.addEventListener('click', retryLoad);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// Configurar controles adicionales
function setupControls() {
    // Configurar tooltips para los botones
    const buttons = document.querySelectorAll('.control-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', showTooltip);
        button.addEventListener('mouseleave', hideTooltip);
    });
}

// Event handlers
function onProgress(event) {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
    const loadingMessage = event.target.querySelector('.loading-message');
    
    if (updatingBar) {
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
    }
    
  if (event.detail.totalProgress === 1) {
        if (progressBar) progressBar.classList.add('hide');
        if (loadingMessage) loadingMessage.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
        if (progressBar) progressBar.classList.remove('hide');
        if (loadingMessage) loadingMessage.classList.remove('hide');
    }
}

function onModelLoad(event) {
    console.log('Modelo cargado exitosamente');
    hideLoadingMessage();
    hideErrorMessage();
    
    // Mostrar notificación de éxito
    showNotification('Modelo cargado correctamente', 'success');
    
    // Configurar animaciones si están disponibles
    setupAnimations();
}

function onModelError(event) {
    console.error('Error al cargar el modelo:', event.detail);
    hideLoadingMessage();
    showErrorMessage();
    
    showNotification('Error al cargar el modelo', 'error');
}

function onARStatusChange(event) {
    const status = event.detail.status;
    console.log('AR Status:', status);
    
    switch (status) {
        case 'session-started':
            showNotification('Sesión AR iniciada', 'info');
            break;
        case 'session-ended':
            showNotification('Sesión AR finalizada', 'info');
            break;
        case 'failed':
            showNotification('Error en AR', 'error');
            break;
    }
}

function onModelChange(event) {
    const newModel = event.target.value;
    if (newModel !== currentModel) {
        currentModel = newModel;
        loadModel(newModel);
    }
}

// Funciones de control
function resetCamera() {
    if (modelViewer) {
        modelViewer.cameraOrbit = '0deg 75deg 105%';
        modelViewer.cameraTarget = '0m 0m 0m';
        showNotification('Cámara reseteada', 'info');
    }
}

function toggleAnimation() {
    if (modelViewer) {
        if (isAnimating) {
            modelViewer.pause();
            isAnimating = false;
            showNotification('Animación pausada', 'info');
        } else {
            modelViewer.play();
            isAnimating = true;
            showNotification('Animación reanudada', 'info');
        }
    }
}

function toggleFullscreen() {
    if (modelViewer) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            modelViewer.requestFullscreen();
        }
    }
}

function retryLoad() {
    hideErrorMessage();
    loadModel(currentModel);
}

// Funciones de carga
function loadModel(modelPath) {
    showLoadingMessage();
    hideErrorMessage();
    
    if (modelViewer) {
        modelViewer.src = modelPath;
    }
}

// Funciones de UI
function showLoadingMessage() {
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.classList.remove('hide');
    }
}

function hideLoadingMessage() {
    const loadingMessage = document.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.classList.add('hide');
    }
}

function showErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.classList.remove('hide');
    }
}

function hideErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.classList.add('hide');
    }
}

// Configurar animaciones
function setupAnimations() {
    if (modelViewer && modelViewer.availableAnimations) {
        const animations = modelViewer.availableAnimations;
        console.log('Animaciones disponibles:', animations);
        
        if (animations.length > 0) {
            // Intentar reproducir la primera animación
            modelViewer.play({ animationName: animations[0] });
        }
    }
}

// Manejo de atajos de teclado
function handleKeyboardShortcuts(event) {
    switch (event.key.toLowerCase()) {
        case 'r':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                resetCamera();
            }
            break;
        case ' ':
            event.preventDefault();
            toggleAnimation();
            break;
        case 'f':
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();
                toggleFullscreen();
            }
            break;
    }
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Configurar cierre automático
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
    
    // Botón de cierre
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    });
}

// Tooltips
function showTooltip(event) {
    const button = event.target;
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = button.getAttribute('title') || button.textContent;
    tooltip.style.cssText = `
        position: absolute;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        pointer-events: none;
        white-space: nowrap;
    `;
    
    document.body.appendChild(tooltip);
    
    const rect = button.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
    
    button.tooltip = tooltip;
}

function hideTooltip(event) {
    const button = event.target;
    if (button.tooltip && button.tooltip.parentNode) {
        button.tooltip.parentNode.removeChild(button.tooltip);
        button.tooltip = null;
    }
}

// Agregar estilos CSS para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Detectar capacidades del dispositivo
function checkDeviceCapabilities() {
    const capabilities = {
        webXR: 'xr' in navigator,
        webGL: !!window.WebGLRenderingContext,
        touch: 'ontouchstart' in window,
        mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    };
    
    console.log('Capacidades del dispositivo:', capabilities);
    return capabilities;
}

// Registrar Service Worker
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Usar ruta relativa para que funcione en GitHub Pages
            const swPath = './sw.js';
            navigator.serviceWorker.register(swPath)
                .then(registration => {
                    console.log('Service Worker registrado exitosamente:', registration.scope);
                    
                    // Verificar actualizaciones
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                showNotification('Nueva versión disponible. Recarga la página para actualizar.', 'info');
                            }
                        });
                    });
                })
                .catch(error => {
                    console.error('Error al registrar Service Worker:', error);
                });
        });
    }
}

// Inicializar verificación de capacidades
checkDeviceCapabilities();
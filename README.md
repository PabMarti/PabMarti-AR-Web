# AR Web - Visualizador 3D en Realidad Aumentada

![AR Web](assets/images/ar_icon.png)

Una aplicación web moderna para visualizar modelos 3D en realidad aumentada, con soporte para modelos de Genshin Impact y otros personajes 3D.

## 🌐 **Ver Proyecto en Vivo**

**[https://pabmarti.github.io/AR-Web](https://pabmarti.github.io/AR-Web)**

*¡Explora los modelos 3D en realidad aumentada directamente en tu navegador!*

### 🚀 Quick Start
1. **Abre el proyecto**: [https://pabmarti.github.io/AR-Web](https://pabmarti.github.io/AR-Web)
2. **Selecciona un modelo** del dropdown
3. **Interactúa** con el modelo 3D usando tu ratón/touch
4. **Prueba AR** en tu dispositivo móvil con el botón "Ver en tu espacio"

## 🌟 Características

### ✨ Funcionalidades Principales
- **Visualización 3D Interactiva**: Modelos 3D de alta calidad con controles de cámara intuitivos
- **Realidad Aumentada**: Soporte completo para AR en dispositivos móviles
- **Selector de Modelos**: Cambio dinámico entre diferentes modelos 3D
- **Controles Avanzados**: Reset de cámara, control de animaciones, pantalla completa
- **Interfaz Moderna**: Diseño responsivo con gradientes y efectos visuales

### 🎮 Controles
- **Ratón/Touch**: Arrastra para rotar, pellizca para zoom
- **Botones**: Resetear cámara, pausar/reproducir animación, pantalla completa
- **Atajos de Teclado**:
  - `Ctrl/Cmd + R`: Resetear cámara
  - `Espacio`: Pausar/reproducir animación
  - `Ctrl/Cmd + F`: Pantalla completa

### 📱 Compatibilidad AR
- **WebXR**: Soporte nativo para dispositivos compatibles
- **Scene Viewer**: Integración con Google Scene Viewer
- **Quick Look**: Soporte para iOS AR Quick Look

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno con soporte WebGL
- Para AR: Dispositivo móvil con capacidades AR (Android 8.0+, iOS 12+)
- Servidor web local o remoto (HTTPS requerido para AR)

### Instalación Local
1. Clona o descarga el proyecto
2. Abre una terminal en el directorio del proyecto
3. Inicia un servidor web local:

```bash
# Con Python 3
python -m http.server 8000

# Con Node.js (si tienes http-server instalado)
npx http-server

# Con PHP
php -S localhost:8000
```

4. Abre tu navegador en `http://localhost:8000`

### Uso en Producción
Para usar las funcionalidades AR, el sitio debe estar servido sobre HTTPS:
- GitHub Pages
- Netlify
- Vercel
- Cualquier hosting con SSL

### 🌐 Acceso al Proyecto
- **URL Principal**: [https://pabmarti.github.io/AR-Web](https://pabmarti.github.io/AR-Web)
- **Repositorio**: [GitHub Repository](https://github.com/pabmarti/AR-Web)
- **Estado**: ✅ En línea y funcionando

## 📁 Estructura del Proyecto

```
AR-Web/
├── assets/
│   ├── images/
│   │   ├── ar_icon.png          # Icono de la aplicación
│   │   ├── ar_hand_prompt.png   # Imagen de instrucciones AR
│   │   └── favicon.ico          # Favicon del sitio
│   └── models/
│       ├── genshin_impact_-_furina.glb
│       └── RobotExpressive.glb
├── css/
│   └── styles.css               # Estilos CSS modernos
├── js/
│   └── script.js                # Funcionalidad JavaScript
├── docs/
│   ├── deploy.md                # Documentación de despliegue
│   └── snippet.txt              # Fragmentos de código útiles
├── index.html                   # Página principal
├── manifest.json                # Manifesto PWA
├── sw.js                        # Service Worker
├── 404.html                     # Página de error personalizada
├── _headers                     # Headers HTTP personalizados
├── .nojekyll                    # Configuración para GitHub Pages
├── .gitignore                   # Archivos a ignorar en Git
├── package.json                 # Configuración del proyecto
└── README.md                    # Documentación principal
```

## 🎨 Personalización

### Agregar Nuevos Modelos
1. Coloca tu archivo `.glb` en el directorio `assets/models/`
2. Agrega una nueva opción en el selector de modelos en `index.html`:

```html
<option value="./assets/models/tu_modelo.glb">Nombre del Modelo</option>
```

### Personalizar Estilos
Los estilos están organizados en secciones en `css/styles.css`:
- **Header**: Encabezado de la aplicación
- **Model Selector**: Selector de modelos
- **Controls Panel**: Panel de controles
- **AR Container**: Contenedor del visor 3D
- **Info Panel**: Panel de información
- **Responsive Design**: Diseño responsivo

### Configurar Animaciones
Si tu modelo tiene animaciones, puedes configurarlas en `js/script.js`:

```javascript
function setupAnimations() {
    if (modelViewer && modelViewer.availableAnimations) {
        const animations = modelViewer.availableAnimations;
        // Reproducir animación específica
        modelViewer.play({ animationName: 'Idle' });
    }
}
```

## 🔧 Configuración Avanzada

### Parámetros del Model Viewer
Puedes ajustar los parámetros del `model-viewer` en `index.html`:

```html
<model-viewer 
    camera-orbit="0deg 75deg 105%"
    min-camera-orbit="auto auto 50%"
    max-camera-orbit="auto auto 150%"
    field-of-view="30deg"
    exposure="1"
    environment-image="neutral"
    ar-scale="auto"
    ar-placement="floor">
```

### Configuración AR
- `ar-scale="auto"`: Escala automática del modelo
- `ar-placement="floor"`: Colocación en el suelo
- `ar-modes="webxr scene-viewer quick-look"`: Modos AR soportados

## 🌐 Compatibilidad de Navegadores

### Soporte Completo
- Chrome 79+
- Firefox 72+
- Safari 13.1+
- Edge 79+

### Funcionalidades AR
- **Android**: Chrome, Firefox, Samsung Internet
- **iOS**: Safari (AR Quick Look)
- **WebXR**: Chrome, Firefox, Edge

## 🐛 Solución de Problemas

### El modelo no se carga
1. Verifica que el archivo `.glb` existe en el directorio `model/`
2. Revisa la consola del navegador para errores
3. Asegúrate de que el servidor web esté funcionando

### AR no funciona
1. Verifica que estés usando HTTPS
2. Confirma que tu dispositivo soporte AR
3. Asegúrate de que el navegador tenga permisos de cámara

### Rendimiento lento
1. Optimiza el tamaño de los archivos `.glb`
2. Reduce la complejidad de las texturas
3. Usa modelos con menos polígonos para dispositivos móviles

## 📊 Optimización

### Modelos 3D
- **Tamaño recomendado**: < 10MB
- **Formatos soportados**: GLB, GLTF
- **Optimización**: Usa herramientas como gltf-pipeline

### Texturas
- **Resolución**: 1024x1024 máximo para móviles
- **Formato**: JPEG para fotos, PNG para transparencias
- **Compresión**: Usa compresión de texturas

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Model-viewer**: Google por la librería de visualización 3D
- **Genshin Impact**: miHoYo por los modelos de personajes
- **Comunidad AR**: Por el soporte y feedback continuo

## 📞 Contacto

Para preguntas o soporte:
- Abre un issue en GitHub
- Contacta a través de las redes sociales del proyecto

---

**¡Disfruta explorando el mundo de la realidad aumentada! 🚀**
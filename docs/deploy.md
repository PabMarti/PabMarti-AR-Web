# Guía de Despliegue - AR Web

Esta guía te ayudará a desplegar tu aplicación AR Web en diferentes plataformas.

## 🌐 Plataformas de Despliegue

### 1. GitHub Pages (Recomendado)

**Ventajas:**
- Gratuito
- HTTPS automático
- Fácil integración con Git
- Soporte completo para AR

**Pasos:**
1. Crea un repositorio en GitHub
2. Sube tu código al repositorio
3. Ve a Settings > Pages
4. Selecciona la rama `main` como fuente
5. Tu sitio estará disponible en `https://tuusuario.github.io/turepositorio`

### 2. Netlify

**Ventajas:**
- Despliegue automático
- HTTPS automático
- Funciones serverless
- Formularios integrados

**Pasos:**
1. Conecta tu repositorio de GitHub
2. Configura el directorio de build (deja vacío para sitios estáticos)
3. Configura el comando de build (no necesario)
4. Tu sitio se desplegará automáticamente

### 3. Vercel

**Ventajas:**
- Despliegue instantáneo
- HTTPS automático
- Edge functions
- Analytics integrados

**Pasos:**
1. Conecta tu repositorio de GitHub
2. Vercel detectará automáticamente que es un sitio estático
3. Tu sitio se desplegará en segundos

### 4. Firebase Hosting

**Ventajas:**
- Integración con otros servicios de Firebase
- CDN global
- HTTPS automático
- Analytics integrados

**Pasos:**
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa el proyecto: `firebase init hosting`
4. Despliega: `firebase deploy`

## 🔧 Configuración para Producción

### 1. Optimización de Modelos 3D

Antes de desplegar, optimiza tus modelos:

```bash
# Usando gltf-pipeline
npm install -g gltf-pipeline

# Optimizar modelo
gltf-pipeline -i model.glb -o model_optimized.glb -d
```

### 2. Compresión de Imágenes

Optimiza las imágenes PNG/JPG:

```bash
# Usando ImageOptim (macOS)
# Descarga e instala ImageOptim

# Usando TinyPNG (online)
# Sube tus imágenes a tinypng.com
```

### 3. Minificación de CSS/JS

Para producción, considera minificar tus archivos:

```bash
# Usando npm
npm install -g minify

# Minificar CSS
minify styles.css > styles.min.css

# Minificar JS
minify script.js > script.min.js
```

## 📱 Configuración PWA

### 1. Verificar Manifest

Asegúrate de que tu `manifest.json` esté correctamente configurado:

```json
{
  "name": "AR Web",
  "short_name": "AR Web",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#764ba2"
}
```

### 2. Service Worker

Verifica que tu service worker esté funcionando:

```javascript
// En la consola del navegador
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Service Workers registrados:', registrations);
});
```

### 3. Lighthouse Audit

Ejecuta un audit de Lighthouse para verificar tu PWA:

1. Abre Chrome DevTools
2. Ve a la pestaña Lighthouse
3. Selecciona "Progressive Web App"
4. Ejecuta el audit

## 🔒 Configuración de Seguridad

### 1. Headers de Seguridad

Agrega headers de seguridad en tu servidor:

```apache
# .htaccess para Apache
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

```nginx
# nginx.conf
add_header X-Content-Type-Options nosniff;
add_header X-Frame-Options DENY;
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### 2. CSP (Content Security Policy)

Agrega una política de seguridad de contenido:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://ajax.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self';">
```

## 📊 Monitoreo y Analytics

### 1. Google Analytics

Agrega Google Analytics para monitorear el uso:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 2. Error Tracking

Implementa tracking de errores:

```javascript
// En script.js
window.addEventListener('error', function(event) {
  // Enviar error a tu servicio de tracking
  console.error('Error capturado:', event.error);
});
```

## 🚀 Comandos de Despliegue Rápido

### GitHub Pages
```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

### Netlify CLI
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

### Vercel CLI
```bash
npm install -g vercel
vercel --prod
```

### Firebase
```bash
firebase deploy --only hosting
```

## 🔍 Verificación Post-Despliegue

1. **Funcionalidad AR**: Prueba en un dispositivo móvil
2. **PWA**: Verifica que se pueda instalar
3. **Performance**: Ejecuta Lighthouse audit
4. **Responsive**: Prueba en diferentes tamaños de pantalla
5. **Offline**: Verifica que funcione sin conexión

## 📞 Soporte

Si tienes problemas con el despliegue:

1. Revisa los logs del servidor
2. Verifica la consola del navegador
3. Ejecuta un audit de Lighthouse
4. Consulta la documentación de la plataforma

---

**¡Tu aplicación AR Web está lista para el mundo! 🌍**

# Estructura del Proyecto AR Web

## 📁 Organización de Archivos

El proyecto AR Web ha sido reorganizado para seguir las mejores prácticas de desarrollo web moderno. Aquí se explica la estructura de carpetas y archivos:

### 🗂️ Estructura Principal

```
AR-Web/
├── 📁 assets/           # Recursos estáticos
│   ├── 📁 images/       # Imágenes e iconos
│   └── 📁 models/       # Modelos 3D (.glb)
├── 📁 css/              # Hojas de estilo
├── 📁 js/               # Scripts JavaScript
├── 📁 docs/             # Documentación
└── 📄 Archivos raíz     # Archivos principales
```

### 📁 assets/
Contiene todos los recursos estáticos del proyecto:

#### 📁 assets/images/
- `ar_icon.png` - Icono principal de la aplicación
- `ar_hand_prompt.png` - Imagen de instrucciones para AR
- `favicon.ico` - Favicon del sitio web

#### 📁 assets/models/
- `genshin_impact_-_furina.glb` - Modelo 3D de Furina
- `RobotExpressive.glb` - Modelo 3D del Robot

### 📁 css/
- `styles.css` - Todos los estilos CSS de la aplicación

### 📁 js/
- `script.js` - Toda la lógica JavaScript de la aplicación

### 📁 docs/
- `deploy.md` - Instrucciones de despliegue
- `snippet.txt` - Fragmentos de código útiles
- `ESTRUCTURA.md` - Este archivo

### 📄 Archivos Raíz

#### Archivos Principales
- `index.html` - Página principal de la aplicación
- `manifest.json` - Configuración PWA
- `sw.js` - Service Worker para funcionalidad offline

#### Archivos de Configuración
- `package.json` - Configuración del proyecto Node.js
- `.gitignore` - Archivos a ignorar en Git
- `.nojekyll` - Configuración para GitHub Pages
- `_headers` - Headers HTTP personalizados

#### Archivos de Error
- `404.html` - Página de error personalizada

## 🔄 Cambios Realizados

### Antes
```
AR-Web/
├── index.html
├── styles.css
├── script.js
├── ar_icon.png
├── ar_hand_prompt.png
├── favicon.ico
└── model/
    ├── genshin_impact_-_furina.glb
    └── RobotExpressive.glb
```

### Después
```
AR-Web/
├── assets/
│   ├── images/
│   │   ├── ar_icon.png
│   │   ├── ar_hand_prompt.png
│   │   └── favicon.ico
│   └── models/
│       ├── genshin_impact_-_furina.glb
│       └── RobotExpressive.glb
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── docs/
│   ├── deploy.md
│   ├── snippet.txt
│   └── ESTRUCTURA.md
└── [archivos raíz...]
```

## 🎯 Beneficios de la Nueva Estructura

### ✅ Organización Clara
- Separación lógica de tipos de archivos
- Fácil navegación y mantenimiento
- Estructura escalable para proyectos grandes

### ✅ Mejores Prácticas
- Sigue estándares de la industria
- Facilita el trabajo en equipo
- Mejora la legibilidad del código

### ✅ Mantenimiento Simplificado
- Archivos relacionados agrupados
- Fácil localización de recursos
- Estructura consistente

## 📝 Notas Importantes

### Rutas Actualizadas
Todas las referencias en el código han sido actualizadas para usar las nuevas rutas:

- **CSS**: `./css/styles.css`
- **JavaScript**: `./js/script.js`
- **Imágenes**: `./assets/images/`
- **Modelos**: `./assets/models/`

### Compatibilidad
La nueva estructura mantiene toda la funcionalidad original:
- ✅ Service Worker funciona correctamente
- ✅ PWA se instala sin problemas
- ✅ AR funciona en dispositivos móviles
- ✅ Todas las rutas están actualizadas

## 🚀 Próximos Pasos

1. **Commit y Push**: Subir los cambios al repositorio
2. **Verificar**: Comprobar que todo funciona en GitHub Pages
3. **Documentar**: Actualizar cualquier documentación adicional
4. **Mantener**: Seguir esta estructura para futuras actualizaciones

# 🪐 Oscar Darío Madera — Engineering Portfolio

> Portafolio web interactivo de alta artesanía construido con **React 19**, **TypeScript**, **Vite**, **Tailwind CSS**, **Motion.dev** y **Web Audio API**.

---

## 📌 Por qué existe este proyecto

Este portafolio fue diseñado para presentar de manera interactiva y técnicamente rigurosa mis proyectos y arquitecturas de ingeniería de software (**Branchbase**, **EduRag**, **ThesisForge**, **AudioBard**, **Darius-AI**, **Loop Computer Vision**), combinando:
1. **Estética Liquid Glass & Bento Grid**: Fondos animados en Canvas HTML5 a 60 FPS con gradientes orgánicos cian/violeta y superficies de vidrio con `backdrop-blur`.
2. **Terminal Interactiva (Playground CLI)**: Un emulador de terminal en vivo para que reclutadores e ingenieros puedan simular comandos reales (`run branchbase`, `run edurag`, `skills`, `contact`).
3. **Física de Interacción Real**: Animaciones con resortes calibrados en Motion.dev, perspectiva 3D al pasar el cursor y efectos de sonido sintéticos sintetizados con la Web Audio API (0 assets de audio pesados).

---

## 🛠️ Stack Tecnológico

- **Framework**: React 19 + TypeScript 5.7+
- **Bundler**: Vite 6 (build estático ultra-rápido listo para GitHub Pages)
- **Estilos**: Tailwind CSS con paleta Obsidian y tokens de diseño personalizados
- **Animaciones**: `motion` (Motion.dev / Framer Motion) + HTML5 Canvas Shader
- **Audio Sintético**: Web Audio API nativa con control de silencio
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) para despliegue automatizado en GitHub Pages

---

## 🚀 Instalación y Desarrollo Local

```bash
# 1. Clonar el repositorio
git clone https://github.com/oscarbol09/Portafolio.git
cd "Portafolio Mio"

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Compilar para producción (genera dist/ con rutas relativas)
npm run build
```

---

## ⚠️ Limitaciones Conocidas & Trade-offs

- **Compatibilidad de Audio**: Los navegadores modernos bloquean la reproducción de audio hasta que el usuario realiza la primera interacción con la página. El motor inicializa el `AudioContext` de forma perezosa en el primer clic.
- **Rendimiento de Shaders en Dispositivos Antiguos**: El fondo del Canvas utiliza `requestAnimationFrame` con paso de tiempo adaptable; en dispositivos con bajo GPU se reduce automáticamente la resolución mediante escalado del viewport.

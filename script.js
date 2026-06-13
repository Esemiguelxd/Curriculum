/* =============================================
   script.js — Funcionalidades del CV
   ============================================= */

/**
 * Espera a que el DOM esté completamente cargado
 * antes de inicializar las funcionalidades.
 */
document.addEventListener('DOMContentLoaded', function () {
    initProgressBars();
    initScrollAnimations();
});

/* =============================================
   BARRAS DE PROGRESO (Idiomas)
   Anima las barras de progreso cuando se hacen
   visibles en el viewport.
   ============================================= */
function initProgressBars() {
    /* Selecciona todas las barras con data-progress */
    var bars = document.querySelectorAll('.progress-bar');

    if (bars.length === 0) return;

    /* Configuración del Intersection Observer */
    var observerOptions = {
        root: null,          /* viewport */
        threshold: 0.3       /* 30% visible para activar */
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var bar = entry.target;
                var progress = bar.getAttribute('data-progress');
                /* Pequeño retraso para que la animación sea perceptible */
                setTimeout(function () {
                    bar.style.width = progress + '%';
                }, 200);
                /* Solo anima una vez */
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    /* Observa cada barra */
    bars.forEach(function (bar) {
        observer.observe(bar);
    });
}

/* =============================================
   ANIMACIONES DE ENTRADA (Scroll)
   Añade la clase 'visible' a los elementos
   cuando entran en el viewport.
   ============================================= */
function initScrollAnimations() {
    /* Selecciona las secciones que se van a animar */
    var sections = document.querySelectorAll(
        '.sidebar-section, .content-section, .cv-header'
    );

    if (sections.length === 0) return;

    /* Agrega la clase base de animación */
    sections.forEach(function (section) {
        section.classList.add('animate-in');
    });

    /* Configuración del Observer */
    var observerOptions = {
        root: null,
        threshold: 0.1,        /* 10% visible */
        rootMargin: '0px 0px -40px 0px'
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    /* Observa cada sección */
    sections.forEach(function (section) {
        observer.observe(section);
    });
}

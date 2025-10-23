// ===== EFECTO MATRIX RAIN CON CANVAS =====
function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    // Configurar canvas para cubrir toda la pantalla
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Caracteres binarios
    const chars = '01';
    const charSize = 14;
    const columns = canvas.width / charSize;
    const drops = [];

    // Inicializar gotas
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * canvas.height;
    }

    function draw() {
        // Fondo semitransparente para efecto de rastro
        ctx.fillStyle = 'rgba(26, 26, 26, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Color y fuente para los caracteres
        ctx.fillStyle = '#00ff00';
        ctx.font = charSize + 'px monospace';

        // Dibujar caracteres
        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            const x = i * charSize;
            const y = drops[i] * charSize;

            // Dibujar caracter
            ctx.fillText(char, x, y);

            // Reiniciar gota cuando llega al fondo
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Mover gota
            drops[i]++;
        }
    }

    // Animar
    setInterval(draw, 33);

    // Redimensionar canvas cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== MOBILE MENU TOGGLE MEJORADO =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

function closeMobileMenu() {
    if (hamburger) hamburger.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    body.style.overflow = '';
}

function toggleMobileMenu() {
    if (!hamburger || !navMenu) return;
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevenir scroll cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

if (hamburger) {
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize (para evitar problemas visuales)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// ===== INICIALIZAR TODO AL CARGAR =====
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar efecto Matrix
    initMatrixRain();
    
    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Animate portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Animate process steps
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(step);
    });

    // ===== NUEVAS ANIMACIONES PARA SECCIÓN PERSONALIZADA =====
    
    // Animate project showcases
    const projectShowcases = document.querySelectorAll('.project-showcase');
    projectShowcases.forEach((showcase, index) => {
        showcase.style.opacity = '0';
        showcase.style.transform = 'translateY(30px)';
        showcase.style.transition = `opacity 0.6s ease ${index * 0.3}s, transform 0.6s ease ${index * 0.3}s`;
        observer.observe(showcase);
    });

    // Animate personalized CTA
    const personalizedCta = document.querySelector('.personalized-cta');
    if (personalizedCta) {
        personalizedCta.style.opacity = '0';
        personalizedCta.style.transform = 'translateY(30px)';
        personalizedCta.style.transition = 'opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s';
        observer.observe(personalizedCta);
    }

    // Animate tech-commercial grids
    const techCommercialGrids = document.querySelectorAll('.tech-commercial-grid');
    techCommercialGrids.forEach((grid, index) => {
        grid.style.opacity = '0';
        grid.style.transform = 'translateX(-20px)';
        grid.style.transition = `opacity 0.6s ease ${index * 0.4}s, transform 0.6s ease ${index * 0.4}s`;
        observer.observe(grid);
    });

    // Animate visual cards
    const visualCards = document.querySelectorAll('.visual-card');
    visualCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.4}s, transform 0.6s ease ${index * 0.4}s`;
        observer.observe(card);
    });
});

// ===== FORM SUBMISSION MEJORADO =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validación básica
        const nombreEmpresa = this.querySelector('input[name="nombre_empresa"]').value;
        const email = this.querySelector('input[name="email"]').value;
        const mensaje = this.querySelector('textarea[name="mensaje"]').value;
        
        if (!nombreEmpresa || !email || !mensaje) {
            alert('Por favor, complete todos los campos obligatorios.');
            return;
        }
        
        // Cambiar estado del botón
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(this);
            
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                const result = await response.text();
                if (result === 'success') {
                    alert('✅ ¡Gracias por su consulta! Hemos recibido su mensaje y le contactaremos pronto.');
                    this.reset();
                } else {
                    alert('❌ Error al enviar el mensaje. Por favor, intente nuevamente.');
                }
            } else {
                alert('❌ Error de conexión. Por favor, intente nuevamente.');
            }
        } catch (error) {
            alert('❌ Error de red. Por favor, verifique su conexión e intente nuevamente.');
        } finally {
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== HOVER EFFECTS =====
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

document.querySelectorAll('.portfolio-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

document.querySelectorAll('.process-step').forEach(step => {
    step.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    step.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===== NUEVOS HOVER EFFECTS PARA SECCIÓN PERSONALIZADA =====
document.querySelectorAll('.project-showcase').forEach(showcase => {
    showcase.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    showcase.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

document.querySelectorAll('.tech-side, .commercial-side').forEach(side => {
    side.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.08)';
        this.style.transform = 'translateX(5px)';
    });
    
    side.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(255, 255, 255, 0.03)';
        this.style.transform = 'translateX(0)';
    });
});

document.querySelectorAll('.visual-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== SCROLL PROGRESS INDICATOR =====
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (scrollTop / scrollHeight) * 100;
    
    // Puedes usar este progreso para efectos futuros
    console.log('Scroll progress:', scrollProgress + '%');
});

// ===== LAZY LOADING PARA IMÁGENES =====
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

// Observar imágenes lazy (si las agregas en el futuro)
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});
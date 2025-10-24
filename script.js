// ===== SCROLL SUAVE Y NAVEGACIÓN =====
document.addEventListener("DOMContentLoaded", function () {
  // Scroll suave para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // ===== ANIMACIÓN DE TARJETAS AL SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar todas las tarjetas de servicios y portfolio
  document
    .querySelectorAll(".service-card, .portfolio-card")
    .forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(card);
    });

  // ===== FORM SUBMISSION MEJORADO - 100% SIMULADO =====
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Validación básica
      const nombreEmpresa = this.querySelector(
        'input[name="nombre_empresa"]'
      )?.value;
      const email = this.querySelector('input[name="email"]')?.value;
      const mensaje = this.querySelector('textarea[name="mensaje"]')?.value;

      // Validar campos obligatorios
      if (!nombreEmpresa || !email || !mensaje) {
        alert("Por favor, complete todos los campos obligatorios.");
        return;
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, ingrese un email válido.");
        return;
      }

      // Mostrar estado de envío
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      // SIMULAR ENVÍO EXITOSO (para GitHub Pages)
      setTimeout(() => {
        alert(
          "✅ Mensaje enviado correctamente. Nos pondremos en contacto a la brevedad."
        );
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // ===== CONTADOR ESTADÍSTICAS ANIMADO =====
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + "+";
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + "+";
      }
    }, 16);
  }

  // Animar contadores cuando son visibles
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute("data-target"));
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".counter").forEach((counter) => {
    counterObserver.observe(counter);
  });

  // ===== BOTÓN "VOLVER ARRIBA" =====
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = "↑";
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 1000;
    `;
  document.body.appendChild(scrollToTopBtn);

  // Mostrar/ocultar botón
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
    } else {
      scrollToTopBtn.style.opacity = "0";
    }
  });

  // Funcionalidad del botón
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ===== MENÚ MÓVIL RESPONSIVE =====
  const mobileMenuBtn = document.createElement("button");
  mobileMenuBtn.innerHTML = "☰";
  mobileMenuBtn.className = "mobile-menu-btn";
  mobileMenuBtn.style.cssText = `
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        z-index: 1001;
        font-size: 18px;
    `;
  document.body.appendChild(mobileMenuBtn);

  // Toggle menu móvil
  mobileMenuBtn.addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  });

  // Responsive - mostrar botón menú en móviles
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      mobileMenuBtn.style.display = "block";
      document.querySelector("nav").style.display = "none";
    } else {
      mobileMenuBtn.style.display = "none";
      document.querySelector("nav").style.display = "flex";
    }
  }

  window.addEventListener("resize", checkScreenSize);
  checkScreenSize();

  // ===== ANIMACIÓN TYPING HERO =====
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";
    let i = 0;

    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    }

    // Esperar a que cargue la página para empezar la animación
    setTimeout(typeWriter, 1000);
  }

  // ===== EFECTO PARALLAX SUAVE =====
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===== PRELOADER =====
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      setTimeout(() => {
        preloader.style.opacity = "0";
        setTimeout(() => {
          preloader.style.display = "none";
        }, 500);
      }, 1000);
    }
  });

  console.log("✅ La Nube Computación - Script cargado correctamente");
});

// ===== FUNCIONES GLOBALES =====
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

// ===== VALIDACIÓN DE FORMULARIO EN TIEMPO REAL =====
document.addEventListener("input", function (e) {
  if (e.target.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (e.target.value && !emailRegex.test(e.target.value)) {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "";
    }
  }
});

// ===== ANIMACIÓN DE PROGRESO DE SCROLL (OPCIONAL) =====
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;

  // Opcional: Mostrar progreso en consola (puedes comentar esta línea)
  // console.log('Scroll progress:', scrolled + '%');
});

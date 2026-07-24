// script.js - Interactividad para DYLOO Cabina 360

document.addEventListener("DOMContentLoaded", () => {
    
    /* =======================================================
       1. ANIMACIONES AL HACER SCROLL (Intersection Observer)
       ======================================================= */
    // Seleccionamos todas las secciones o cajas que queremos animar
    const elementosAnimables = document.querySelectorAll('section, .box');

    const observerOpciones = {
        root: null,
        threshold: 0.15, 
        rootMargin: "0px"
    };

    const animarEnScroll = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                // Agregamos la clase que activa la animación en CSS
                entrada.target.classList.add('visible');
                // Dejamos de observar el elemento una vez que ya apareció
                observer.unobserve(entrada.target);
            }
        });
    }, observerOpciones);

    elementosAnimables.forEach(elemento => {
        // Agregamos una clase inicial para ocultarlos
        elemento.classList.add('oculto');
        animarEnScroll.observe(elemento);
    });

    /* =======================================================
       2. ENCABEZADO DINÁMICO (Cambia de estilo al bajar)
       ======================================================= */
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });

    /* =======================================================
       3. DESPLAZAMIENTO SUAVE (Smooth Scroll para enlaces)
       ======================================================= */
    const enlacesNav = document.querySelectorAll('nav a, .nav-link');

    enlacesNav.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            // Solo si el enlace tiene un href que empiece con '#'
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const destinoId = this.getAttribute('href');
                const destinoElemento = document.querySelector(destinoId);
                
                if (destinoElemento) {
                    window.scrollTo({
                        top: destinoElemento.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    /* =======================================================
       4. INTERACTIVIDAD EN BOTONES (Efecto click)
       ======================================================= */
    const botones = document.querySelectorAll('.btn-placeholder, .btn');
    
    botones.forEach(boton => {
        boton.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        boton.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1) translateY(-3px)';
        });
        boton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});
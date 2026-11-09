/**
 * FUNDACIÓN ENGRANDE - Lógica Interactiva y Accesibilidad
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navegación Móvil
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Navbar Scrolled State & Active Spy
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    function handleScroll() {
        if (!navbar) return;
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link spy
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });

        // Botón Volver Arriba
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // 3. Botón Volver Arriba
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. Banner de Cookies / Privacidad
    const cookieBanner = document.getElementById('cookieBanner');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDetails = document.getElementById('cookieDetails');

    const cookiesAccepted = localStorage.getItem('engrande_cookies_accepted');
    if (!cookiesAccepted && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 1200);
    }

    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('engrande_cookies_accepted', 'true');
            if (cookieBanner) cookieBanner.classList.remove('visible');
        });
    }

    if (cookieDetails) {
        cookieDetails.addEventListener('click', () => {
            openModal('modal-privacidad');
        });
    }

    // 5. Gestión de Modales (Privacidad y Términos)
    const modalLinks = document.querySelectorAll('.modal-link');
    const closeTriggers = document.querySelectorAll('.modal-close-trigger');

    function openModal(modalId) {
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.classList.add('active');
            targetModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeAllModals() {
        const activeModals = document.querySelectorAll('.modal.active');
        activeModals.forEach(m => {
            m.classList.remove('active');
            m.setAttribute('aria-hidden', 'true');
        });
        document.body.style.overflow = '';
    }

    modalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-modal');
            if (targetId) {
                openModal(targetId);
            }
        });
    });

    closeTriggers.forEach(btn => {
        btn.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // Cerrar modal con tecla Escape
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // 6. Acordeón de FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            const faqItem = btn.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = faqItem.classList.contains('active');

            // Cierra los otros
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                    const ans = item.querySelector('.faq-answer');
                    if (ans) ans.style.maxHeight = null;
                }
            });

            // Toggle el actual
            if (!isActive) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 30 + 'px';
            } else {
                faqItem.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });

    // 7. Formulario de Contacto Interactivo
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formNombre').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const phone = document.getElementById('formTelefono').value.trim();
            const message = document.getElementById('formMensaje').value.trim();
            const policyCheck = document.getElementById('policyCheck');

            if (!name || !email || !message) {
                alert('Por favor completa todos los campos requeridos (*).');
                return;
            }

            if (policyCheck && !policyCheck.checked) {
                alert('Debes aceptar la Política de Privacidad para enviar tu mensaje.');
                return;
            }

            // Simulación de envío exitoso
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando mensaje...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                contactForm.reset();

                if (formFeedback) {
                    formFeedback.classList.add('success');
                    formFeedback.innerHTML = `
                        <i class="fa-solid fa-circle-check" style="font-size: 1.4rem;"></i>
                        <div>
                            <strong>¡Gracias por comunicarte con Fundación Engrande!</strong>
                            <p style="margin: 0; font-size: 0.85rem;">Hemos recibido tu mensaje correctamente. Nuestro equipo te responderá a <strong>${email}</strong> a la mayor brevedad posible.</p>
                        </div>
                    `;
                    formFeedback.style.display = 'flex';

                    // Ocultar feedback tras 7 segundos
                    setTimeout(() => {
                        formFeedback.style.display = 'none';
                    }, 7000);
                }
            }, 900);
        });
    }
});

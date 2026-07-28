document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------------
     * 1. Fade-in ao rolar a página
     * ------------------------------------------------------------------ */
    const elementsToFade = document.querySelectorAll('.fade-in');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        // Sem animação: mostra tudo de uma vez, sem quebrar a página
        elementsToFade.forEach(el => el.classList.add('visible'));
    } else {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15 });

        elementsToFade.forEach(el => observer.observe(el));
    }

    /* ------------------------------------------------------------------
     * 2. Menu mobile
     * ------------------------------------------------------------------ */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        const setMenu = (open) => {
            mobileMenu.classList.toggle('hidden', !open);
            menuBtn.setAttribute('aria-expanded', String(open));
            menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
        };

        menuBtn.addEventListener('click', () => {
            setMenu(mobileMenu.classList.contains('hidden'));
        });

        // Fecha ao clicar em um link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenu(false));
        });

        // Fecha ao clicar fora ou apertar Esc
        document.addEventListener('click', (e) => {
            if (!mobileMenu.classList.contains('hidden') &&
                !mobileMenu.contains(e.target) &&
                !menuBtn.contains(e.target)) {
                setMenu(false);
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setMenu(false);
        });
    }

    /* ------------------------------------------------------------------
     * 3. Navbar ganha fundo sólido ao rolar
     * ------------------------------------------------------------------ */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        const onScroll = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ------------------------------------------------------------------
     * 4. Link ativo na navegação conforme a seção visível
     * ------------------------------------------------------------------ */
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, { rootMargin: '-45% 0px -45% 0px' });

        sections.forEach(section => sectionObserver.observe(section));
    }
});
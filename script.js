// Intersection Observer para criar o efeito de Fade-In ao rolar a página
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Interrompe a observação após o elemento aparecer a primeira vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos com a classe fade-in
    const elementsToFade = document.querySelectorAll('.fade-in');
    
    elementsToFade.forEach(element => {
        observer.observe(element);
    });
});
// Funcionalidade dos botões do Carrossel de Projetos
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('projects-slider');
    const btnNext = document.getElementById('next-btn');
    const btnPrev = document.getElementById('prev-btn');

    if(slider && btnNext && btnPrev) {
        // Rola um card inteiro para a direita + o espaço (gap)
        btnNext.addEventListener('click', () => {
            slider.scrollBy({ left: 432, behavior: 'smooth' }); 
        });

        // Rola um card inteiro para a esquerda + o espaço (gap)
        btnPrev.addEventListener('click', () => {
            slider.scrollBy({ left: -432, behavior: 'smooth' });
        });
    }
});

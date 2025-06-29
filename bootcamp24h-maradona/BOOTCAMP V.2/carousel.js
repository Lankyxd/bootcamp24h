document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('#carousel .flex');
    const slides = document.querySelectorAll('#carousel .flex > div');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.indicator-dot');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Función para actualizar el carousel
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar indicadores
        dots.forEach((dot, index) => {
            dot.classList.toggle('bg-white', index === currentIndex);
            dot.classList.toggle('bg-white/50', index !== currentIndex);
        });
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.getAttribute('data-index'));
            updateCarousel();
        });
    });
    
    // Auto-play opcional
    let interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }, 5000);
    
    // Pausar auto-play al interactuar
    const carouselContainer = document.getElementById('carousel');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(interval));
    carouselContainer.addEventListener('mouseleave', () => {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    });
    
    // Inicializar
    updateCarousel();
    
    // Hacer el carousel responsivo al redimensionar
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});
// SPA Navigation and Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navButtons = document.querySelectorAll('.nav-button, .btn, .btn-back');
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                navigateToPage(targetPage);
            }
        });
    });

    // Initialize with home page
    navigateToPage('home');

    // Carousel functionality
    let slideIndex = 0;
    const carousel = document.getElementById('carousel');
    const indicators = document.querySelectorAll('.indicator');
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    let autoSlideInterval;
    const autoSlideDuration = 5000;

    function showSlide(index) {
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        carousel.style.animation = 'none';
        carousel.style.transition = 'transform 1s ease-in-out';
        carousel.style.transform = `translateX(-${index * 100}%)`;

        indicators.forEach((ind, i) => ind.classList.toggle('active', i === index));
        slideIndex = index;

        resetAutoSlide();
    }

    window.currentSlide = function(index) {
        showSlide(index);
    };

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            showSlide(slideIndex + 1);
        }, autoSlideDuration);
    }

    showSlide(slideIndex);

    carousel.addEventListener('mouseover', () => {
        clearInterval(autoSlideInterval);
    });

    carousel.addEventListener('mouseout', () => {
        resetAutoSlide();
    });

    // Login form handling
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const senha = document.getElementById('senha').value;

            // Simulação de login - substituir por autenticação real
            if (email && senha) {
                alert('Login realizado com sucesso!');
                navigateToPage('home');
            } else {
                alert('Por favor, preencha todos os campos.');
            }
        });
    }
});

function navigateToPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');

        // Scroll to top
        window.scrollTo(0, 0);

        // If navigating to calendar page, initialize it
        if (pageId === 'evento') {
            setTimeout(() => {
                if (typeof initializeCalendar === 'function') {
                    initializeCalendar();
                }
            }, 100);
        }
    }
}
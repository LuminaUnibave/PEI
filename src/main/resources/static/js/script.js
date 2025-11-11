

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

        function changeSlide(direction) {
            showSlide(slideIndex + direction);
        }

        function currentSlide(index) {
            showSlide(index);
        }

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
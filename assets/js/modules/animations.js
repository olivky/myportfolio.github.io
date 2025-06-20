export default class Animations {
    constructor() {
        this.animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;
                    
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, delay * 1000);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        this.animateOnScrollElements.forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
        // Эффекты при наведении для кнопок и карточек
        const hoverElements = document.querySelectorAll('[data-hover-effect]');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                const effectType = el.dataset.hoverEffect;
                
                switch(effectType) {
                    case 'scale':
                        el.style.transform = 'scale(1.05)';
                        break;
                    case 'glow':
                        el.style.boxShadow = '0 0 15px rgba(108, 92, 231, 0.6)';
                        break;
                    // Другие эффекты
                }
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = '';
                el.style.boxShadow = '';
            });
        });
    }
// Добавить в класс Animations
setupTypewriterEffect() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(el => {
        const texts = JSON.parse(el.dataset.typewriter);
        let currentTextIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const type = () => {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                el.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                el.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 1500; // Пауза в конце текста
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typingSpeed = 500; // Пауза перед новым текстом
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Начало анимации с задержкой
        setTimeout(type, 1000);
    });
}

setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = map-get($colors, primary);
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.1s ease';
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}
}


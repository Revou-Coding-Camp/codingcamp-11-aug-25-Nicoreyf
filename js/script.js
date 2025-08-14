// Global variable to store user name
let userName = '';

document.addEventListener('DOMContentLoaded', function() {

    // Handle welcome popup
    const welcomePopup = document.getElementById('welcome-popup');
    const welcomeForm = document.getElementById('welcome-form');
    const userNameInput = document.getElementById('user-name');
    const welcomeMessage = document.getElementById('welcome-message');

    // Show popup on page load
    welcomePopup.style.display = 'flex';

    // Handle form submission
    welcomeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        userName = userNameInput.value.trim();
        
        if (userName) {
            welcomePopup.classList.add('hidden');
            const fullMessage = `Welcome to My Portfolio, ${userName}!`;
            startTypingEffect(fullMessage);
        }
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff6b6b';
                } else {
                    input.style.borderColor = '#ddd';
                }
            });
            
            if (isValid) {
                alert(`Thank you ${userName || 'for your message'}! Your message has been sent successfully.`);
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Navigation background on scroll
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        nav.style.background = window.scrollY > 50 
            ? 'rgba(26, 26, 26, 0.98)' 
            : 'rgba(26, 26, 26, 0.95)';
    });

    // Section animation observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Hover effects for skill cards
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // CTA button click scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('about');
        });
    }

    // Skill progress animation
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-progress').forEach(bar => {
        progressObserver.observe(bar);
    });

    // Hero parallax
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * -0.2}px)`;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

});

// Scroll to section function
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const position = section.offsetTop - navHeight - 20;
        window.scrollTo({ top: position, behavior: 'smooth' });
    }
}

// Typing effect function (fixed)
function startTypingEffect(text) {
    const message = document.getElementById('welcome-message');
    message.textContent = '';
    let index = 0;
    
    function typeChar() {
        if (index < text.length) {
            message.textContent += text.charAt(index);
            index++;
            setTimeout(typeChar, 50);
        }
    }
    typeChar();
}

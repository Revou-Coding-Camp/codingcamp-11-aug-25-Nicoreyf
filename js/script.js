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
            const fullMessage = `Welcome to My Website, ${userName}!`;
            startTypingEffect(fullMessage);
        }
    });

    // Enhanced Contact form validation and submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        // Add form element if it doesn't exist
        if (!contactForm.tagName || contactForm.tagName !== 'FORM') {
            const formWrapper = document.createElement('form');
            formWrapper.className = 'contact-form';
            contactForm.parentNode.replaceChild(formWrapper, contactForm);
            formWrapper.innerHTML = contactForm.innerHTML;
        }

        const form = document.querySelector('.contact-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = this.querySelector('input[placeholder="Your Name"]');
            const emailInput = this.querySelector('input[placeholder="Your Email"]');
            const subjectInput = this.querySelector('input[placeholder="Subject"]');
            const messageInput = this.querySelector('textarea[placeholder="Your Message"]');
            
            // Validation object
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };
            
            // Reset previous error states
            [nameInput, emailInput, subjectInput, messageInput].forEach(input => {
                input.style.borderColor = '#ddd';
                removeErrorMessage(input);
            });
            
            let isValid = true;
            
            // Name validation
            if (!formData.name) {
                showFieldError(nameInput, 'Name is required');
                isValid = false;
            } else if (formData.name.length < 2) {
                showFieldError(nameInput, 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Email validation
            if (!formData.email) {
                showFieldError(emailInput, 'Email is required');
                isValid = false;
            } else if (!validateEmail(formData.email)) {
                showFieldError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Subject validation
            if (!formData.subject) {
                showFieldError(subjectInput, 'Subject is required');
                isValid = false;
            } else if (formData.subject.length < 3) {
                showFieldError(subjectInput, 'Subject must be at least 3 characters');
                isValid = false;
            }
            
            // Message validation
            if (!formData.message) {
                showFieldError(messageInput, 'Message is required');
                isValid = false;
            } else if (formData.message.length < 10) {
                showFieldError(messageInput, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            if (isValid) {
                // Show success animation
                showSubmissionSuccess();
                
                // Display submitted data
                displaySubmittedData(formData);
                
                // Reset form
                this.reset();
                
                // Show success message
                setTimeout(() => {
                    alert(`Thank you ${userName || formData.name}! Your message has been sent successfully.`);
                }, 500);
            } else {
                // Scroll to first error
                const firstError = this.querySelector('.error-message');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
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

    // Create submission display box
    createSubmissionDisplayBox();
});

// Validation helper functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    input.style.borderColor = '#ff6b6b';
    input.style.boxShadow = '0 0 10px rgba(255, 107, 107, 0.3)';
    
    // Remove existing error message
    removeErrorMessage(input);
    
    // Create error message element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff6b6b;
        font-size: 0.9em;
        margin-top: 5px;
        animation: errorSlideIn 0.3s ease;
    `;
    
    // Insert after input
    input.parentNode.insertBefore(errorDiv, input.nextSibling);
}

function removeErrorMessage(input) {
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

function showSubmissionSuccess() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.style.background = '#28a745';
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent! ✓';
        submitBtn.style.background = '#28a745';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = 'linear-gradient(135deg, #ff6300, #ff9500)';
        }, 2000);
    }, 500);
}

function createSubmissionDisplayBox() {
    const contactSection = document.getElementById('contact');
    
    // Create the display box
    const displayBox = document.createElement('div');
    displayBox.id = 'submission-display';
    displayBox.innerHTML = `
        <div class="submission-header">
            <h3>📧 Last Submitted Message</h3>
            <button class="close-display" onclick="toggleSubmissionDisplay()">×</button>
        </div>
        <div class="submission-content">
            <p class="no-data">No messages submitted yet.</p>
        </div>
    `;
    
    // Add styles
    displayBox.style.cssText = `
        background: linear-gradient(135deg, #f8f9fa, #e3f2fd);
        border: 2px solid #ff6300;
        border-radius: 15px;
        padding: 25px;
        margin-top: 30px;
        box-shadow: 0 10px 30px rgba(255, 99, 0, 0.1);
        display: none;
        animation: slideInUp 0.5s ease;
        position: relative;
        overflow: hidden;
    `;
    
    contactSection.appendChild(displayBox);
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes errorSlideIn {
            from {
                transform: translateX(-10px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .submission-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #ff6300;
        }
        
        .submission-header h3 {
            color: #333;
            margin: 0;
            font-size: 1.4em;
        }
        
        .close-display {
            background: #ff6300;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2em;
            line-height: 1;
            transition: all 0.3s ease;
        }
        
        .close-display:hover {
            background: #e55a00;
            transform: scale(1.1);
        }
        
        .submission-item {
            background: white;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            border-left: 4px solid #ff6300;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .submission-label {
            font-weight: bold;
            color: #ff6300;
            margin-bottom: 5px;
        }
        
        .submission-value {
            color: #333;
            margin-bottom: 10px;
            word-wrap: break-word;
        }
        
        .submission-timestamp {
            font-size: 0.9em;
            color: #666;
            text-align: right;
            font-style: italic;
        }
        
        .no-data {
            text-align: center;
            color: #999;
            font-style: italic;
            padding: 20px;
        }
    `;
    document.head.appendChild(style);
}

function displaySubmittedData(formData) {
    const displayBox = document.getElementById('submission-display');
    const contentDiv = displayBox.querySelector('.submission-content');
    
    // Create timestamp
    const timestamp = new Date().toLocaleString();
    
    // Create content HTML
    contentDiv.innerHTML = `
        <div class="submission-item">
            <div class="submission-label">👤 Name:</div>
            <div class="submission-value">${formData.name}</div>
        </div>
        <div class="submission-item">
            <div class="submission-label">📧 Email:</div>
            <div class="submission-value">${formData.email}</div>
        </div>
        <div class="submission-item">
            <div class="submission-label">📝 Subject:</div>
            <div class="submission-value">${formData.subject}</div>
        </div>
        <div class="submission-item">
            <div class="submission-label">💬 Message:</div>
            <div class="submission-value">${formData.message}</div>
        </div>
        <div class="submission-timestamp">Submitted on: ${timestamp}</div>
    `;
    
    // Show the display box
    displayBox.style.display = 'block';
    
    // Scroll to display box
    setTimeout(() => {
        displayBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function toggleSubmissionDisplay() {
    const displayBox = document.getElementById('submission-display');
    displayBox.style.display = displayBox.style.display === 'none' ? 'block' : 'none';
}

// Scroll to section function
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const position = section.offsetTop - navHeight - 20;
        window.scrollTo({ top: position, behavior: 'smooth' });
    }
}

// Typing effect function
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
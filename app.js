// Tiwari Enterprises Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const heroButtons = document.querySelectorAll('.hero-buttons a');

    // Toggle mobile menu
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
            }
        });
    }

    // Function to scroll to section
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        const header = document.querySelector('.header');
        
        if (targetSection && header) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Close mobile menu when clicking on a link
    function closeMobileMenu() {
        if (navMenu && mobileMenuBtn) {
            navMenu.classList.remove('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    }

    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
                closeMobileMenu();
            }
        });
    });

    // Handle hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (header) {
            // Add shadow when scrolled
            if (currentScrollY > 50) {
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }

            // Hide/show header on scroll (only on mobile)
            if (window.innerWidth <= 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
            }
        }

        lastScrollY = currentScrollY;
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const currentScrollY = window.scrollY + 150;

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Portfolio Modal Functionality
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.querySelector('#portfolio-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalClose = document.querySelector('.modal-close');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    // Portfolio item click handler
    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.portfolio-overlay');
            const title = overlay.querySelector('h3').textContent;
            const description = overlay.querySelector('p').textContent;

            if (modal && modalImage && modalTitle && modalDescription) {
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });

        // Hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Close modal functionality
    function closeModal() {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function(e) {
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });
    }

    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const service = formData.get('service');
            const message = formData.get('message');

            // Clear any existing error styles
            const formControls = this.querySelectorAll('.form-control');
            formControls.forEach(control => {
                control.style.borderColor = '#e0e0e0';
                control.style.boxShadow = 'none';
            });

            // Basic validation
            let hasErrors = false;

            if (!name || name.trim().length < 2) {
                showNotification('Please enter a valid full name (at least 2 characters).', 'error');
                const nameField = this.querySelector('#name');
                if (nameField) {
                    nameField.style.borderColor = '#dc3545';
                    nameField.focus();
                }
                hasErrors = true;
            }

            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                const emailField = this.querySelector('#email');
                if (emailField) {
                    emailField.style.borderColor = '#dc3545';
                    if (!hasErrors) emailField.focus();
                }
                hasErrors = true;
            }

            if (!message || message.trim().length < 10) {
                showNotification('Please provide detailed project information (at least 10 characters).', 'error');
                const messageField = this.querySelector('#message');
                if (messageField) {
                    messageField.style.borderColor = '#dc3545';
                    if (!hasErrors) messageField.focus();
                }
                hasErrors = true;
            }

            if (hasErrors) return;

            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Simulate API call delay
            setTimeout(() => {
                showNotification(`Thank you, ${name}! Your project inquiry has been received successfully. We'll contact you at ${email} within 24 hours to discuss your ${service ? service.replace('-', ' ') : 'construction'} requirements.`, 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Reset form field borders
                formControls.forEach(control => {
                    control.style.borderColor = '#e0e0e0';
                    control.style.boxShadow = 'none';
                });
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease-out;
            font-size: 14px;
            line-height: 1.4;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.backgroundColor = '#28a745';
                break;
            case 'error':
                notification.style.backgroundColor = '#dc3545';
                break;
            case 'warning':
                notification.style.backgroundColor = '#ffc107';
                notification.style.color = '#000';
                break;
            default:
                notification.style.backgroundColor = '#007bff';
        }

        // Add close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 8px;
            line-height: 1;
            flex-shrink: 0;
        `;

        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 8 seconds for success, 6 seconds for others
        const autoRemoveDelay = type === 'success' ? 8000 : 6000;
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, autoRemoveDelay);
    }

    // Add notification animations and additional styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @media (max-width: 480px) {
            .notification {
                top: 10px !important;
                right: 10px !important;
                left: 10px !important;
                max-width: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        const originalText = target;
        const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
        const suffix = target.replace(/[0-9]/g, '');
        
        if (numericValue === 0) {
            element.textContent = originalText;
            return;
        }
        
        let start = 0;
        const increment = numericValue / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < numericValue) {
                element.textContent = Math.floor(start) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = originalText;
            }
        }
        
        updateCounter();
    }

    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item');
    
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const target = stat.textContent;
                    setTimeout(() => {
                        animateCounter(stat, target, 1800);
                    }, index * 200);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        statsObserver.observe(aboutStats);
    }

    // Click to call and email functionality with feedback
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show feedback for mobile users
            if (window.innerWidth <= 768) {
                showNotification('Opening phone app to call Tiwari Enterprises...', 'info');
            }
        });
    });

    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show feedback
            showNotification('Opening email client to contact Tiwari Enterprises...', 'info');
        });
    });

    // Image error handling with professional placeholders
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // For portfolio images
            if (this.closest('.portfolio-item')) {
                const placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #6c757d;
                    font-size: 16px;
                    text-align: center;
                    flex-direction: column;
                    font-family: var(--font-family-base);
                `;
                placeholder.innerHTML = `
                    <div style="font-size: 48px; margin-bottom: 12px; color: #FFFF00;">🏗️</div>
                    <div style="font-weight: 600; margin-bottom: 4px;">Construction Project</div>
                    <div style="font-size: 14px; opacity: 0.8;">Image unavailable</div>
                `;
                
                this.parentNode.insertBefore(placeholder, this);
                this.style.display = 'none';
            }
            
            // For logo images
            if (this.closest('.logo')) {
                this.style.display = 'none';
                const logoText = this.nextElementSibling;
                if (logoText) {
                    logoText.style.fontSize = '1.75rem';
                    logoText.style.fontWeight = '800';
                    logoText.style.color = '#FFFF00';
                    logoText.style.textShadow = '1px 1px 2px rgba(0,0,0,0.2)';
                }
            }
        });
    });

    // Smooth scroll for footer links
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                scrollToSection(targetId);
            }
        });
    });

    // Enhanced form interactions
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#FFFF00';
            this.style.boxShadow = '0 0 0 3px rgba(255, 255, 0, 0.2)';
            this.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '#e0e0e0';
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });

        // Real-time validation feedback
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                const email = this.value;
                if (email && !isValidEmail(email)) {
                    this.style.borderColor = '#dc3545';
                } else if (email) {
                    this.style.borderColor = '#28a745';
                } else {
                    this.style.borderColor = '#e0e0e0';
                }
            });
        }
    });

    // Service card hover enhancements
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Button hover enhancements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.disabled) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Loading state for images
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Console log for development
    console.log('✅ Tiwari Enterprises website loaded successfully!');
    console.log('📱 Mobile responsive design active');
    console.log('🎨 Interactive portfolio gallery ready');
    console.log('📧 Contact form with validation enabled');
});

// Portfolio Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the portfolio page
    if (document.querySelector('.portfolio-filter')) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const category = this.dataset.category;
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Initialize Isotope for filtering if you want more advanced filtering
        // You'll need to include Isotope library for this to work
        // initIsotope();
    }
});

// Optional: Isotope initialization for more advanced filtering
function initIsotope() {
    const iso = new Isotope('.portfolio-grid', {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.category;
            if (filterValue === 'all') {
                iso.arrange({ filter: '*' });
            } else {
                iso.arrange({ filter: `[data-category="${filterValue}"]` });
            }
        });
    });
}


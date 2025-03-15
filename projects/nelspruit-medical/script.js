document.addEventListener('DOMContentLoaded', function() {
    // Show mockup notification
    showMockupNotification("This is a mockup website. Interactive elements will show messages instead of performing real actions.");
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Change menu icon
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Appointment button
    const appointmentButtons = document.querySelectorAll('.appointment-btn');
    
    appointmentButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would open appointment scheduling
            alert('In a real website, this would open an appointment scheduling form where you could select department, doctor, date, and time.');
        });
    });
    
    // Emergency button
    const emergencyButton = document.querySelector('.emergency-btn');
    
    if (emergencyButton) {
        emergencyButton.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would show emergency info
            alert('EMERGENCY INFORMATION\n\nIn a real website, this would display emergency contact numbers, address, and directions to the emergency room.');
        });
    }
    
    // Search function
    const searchForm = document.querySelector('.search-form');
    
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input[type="search"]');
            
            if (searchInput && searchInput.value) {
                // In a real app, this would perform a search
                alert(`In a real website, this would search for "${searchInput.value}" across the medical center's website and show relevant results.`);
                searchInput.value = '';
            }
        });
    }
    
    // Department filter
    const departmentFilters = document.querySelectorAll('.department-filter button');
    
    departmentFilters.forEach(button => {
        button.addEventListener('click', function() {
            departmentFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const department = this.textContent;
            
            // In a real app, this would filter doctors
            alert(`In a real website, this would filter doctors to show only those in the "${department}" department.`);
        });
    });
    
    // Doctor profile links
    const doctorProfiles = document.querySelectorAll('.doctor-card');
    
    doctorProfiles.forEach(profile => {
        profile.addEventListener('click', function() {
            const doctorName = this.querySelector('h3').textContent;
            
            // In a real app, this would open doctor profile
            alert(`In a real website, this would open the detailed profile for Dr. ${doctorName}, showing education, specializations, and availability.`);
        });
    });
    
    // Service details
    const serviceLinks = document.querySelectorAll('.service-card');
    
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.querySelector('h3').textContent;
            
            // In a real app, this would show service details
            alert(`In a real website, this would show detailed information about the "${serviceName}" service, including procedures, preparations, and related doctors.`);
        });
    });
    
    // Telehealth consultation button
    const telehealthButtons = document.querySelectorAll('.telehealth-btn');
    
    telehealthButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real app, this would start a telehealth session
            alert('In a real website, this would start the telehealth consultation process, allowing you to connect with a healthcare provider remotely.');
        });
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, this would submit contact form
            alert('In a real website, your message would be sent to the medical center staff, and you would receive a confirmation email.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // In a real app, this would subscribe the email
                alert(`In a real website, "${emailInput.value}" would be subscribed to the medical center's newsletter for health tips and updates.`);
                emailInput.value = '';
            }
        });
    }
    
    // Appointment form validation
    const appointmentForm = document.querySelector('.appointment-form form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const fullname = document.getElementById('fullname');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const department = document.getElementById('department');
            const date = document.getElementById('date');
            
            // Simple validation
            if (!fullname.value.trim()) {
                isValid = false;
                showError(fullname, 'Please enter your full name');
            } else {
                removeError(fullname);
            }
            
            if (!email.value.trim()) {
                isValid = false;
                showError(email, 'Please enter your email');
            } else if (!isValidEmail(email.value)) {
                isValid = false;
                showError(email, 'Please enter a valid email address');
            } else {
                removeError(email);
            }
            
            if (!phone.value.trim()) {
                isValid = false;
                showError(phone, 'Please enter your phone number');
            } else {
                removeError(phone);
            }
            
            if (!department.value) {
                isValid = false;
                showError(department, 'Please select a department');
            } else {
                removeError(department);
            }
            
            if (!date.value) {
                isValid = false;
                showError(date, 'Please select a date');
            } else {
                removeError(date);
            }
            
            // If all fields are valid, show success message
            if (isValid) {
                // In a real project, we would send the form data to the server here
                showSuccessMessage();
                appointmentForm.reset();
            }
        });
    }
    
    // Testimonial slider (simplified version)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.opacity = '0.5';
                card.style.transform = 'translateX(20px)';
            }
        });
    }
    
    // If testimonials exist, set up automatic slider
    if (testimonialCards.length > 1) {
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === "#") return;
            
            const targetSection = document.querySelector(href);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle.querySelector('i')) {
                        mobileMenuToggle.querySelector('i').classList.add('fa-bars');
                        mobileMenuToggle.querySelector('i').classList.remove('fa-times');
                    }
                }
            }
        });
    });
    
    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
        
        if (!formGroup.querySelector('.error-message')) {
            errorElement.className = 'error-message';
            errorElement.style.color = '#d32f2f';
            errorElement.style.fontSize = '0.85rem';
            errorElement.style.marginTop = '5px';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.style.borderColor = '#d32f2f';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.style.borderColor = '';
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.backgroundColor = '#4caf50';
        successMessage.style.color = 'white';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '6px';
        successMessage.style.marginBottom = '20px';
        successMessage.style.textAlign = 'center';
        successMessage.innerHTML = '<strong>Success!</strong> Your appointment request has been submitted. We will contact you shortly to confirm your appointment.';
        
        const form = document.querySelector('.appointment-form form');
        form.parentNode.insertBefore(successMessage, form);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            if (form.parentNode.contains(successMessage)) {
                form.parentNode.removeChild(successMessage);
            }
        }, 5000);
    }
    
    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Initialize smooth scroll for all anchor links
    initSmoothScroll();
    
    // Initialize animations for elements
    initAnimations();
    
    // Add interaction to buttons and forms
    enhanceInteractiveElements();
    
    // Call init function when document is ready
    initMockupUI();
});

function initMockupUI() {
    // Show initial mockup notification
    showMockupNotification("This is a mockup website. Interactive elements will show messages instead of performing real actions.");
    
    // Initialize other UI components
    initSmoothScroll();
    initAnimations();
    enhanceInteractiveElements();
    // Add other initialization functions as needed
}

// Smooth scroll function
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animation on scroll
function initAnimations() {
    const animatedElements = document.querySelectorAll('.service-card, .doctor-card, .testimonial-card, .facility-item');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Enhance interactive elements
function enhanceInteractiveElements() {
    // Add hover effects to all buttons
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        button.addEventListener('click', function(e) {
            // Skip if this is the notification close button
            if (this.classList.contains('close-btn') && this.closest('.mockup-notification')) {
                return;
            }
            
            // If it's not a link or has no real functionality
            if (!this.closest('a[href]') || this.closest('a[href="#"]')) {
                e.preventDefault();
                alert('This feature would be functional in a real website.');
            }
        });
    });
    
    // Add interactivity to forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission would be processed in a real website.');
        });
    });
}

// Mockup notification
function showMockupNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.mockup-notification');
    
    if (notification) {
        // If the notification already exists, update its text
        const messageSpan = notification.querySelector('span');
        if (messageSpan) {
            messageSpan.textContent = message;
        }
    } else {
        // Create a new notification if it doesn't exist
        notification = document.createElement('div');
        notification.className = 'mockup-notification';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-info-circle';
        
        const messageSpan = document.createElement('span');
        messageSpan.textContent = message;
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function() {
            notification.classList.add('hidden');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300); // Remove after transition
        });
        
        notification.appendChild(icon);
        notification.appendChild(messageSpan);
        notification.appendChild(closeBtn);
        
        document.body.appendChild(notification);
    }
    
    return notification;
} 
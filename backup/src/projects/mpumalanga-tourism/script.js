document.addEventListener('DOMContentLoaded', function() {
    // Show mockup notification
    showMockupNotification("This is a mockup website. Interactive elements will show messages instead of performing real actions.");
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Map Controls
    const mapControls = document.querySelectorAll('.map-control-btn');
    
    mapControls.forEach(control => {
        control.addEventListener('click', function() {
            mapControls.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Here you would normally update the map to show different layers
            // For this demo, we'll just log which button was clicked
            const layer = this.textContent.trim();
            console.log('Map filter changed to:', layer);
            alert(`In a real website, the map would now show "${layer}" attractions in Mpumalanga.`);
        });
    });
    
    // Interactive Map Markers
    const mapMarkers = document.querySelectorAll('.map-marker');
    
    mapMarkers.forEach(marker => {
        marker.addEventListener('mouseover', function() {
            const tooltip = this.querySelector('.marker-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
            }
        });
        
        marker.addEventListener('mouseout', function() {
            const tooltip = this.querySelector('.marker-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '0';
            }
        });
        
        marker.addEventListener('click', function() {
            const locationName = this.querySelector('.marker-tooltip').textContent;
            // In a real website, this would show location details
            alert(`In a real website, this would open detailed information about ${locationName}, including photos, operating hours, and booking options.`);
        });
    });
    
    // Trip Planner Functionality
    const createPlanBtn = document.querySelector('.create-plan-btn');
    
    if (createPlanBtn) {
        createPlanBtn.addEventListener('click', function() {
            const duration = document.querySelector('.filter-group:nth-child(1) select').value;
            const interests = document.querySelector('.filter-group:nth-child(2) select').value;
            const budget = document.querySelector('.filter-group:nth-child(3) select').value;
            
            // In a real application, this would generate a custom itinerary
            // For this demo, we'll just show an alert with the selected options
            alert(`Creating a custom itinerary for:
                Duration: ${duration}
                Interests: ${interests}
                Budget: ${budget}
                
In a real application, this would show a personalized trip plan based on your preferences.`);
        });
    }
    
    // Search Functionality (Simplified)
    const searchContainer = document.querySelector('.search-container');
    
    if (searchContainer) {
        const searchInput = searchContainer.querySelector('input');
        const searchButton = searchContainer.querySelector('button');
        
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm !== '') {
                // In a real app, this would perform an actual search
                alert(`Searching for: "${searchTerm}". In a real application, this would display search results.`);
            }
        });
        
        // Allow pressing Enter to search
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    // Map Search Functionality
    const mapSearch = document.querySelector('.map-search');
    
    if (mapSearch) {
        const mapSearchInput = mapSearch.querySelector('input');
        const mapSearchButton = mapSearch.querySelector('button');
        
        mapSearchButton.addEventListener('click', function() {
            const searchTerm = mapSearchInput.value.trim();
            if (searchTerm !== '') {
                // In a real app, this would search on the map
                alert(`Searching for "${searchTerm}" on the map. In a real app, the map would pan and zoom to the location.`);
            }
        });
        
        mapSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                mapSearchButton.click();
            }
        });
    }
    
    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button');
        
        submitButton.addEventListener('click', function(e) {
            e.preventDefault();
            const email = emailInput.value.trim();
            
            if (email === '') {
                alert('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real app, this would send the email to a server
            alert(`Thank you for subscribing with ${email}! You'll now receive our newsletter.`);
            emailInput.value = '';
        });
    }
    
    // Helper function to validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Simulated Page Loading Effect
    const contentSections = document.querySelectorAll('section');
    setTimeout(() => {
        contentSections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('loaded');
            }, index * 200);
        });
    }, 500);
    
    // Initialize smooth scroll for all anchor links
    initSmoothScroll();
    
    // Initialize animations for elements
    initAnimations();
    
    // Add interaction to buttons and forms
    enhanceInteractiveElements();
    
    // Dynamic current year for footer copyright
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    // Initialize other UI components
    initMockupUI();
});

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
    const animatedElements = document.querySelectorAll('.feature-card, .destination-card, .testimonial-card, .gallery-item');
    
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

function initMockupUI() {
    // Show initial mockup notification
    showMockupNotification("This is a mockup website. Interactive elements will show messages instead of performing real actions.");
    
    // Initialize other UI components
    initSmoothScroll();
    initAnimations();
    enhanceInteractiveElements();
    // Add other initialization functions as needed
} 
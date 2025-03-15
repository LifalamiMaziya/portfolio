document.addEventListener('DOMContentLoaded', function() {
    // Show mockup notification
    showMockupNotification("This is a mockup website. Interactive elements will show messages instead of performing real actions.");
    
    // Initialize smooth scroll for all anchor links
    initSmoothScroll();
    
    // Initialize animations for elements
    initAnimations();
    
    // Add interaction to buttons and forms
    enhanceInteractiveElements();
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992) {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        }
    });
    
    // Handle window resize for sidebar visibility
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
    
    // Market Trends Chart Filters
    const timeFilterButtons = document.querySelectorAll('.time-filter button');
    
    timeFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            timeFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // In a real application, this would update the chart data
            // Here we'll just simulate changing the chart data
            const chartBars = document.querySelectorAll('.chart-bar');
            chartBars.forEach(bar => {
                const randomHeight = Math.floor(Math.random() * 90) + 10;
                bar.style.height = `${randomHeight}%`;
            });
            
            console.log('Market trends filter changed to:', this.textContent);
        });
    });
    
    // Simulate loading data
    simulateLoading();
    
    // Add hover effects to inventory rows
    const inventoryRows = document.querySelectorAll('.inventory-table tbody tr');
    
    inventoryRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(76, 175, 80, 0.05)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
    
    // Add click events to action buttons
    const editButtons = document.querySelectorAll('.action-btn.edit');
    const viewButtons = document.querySelectorAll('.action-btn.view');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const productName = row.querySelector('.product-cell span').textContent;
            
            // In a real application, this would open an edit modal
            alert(`Edit ${productName} - In a real application, this would open an edit form.`);
        });
    });
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const row = this.closest('tr');
            const productName = row.querySelector('.product-cell span').textContent;
            
            // In a real application, this would open a details modal
            alert(`View ${productName} details - In a real application, this would show full product details.`);
        });
    });
    
    // Contact buttons for buyers
    const contactButtons = document.querySelectorAll('.contact-btn');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buyerName = this.closest('.buyer-item').querySelector('h3').textContent;
            
            // In a real application, this would open a messaging interface
            alert(`Contact ${buyerName} - In a real application, this would open a chat window.`);
        });
    });
    
    // Add Product Button
    const addProductBtn = document.querySelector('.add-product-btn');
    
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            // In a real application, this would open a form to add a new product
            alert('In a real application, this would open a form to add a new product to your inventory.');
        });
    }
    
    // Notification/Message icon clicks
    const notificationIcon = document.querySelector('.navbar-icon .fa-bell').parentElement;
    const messageIcon = document.querySelector('.navbar-icon .fa-envelope').parentElement;
    
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, this would open a notifications panel
            alert('In a real application, this would show your notifications.');
        });
    }
    
    if (messageIcon) {
        messageIcon.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, this would open a messages panel
            alert('In a real application, this would show your messages.');
        });
    }
    
    // Weather widget functionality (simulated weather updates)
    const weatherIcon = document.querySelector('.weather-icon i');
    const tempSpan = document.querySelector('.temp');
    
    if (weatherIcon && tempSpan) {
        // Simulate changing weather every 30 seconds
        setInterval(function() {
            const weatherTypes = [
                { icon: 'fa-sun', temp: '28°C' },
                { icon: 'fa-cloud-sun', temp: '25°C' },
                { icon: 'fa-cloud', temp: '22°C' },
                { icon: 'fa-cloud-rain', temp: '20°C' }
            ];
            
            const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            
            weatherIcon.className = '';
            weatherIcon.classList.add('fas', randomWeather.icon);
            tempSpan.textContent = randomWeather.temp;
        }, 30000); // Update every 30 seconds
    }
    
    // Charts animation on scroll
    const charts = document.querySelector('.chart-bars');
    
    if (charts) {
        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCharts();
                    chartObserver.disconnect(); // Only animate once
                }
            });
        }, { threshold: 0.5 });
        
        chartObserver.observe(charts);
    }
    
    // Simulate periodic data updates for a real-time feel
    setInterval(function() {
        // Randomly update one of the stat cards
        const statCards = document.querySelectorAll('.stat-card-value');
        if (statCards.length > 0) {
            const randomCard = statCards[Math.floor(Math.random() * statCards.length)];
            
            // Create a brief highlight effect
            randomCard.style.transition = 'color 0.3s ease';
            randomCard.style.color = '#4caf50';
            
            setTimeout(() => {
                randomCard.style.color = '';
            }, 1000);
        }
    }, 15000); // Every 15 seconds
    
    // Simulate adding a new activity notification periodically
    setInterval(function() {
        addNewActivity();
    }, 45000); // Every 45 seconds
});

// Function to simulate loading state
function simulateLoading() {
    const contentSections = [
        '.stats-cards',
        '.recent-activity',
        '.market-trends',
        '.inventory-status',
        '.top-buyers'
    ];
    
    contentSections.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('loading');
            
            setTimeout(() => {
                element.classList.remove('loading');
                element.classList.add('loaded');
            }, 500 + (index * 300)); // Staggered loading effect
        }
    });
}

// Function to animate chart bars
function animateCharts() {
    const chartBars = document.querySelectorAll('.chart-bar');
    
    chartBars.forEach((bar, index) => {
        const height = bar.style.height;
        
        // Reset height first for animation
        bar.style.height = '0%';
        bar.style.transition = 'height 1s ease';
        
        setTimeout(() => {
            bar.style.height = height;
        }, index * 200); // Staggered animation
    });
}

// Function to simulate adding a new activity
function addNewActivity() {
    const activityList = document.querySelector('.activity-list');
    if (!activityList) return;
    
    const activities = [
        {
            icon: 'orange',
            iconClass: 'fa-bell',
            title: 'Weather Alert',
            description: 'Heavy rainfall expected tomorrow. Consider adjusting harvest schedule.',
            time: 'Just now'
        },
        {
            icon: 'blue',
            iconClass: 'fa-chart-line',
            title: 'Price Update',
            description: 'Orange prices have increased by 5% in Gauteng markets.',
            time: 'Just now'
        },
        {
            icon: 'green',
            iconClass: 'fa-user-plus',
            title: 'New Buyer Registered',
            description: 'Fresh Direct Market has created an account and is looking for citrus.',
            time: 'Just now'
        }
    ];
    
    const randomActivity = activities[Math.floor(Math.random() * activities.length)];
    
    // Create new activity element
    const newActivity = document.createElement('div');
    newActivity.className = 'activity-item new-activity';
    newActivity.innerHTML = `
        <div class="activity-icon ${randomActivity.icon}">
            <i class="fas ${randomActivity.iconClass}"></i>
        </div>
        <div class="activity-content">
            <h3>${randomActivity.title}</h3>
            <p>${randomActivity.description}</p>
            <span class="activity-time">${randomActivity.time}</span>
        </div>
    `;
    
    // Add highlight effect
    newActivity.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    
    // Add to the top of the list
    if (activityList.firstChild) {
        activityList.insertBefore(newActivity, activityList.firstChild);
    } else {
        activityList.appendChild(newActivity);
    }
    
    // Remove the oldest activity if there are more than 4
    const activities_elements = activityList.querySelectorAll('.activity-item');
    if (activities_elements.length > 4) {
        activityList.removeChild(activities_elements[activities_elements.length - 1]);
    }
    
    // Fade out highlight effect
    setTimeout(() => {
        newActivity.style.transition = 'background-color 1s ease';
        newActivity.style.backgroundColor = '';
    }, 3000);
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
    const animatedElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .team-member');
    
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
        });
        
        notification.appendChild(icon);
        notification.appendChild(messageSpan);
        notification.appendChild(closeBtn);
        
        document.body.appendChild(notification);
        
        // Auto-hide after 8 seconds
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 8000);
    }
}

// Call init function when document is ready
document.addEventListener('DOMContentLoaded', function() {
    initMockupUI();
});

function initMockupUI() {
    // Show initial mockup notification
    showMockupNotification("This is a mockup website. Interactive elements will show messages instead of performing real actions.");
    
    // Initialize other UI components
    simulateLoading();
    animateCharts();
    addNewActivity();
    initSmoothScroll();
    initAnimations();
    enhanceInteractiveElements();
} 
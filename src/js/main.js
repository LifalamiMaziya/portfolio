/**
 * MAZIYA.DEV - Portfolio
 * Brutalist + Apple California Style
 * Author: Lifalami Maziya
 */

// Immediately mark the body as loading
document.body.classList.add('js-loading');

// Remove loading class as soon as possible for critical images
window.addEventListener('load', function() {
  document.body.classList.remove('js-loading');
});

// Fallback to remove loading class if load event takes too long
setTimeout(function() {
  document.body.classList.remove('js-loading');
}, 1000);

document.addEventListener('DOMContentLoaded', () => {
  // Fix for iOS and Android touch events
  document.addEventListener('touchstart', function() {}, {passive: true});
  
  // Initialize core functionality
  const initialize = () => {
    // Remove loading class once everything is initialized
    document.body.classList.remove('js-loading');
    
    // Initialize components
    addPassiveEventListeners();
    initBlobs();
    initCustomCursor();
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initMobileMenu();
    initializeLogoSwitch();
    initThemeToggle();
    initLazyLoading();
    
    // Force theme check on page load
    setTimeout(() => {
      const darkTheme = document.body.classList.contains('dark-theme');
      document.dispatchEvent(new CustomEvent('themeChange', { 
        detail: { isDark: darkTheme } 
      }));
    }, 100);
  };
  
  // Initialize after a small delay to ensure everything is loaded
  setTimeout(initialize, 100);
});

/**
 * Add passive event listeners to improve performance on touch devices
 */
function addPassiveEventListeners() {
  // Check if passive is supported
  let passiveSupported = false;
  try {
    // Test via a getter in the options object to see if the passive property is accessed
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        passiveSupported = true;
        return true;
      }
    });
    window.addEventListener('testPassive', null, opts);
    window.removeEventListener('testPassive', null, opts);
  } catch (e) {}

  // Add scroll event listener with passive option if supported
  window.addEventListener('scroll', throttle(handleScroll, 100), 
    passiveSupported ? { passive: true } : false
  );
  
  // Add touch event listeners for mobile
  if ('ontouchstart' in window) {
    document.addEventListener('touchstart', handleTouchStart, 
      passiveSupported ? { passive: true } : false
    );
    document.addEventListener('touchmove', handleTouchMove, 
      passiveSupported ? { passive: true } : false
    );
  }
}

/**
 * Handle scroll events
 */
function handleScroll() {
  // Update header style based on scroll position
  const header = document.querySelector('.header');
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  // Check for elements to animate
  const animateElements = document.querySelectorAll('.fade-in:not(.visible)');
  animateElements.forEach(element => {
    if (isElementInViewport(element)) {
      element.classList.add('visible');
    }
  });
}

/**
 * Handle touch start for mobile interactions
 */
function handleTouchStart(e) {
  // Only track touch position for menu-related elements, not links or buttons
  if (e.target.tagName !== 'A' && !e.target.closest('button') && !e.target.closest('form')) {
    window.touchStartX = e.changedTouches[0].screenX;
    window.touchStartY = e.changedTouches[0].screenY;
  }
}

/**
 * Handle touch move for mobile interactions
 */
function handleTouchMove(e) {
  // Only handle swipe gestures if we've started tracking a touch and not on interactive elements
  if ((!window.touchStartX || !window.touchStartY) || 
      e.target.tagName === 'A' || 
      e.target.closest('button') || 
      e.target.closest('form')) return;
  
  // Calculate distance moved
  const touchEndX = e.changedTouches[0].screenX;
  const touchEndY = e.changedTouches[0].screenY;
  const xDiff = window.touchStartX - touchEndX;
  const yDiff = window.touchStartY - touchEndY;
  
  // Handle horizontal swipes (for potential mobile menu)
  if (Math.abs(xDiff) > Math.abs(yDiff) && Math.abs(xDiff) > 50) {
    if (xDiff > 0) {
      // Swipe left - close mobile menu if open
      const mobileNav = document.querySelector('.nav-links.active');
      if (mobileNav) {
        closeMobileMenu();
      }
    } else {
      // Swipe right - open mobile menu if closed
      const mobileNav = document.querySelector('.nav-links:not(.active)');
      if (mobileNav && window.innerWidth < 768) {
        openMobileMenu();
      }
    }
  }
  
  // Reset values
  window.touchStartX = null;
  window.touchStartY = null;
}

/**
 * Throttle function to limit function call frequency
 */
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}

/**
 * Check if element is in viewport
 */
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0 &&
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right >= 0
  );
}

/**
 * Initialize animated blob background
 */
function initBlobs() {
  const blobs = document.querySelectorAll('.blob');
  
  // Force repaint to ensure blobs are visible
  blobs.forEach(blob => {
    // Trigger reflow
    blob.style.display = 'none';
    blob.offsetHeight; // Force reflow
    blob.style.display = 'block';
    
    // Ensure opacity is set correctly
    blob.style.opacity = '1';
    
    // Set blend mode explicitly
    blob.style.mixBlendMode = 'screen';
    
    // Add will-change property for better performance
    blob.style.willChange = 'transform, opacity';
    
    // Force animation restart
    blob.style.animation = 'none';
    blob.offsetHeight; // Force reflow
    blob.style.animation = '';
    
    // Enhance visibility with filter
    blob.style.filter = 'blur(50px) saturate(200%) contrast(120%)';
  });
  
  // Ensure blob container is visible
  const blobContainer = document.querySelector('.blob-container');
  if (blobContainer) {
    blobContainer.style.zIndex = '-2';
  }
  
  // Ensure glass overlay is properly transparent
  const glassOverlay = document.querySelector('.glass-overlay');
  if (glassOverlay) {
    glassOverlay.style.zIndex = '-1';
    glassOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    glassOverlay.style.backdropFilter = 'blur(5px)';
    glassOverlay.style.webkitBackdropFilter = 'blur(5px)';
  }
}

/**
 * Custom cursor with subtle effects
 */
function initCustomCursor() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;
  
  let cursorVisible = false;
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Parameters for smooth movement
  const ease = 0.15;
  
  // Hide cursor initially
  cursor.style.opacity = '0';
  
  // Track mouse position
  document.addEventListener('mousemove', e => {
    cursorVisible = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show cursor once we have position
    cursor.style.opacity = '1';
  });
  
  // Handle mouse leaving window
  document.addEventListener('mouseout', () => {
    cursorVisible = false;
    cursor.style.opacity = '0';
  });
  
  // Interactive elements affecting cursor
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card, input, textarea');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-link');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-link');
    });
  });
  
  // Smooth cursor animation
  function animateCursor() {
    if (cursorVisible) {
      // Smooth movement with easing
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      // Apply position
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation
  animateCursor();
}

/**
 * Navigation and header effects
 */
function initNavigation() {
  const header = document.querySelector('.header');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!header) return;
  
  // Header scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle is now handled in initMobileMenu
  // Removed to prevent double initialization
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
      }
      
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Offset for header
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in');
  
  // Intersection Observer configuration
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all animated elements
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Typing effect for hero section
 */
function initTypingEffect() {
  const typingElement = document.querySelector('.hero-title-animated');
  if (!typingElement) return;
  
  const words = ['Developer', 'Designer', 'Problem Solver', 'Creator'];
  let wordIndex = 0;
  
  // Clear any initial content
  typingElement.textContent = '';
  
  // This function handles typing each character one by one
  function typeWord(word, charIndex = 0) {
    // If we've typed the entire word
    if (charIndex >= word.length) {
      // Wait before deleting
      setTimeout(() => deleteWord(word, word.length), 2000);
      return;
    }
    
    // Add next character
    typingElement.textContent = word.substring(0, charIndex + 1);
    
    // Add some random delay between characters (100-200ms)
    const typingDelay = Math.floor(Math.random() * 100) + 100;
    setTimeout(() => typeWord(word, charIndex + 1), typingDelay);
  }
  
  // This function handles deleting each character one by one
  function deleteWord(word, charIndex) {
    // If we've deleted the entire word
    if (charIndex <= 0) {
      // Move to next word and start typing
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(() => typeWord(words[wordIndex]), 500);
      return;
    }
    
    // Remove one character
    typingElement.textContent = word.substring(0, charIndex - 1);
    
    // Delete faster than typing
    setTimeout(() => deleteWord(word, charIndex - 1), 50);
  }
  
  // Start the animation with the first word
  setTimeout(() => typeWord(words[0]), 1000);
}

/**
 * Contact form validation and submission
 */
function initContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    let isValid = true;
    let errorMessage = '';
    
    if (!data.name || data.name.trim() === '') {
      isValid = false;
      errorMessage = 'Please enter your name';
    } else if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    } else if (!data.message || data.message.trim() === '') {
      isValid = false;
      errorMessage = 'Please enter your message';
    }
    
    if (!isValid) {
      alert(errorMessage);
      return;
    }
    
    // Simulate form submission success
    contactForm.innerHTML = '<div class="form-success"><p>Thank you for your message! I\'ll get back to you soon.</p></div>';
    
    // In a real implementation, you would send the data to a server here
    console.log('Form submission data:', data);
  });
}

/**
 * Mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const body = document.body;
  
  // Return early if critical elements are missing
  if (!mobileMenuBtn || !navLinks) return;
  
  // Ensure proper initial state
  navLinks.classList.remove('active');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.display = 'none';
  }
  
  // Fix for iOS hover states persisting after touch
  document.addEventListener('touchend', function() {}, false);
  
  // Toggle menu when button is clicked - with both click and touch events
  mobileMenuBtn.addEventListener('click', handleMenuToggle);
  mobileMenuBtn.addEventListener('touchend', handleMenuToggle, { passive: false });
  
  function handleMenuToggle(e) {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent default behavior
    toggleMobileMenu();
  }
  
  // Close menu when clicking overlay - with both click and touch events
  if (overlay) {
    overlay.addEventListener('click', handleOverlayClick);
    overlay.addEventListener('touchend', handleOverlayClick, { passive: false });
  }
  
  function handleOverlayClick(e) {
    e.stopPropagation(); // Prevent event bubbling
    e.preventDefault(); // Prevent default behavior
    closeMobileMenu();
  }
  
  // Close menu when clicking navigation links - modified to ensure links work
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function() {
      // Don't prevent default to allow link navigation
      // Add small delay to ensure the link works
      setTimeout(closeMobileMenu, 100);
    });
  });
  
  // Add index to each list item for staggered animation
  navLinks.querySelectorAll('li').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
  });
  
  // Make these functions global so they can be called from touch handlers
  window.toggleMobileMenu = toggleMobileMenu;
  window.openMobileMenu = openMobileMenu;
  window.closeMobileMenu = closeMobileMenu;
  
  function toggleMobileMenu() {
    if (navLinks.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
  
  function openMobileMenu() {
    // Add active class to trigger animations
    navLinks.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    
    // Prevent body scrolling - fixed iOS double tap issue
    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.top = `-${window.scrollY}px`;
    body.dataset.scrollY = window.scrollY;
    
    // Show overlay
    if (overlay) {
      overlay.style.display = 'block';
      // Force reflow
      overlay.offsetHeight;
      overlay.classList.add('active');
    }
  }
  
  function closeMobileMenu() {
    // Remove active classes
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    
    // Restore body scrolling - handle iOS correctly
    const scrollY = parseInt(body.dataset.scrollY || '0');
    body.style.position = '';
    body.style.width = '';
    body.style.top = '';
    body.style.overflow = '';
    window.scrollTo(0, scrollY);
    
    // Hide overlay
    if (overlay) {
      overlay.classList.remove('active');
      setTimeout(() => {
        if (!overlay.classList.contains('active')) {
          overlay.style.display = 'none';
        }
      }, 300); // Match transition duration
    }
  }
  
  // Close menu when pressing escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });
}

/**
 * Handle dynamic logo switching based on scroll position or theme
 */
function initializeLogoSwitch() {
  const logo = document.querySelector('.logo-img');
  const header = document.querySelector('.header');
  
  if (!logo || !header) return;
  
  // Function to update logo based on theme
  function updateLogoForTheme() {
    const isDarkTheme = document.body.classList.contains('dark-theme');
    
    if (isDarkTheme) {
      // Use white logo for dark theme
      logo.src = 'src/assets/images/White logo (bb).png';
    } else {
      // Use black logo for light theme
      logo.src = 'src/assets/images/black logo (wb).png';
    }
  }
  
  // Error handling for logo loading
  logo.onerror = function() {
    console.error('Error loading logo:', this.src);
    // Fallback to a simpler path if the original fails
    if (this.src.includes('black logo (wb).png')) {
      this.src = 'src/assets/images/logo-black.png';
    } else if (this.src.includes('White logo (bb).png')) {
      this.src = 'src/assets/images/logo-white.png';
    }
  };
  
  // Update logo when theme changes
  document.addEventListener('themeChange', updateLogoForTheme);
  
  // Set initial logo based on current theme
  updateLogoForTheme();
  
  // Listen for scroll events
  window.addEventListener('scroll', () => {
    // Add scrolled class to header for styling
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Initialize theme management
 */
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  if (!themeToggle) return;
  
  // Custom event for theme changes
  const themeChangeEvent = new Event('themeChange');
  
  // Function to set theme based on preference
  const setTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
    
    // Dispatch event for other components to respond
    document.dispatchEvent(themeChangeEvent);
  };
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  
  // Set dark theme by default, regardless of system preference
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme('dark');
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const imgOptions = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.1
    };
    
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.onload = () => {
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            };
          }
          
          observer.unobserve(img);
        }
      });
    }, imgOptions);
    
    // Get all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      imgObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.getAttribute('data-src');
      img.onload = () => {
        img.removeAttribute('data-src');
        img.classList.add('loaded');
      };
    });
  }
}
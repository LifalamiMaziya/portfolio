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
  // Ensure mobile menu overlay is hidden on page load
  const overlay = document.querySelector('.mobile-menu-overlay');
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
    overlay.style.zIndex = '-1';
  }

  // Initialize core functionality
  const initialize = () => {
    // Remove loading class once everything is initialized
    document.body.classList.remove('js-loading');
    
    // Feature detection and progressive enhancement
    const supportsBlobs = window.CSS && CSS.supports('filter', 'blur(30px)');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Initialize components based on browser capability
    if (supportsBlobs && !prefersReducedMotion) {
      initBlobs();
      initCustomCursor();
    }
    
    // Always initialize these components
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initContactForm();
    initMobileMenu();
    initializeLogoSwitch();
    initThemeToggle();
    
    // Add passive event listeners for better scroll performance
    addPassiveEventListeners();
    
    // Initialize performance optimizations
    initLazyLoading();
    
    console.log('Portfolio initialized successfully');
  };
  
  // Initialize with a small delay to ensure DOM is fully rendered
  setTimeout(initialize, 100);
});

/**
 * Add passive event listeners for better scroll performance
 */
function addPassiveEventListeners() {
  const supportsPassive = (function() {
    let passiveSupported = false;
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return true;
        }
      };
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    } catch(err) {
      passiveSupported = false;
    }
    return passiveSupported;
  })();
  
  const passiveOption = supportsPassive ? { passive: true } : false;
  
  // Add event listeners with passive option
  window.addEventListener('scroll', throttle(handleScroll, 100), passiveOption);
  
  // Touch events for mobile
  document.addEventListener('touchstart', handleTouchStart, passiveOption);
  document.addEventListener('touchmove', handleTouchMove, passiveOption);
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
  // Store touch position for detecting swipes/gestures
  window.touchStartX = e.changedTouches[0].screenX;
  window.touchStartY = e.changedTouches[0].screenY;
}

/**
 * Handle touch move for mobile interactions
 */
function handleTouchMove(e) {
  if (!window.touchStartX || !window.touchStartY) return;
  
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
        mobileNav.classList.remove('active');
        document.querySelector('.mobile-menu-btn').classList.remove('active');
      }
    } else {
      // Swipe right - open mobile menu if closed
      const mobileNav = document.querySelector('.nav-links:not(.active)');
      if (mobileNav && window.innerWidth < 768) {
        mobileNav.classList.add('active');
        document.querySelector('.mobile-menu-btn').classList.add('active');
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
  const header = document.querySelector('.header');
  const overlay = document.querySelector('.mobile-menu-overlay');
  
  // Return early if critical elements are missing
  if (!mobileMenuBtn || !navLinks) return;
  
  // Ensure overlay is properly hidden on page load
  if (overlay) {
    overlay.classList.remove('active');
    overlay.style.opacity = '0';
    overlay.style.visibility = 'hidden';
  }
  
  // Add index to each list item for staggered animation
  navLinks.querySelectorAll('li').forEach((item, index) => {
    item.style.setProperty('--item-index', index);
  });
  
  function openMobileMenu() {
    navLinks.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    if (overlay) {
      overlay.classList.add('active');
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
      overlay.style.zIndex = '999';
    }
  }
  
  function closeMobileMenu() {
    navLinks.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (overlay) {
      overlay.classList.remove('active');
      overlay.style.opacity = '0';
      overlay.style.visibility = 'hidden';
      overlay.style.zIndex = '-1';
    }
  }
  
  // Toggle menu when button is clicked
  mobileMenuBtn.addEventListener('click', () => {
    console.log("Mobile menu button clicked"); // Add debug log
    if (navLinks.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  // Close menu when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
  
  // Close menu when clicking navigation links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      navLinks.classList.contains('active') && 
      !navLinks.contains(e.target) && 
      !mobileMenuBtn.contains(e.target) &&
      !e.target.closest('.theme-toggle') // Don't close when clicking theme toggle
    ) {
      closeMobileMenu();
    }
  });
  
  // Close menu when pressing escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  // Close menu when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
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
  
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    setTheme(savedTheme);
  } else if (prefersDarkScheme.matches) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
  
  // Toggle theme when button is clicked
  themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  });
  
  // Listen for system preference changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches ? 'dark' : 'light');
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
/**
 * Image Optimizer - Efficient lazy loading for portfolio images
 * Provides better performance and user experience by loading images only when needed
 */

(function() {
    // Configuration
    const config = {
        threshold: 0.1,      // How much of the image needs to be visible
        rootMargin: '0px 0px 200px 0px', // Load images 200px before they appear in viewport
        imageSelector: 'img[data-src]',
        placeholderClass: 'img-placeholder',
        loadedClass: 'img-loaded',
        errorClass: 'img-error'
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', initImageOptimizer);

    /**
     * Initialize the image optimizer
     */
    function initImageOptimizer() {
        const images = document.querySelectorAll(config.imageSelector);
        
        if (images.length === 0) return;

        if ('IntersectionObserver' in window) {
            setupIntersectionObserver(images);
        } else {
            loadImagesImmediately(images);
        }
    }

    /**
     * Set up Intersection Observer for lazy loading
     * @param {NodeList} images - Collection of images to observe
     */
    function setupIntersectionObserver(images) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: config.threshold,
            rootMargin: config.rootMargin
        });

        images.forEach(image => {
            prepareImage(image);
            observer.observe(image);
        });
    }

    /**
     * Add placeholder and loading state to image
     * @param {HTMLImageElement} img - Image element to prepare
     */
    function prepareImage(img) {
        // Add placeholder class if not already present
        if (!img.classList.contains(config.placeholderClass)) {
            img.classList.add(config.placeholderClass);
        }

        // Set loading attribute for native lazy loading as fallback
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
    }

    /**
     * Load an image by setting its src to the data-src value
     * @param {HTMLImageElement} img - Image element to load
     */
    function loadImage(img) {
        // Get the image source from data-src attribute
        const src = img.dataset.src;
        
        if (!src) return;

        // Handle success and error events
        img.onload = () => handleImageLoaded(img);
        img.onerror = () => handleImageError(img);
        
        // Set the src, triggering the load
        img.src = src;
        
        // Clean up data attribute
        img.removeAttribute('data-src');
    }

    /**
     * Handle successful image load
     * @param {HTMLImageElement} img - Successfully loaded image
     */
    function handleImageLoaded(img) {
        img.classList.remove(config.placeholderClass);
        img.classList.add(config.loadedClass);
        
        // If image has a parent with .project-image, add loaded class there too
        const projectImageParent = img.closest('.project-image');
        if (projectImageParent) {
            projectImageParent.classList.add('loaded');
        }
    }

    /**
     * Handle image loading error
     * @param {HTMLImageElement} img - Image that failed to load
     */
    function handleImageError(img) {
        // Mark image with error class
        img.classList.add(config.errorClass);
        
        // Set alternative text or fallback image if available
        if (img.alt) {
            const fallbackText = document.createElement('span');
            fallbackText.className = 'img-fallback-text';
            fallbackText.textContent = img.alt;
            
            const parent = img.parentNode;
            if (parent) {
                parent.appendChild(fallbackText);
            }
        }
        
        console.warn('Failed to load image:', img.dataset.src || img.src);
    }

    /**
     * Fallback: load all images immediately for browsers without IntersectionObserver
     * @param {NodeList} images - Collection of images to load
     */
    function loadImagesImmediately(images) {
        images.forEach(img => {
            loadImage(img);
        });
    }
})();

/**
 * Image optimization and handling for better performance
 * - Implements lazy loading with IntersectionObserver
 * - Provides fallback for unsupported browsers
 * - Adds WebP support detection
 * - Handles responsive image loading
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if browser supports WebP
  checkWebpSupport()
    .then(supportsWebp => {
      if (supportsWebp) {
        document.documentElement.classList.add('webp-support');
      }
    })
    .catch(() => {
      console.warn('Could not determine WebP support');
    });

  // Initialize image optimization
  initImageOptimizer();
  
  // Add blur-up effect for image loading
  addImageLoadingEffects();
});

/**
 * Check WebP support
 */
function checkWebpSupport() {
  return new Promise((resolve) => {
    const webpImage = new Image();
    
    webpImage.onload = function() {
      // If image loads successfully, WebP is supported
      resolve(this.width === 1);
    };
    
    webpImage.onerror = function() {
      // If error occurs, WebP is not supported
      resolve(false);
    };
    
    // Base64 representation of a WebP image (1x1 pixel)
    webpImage.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
  });
}

/**
 * Add loading effect to images
 */
function addImageLoadingEffects() {
  // Add CSS for image loading effects
  const style = document.createElement('style');
  style.innerHTML = `
    .img-placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #f0f0f0;
      z-index: 1;
    }
    
    img.loading {
      opacity: 0;
    }
    
    img.loaded {
      opacity: 1;
      transition: opacity 0.5s ease-in-out;
      z-index: 2;
      position: relative;
    }
    
    .placeholder-applied {
      background-color: transparent;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Set source for responsive images
 * Can be called with a media query to change image source based on screen size
 */
function setResponsiveImageSource(img, src, mediaQuery) {
  if (!mediaQuery || window.matchMedia(mediaQuery).matches) {
    img.src = src;
  }
}

// Export functions for use in other scripts
window.imageOptimizer = {
  checkWebpSupport,
  setResponsiveImageSource
}; 
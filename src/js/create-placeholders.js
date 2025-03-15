/**
 * Project Placeholder Generator
 * Creates professional looking placeholder images for portfolio projects
 */

(function() {
    // Configuration
    const config = {
        projects: [
            {
                name: 'Mpumalanga Tourism Portal',
                folder: 'mpumalanga-tourism',
                bgColor: '#3498db',
                textColor: '#ffffff',
                technologies: ['React', 'Node.js', 'MongoDB', 'MapBox API']
            },
            {
                name: 'AgriConnect Platform',
                folder: 'agri-connect',
                bgColor: '#27ae60',
                textColor: '#ffffff',
                technologies: ['Vue.js', 'Express', 'PostgreSQL', 'PWA']
            },
            {
                name: 'Nelspruit Medical Center',
                folder: 'nelspruit-medical',
                bgColor: '#e74c3c',
                textColor: '#ffffff',
                technologies: ['Next.js', 'TypeScript', 'Firebase', 'WebRTC']
            },
            {
                name: 'Eswatini Crafts Marketplace',
                folder: 'eswatini-crafts',
                bgColor: '#9b59b6',
                textColor: '#ffffff',
                technologies: ['Svelte', 'Node.js', 'Stripe', 'i18n']
            }
        ],
        width: 1200,
        height: 630,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);

    /**
     * Initialize the placeholder generator
     */
    function init() {
        // Create container for results
        const resultsContainer = document.createElement('div');
        resultsContainer.style.display = 'flex';
        resultsContainer.style.flexDirection = 'column';
        resultsContainer.style.gap = '30px';
        document.body.appendChild(resultsContainer);

        // Generate placeholders for each project
        config.projects.forEach(project => {
            generatePlaceholder(project, resultsContainer);
        });
    }

    /**
     * Generate a placeholder image for a project
     * @param {Object} project - Project configuration
     * @param {HTMLElement} container - DOM container to append result
     */
    function generatePlaceholder(project, container) {
        // Create a wrapper for this project's result
        const wrapper = document.createElement('div');
        wrapper.style.background = '#fff';
        wrapper.style.borderRadius = '8px';
        wrapper.style.padding = '20px';
        wrapper.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        container.appendChild(wrapper);

        // Create title for this project
        const title = document.createElement('h2');
        title.textContent = project.name;
        title.style.marginTop = '0';
        wrapper.appendChild(title);

        // Create canvas
    const canvas = document.createElement('canvas');
        canvas.width = config.width;
        canvas.height = config.height;
        canvas.style.maxWidth = '100%';
        canvas.style.height = 'auto';
        canvas.style.display = 'block';
        canvas.style.marginBottom = '15px';
    canvas.style.border = '1px solid #ddd';
        wrapper.appendChild(canvas);
    
        // Get canvas context and draw the placeholder
    const ctx = canvas.getContext('2d');
        drawPlaceholder(ctx, project);
    
    // Add download link
    const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'screenshot.png';
        downloadLink.textContent = `Download ${project.name} Placeholder`;
        downloadLink.className = 'download-link';
        downloadLink.style.display = 'inline-block';
        downloadLink.style.padding = '10px 15px';
        downloadLink.style.background = '#3498db';
        downloadLink.style.color = '#fff';
    downloadLink.style.textDecoration = 'none';
        downloadLink.style.borderRadius = '4px';
    downloadLink.style.fontWeight = 'bold';
        wrapper.appendChild(downloadLink);

        // Add instruction
        const instruction = document.createElement('p');
        instruction.innerHTML = `Save this image to <code>projects/${project.folder}/screenshot.png</code>`;
        instruction.style.marginTop = '10px';
        instruction.style.fontSize = '14px';
        instruction.style.color = '#666';
        wrapper.appendChild(instruction);
    }

    /**
     * Draw the placeholder image on the canvas
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {Object} project - Project configuration
     */
    function drawPlaceholder(ctx, project) {
        const { width, height } = config;
        
        // Fill background
        ctx.fillStyle = project.bgColor;
        ctx.fillRect(0, 0, width, height);
        
        // Add pattern
        drawPattern(ctx, width, height, project.bgColor);
        
        // Add project name
        ctx.fillStyle = project.textColor;
        ctx.font = 'bold 60px ' + config.fontFamily;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(project.name, width / 2, height / 2 - 50);
        
        // Add technologies
        ctx.font = '30px ' + config.fontFamily;
        const techText = project.technologies.join(' • ');
        ctx.fillText(techText, width / 2, height / 2 + 30);
        
        // Add watermark
        ctx.font = '24px ' + config.fontFamily;
        ctx.fillStyle = adjustColor(project.textColor, -30);
        ctx.textAlign = 'right';
        ctx.textBaseline = 'bottom';
        ctx.fillText('Lifalami Maziya • maziya.dev', width - 30, height - 30);
    }

    /**
     * Draw a subtle pattern on the background
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {number} width - Canvas width
     * @param {number} height - Canvas height
     * @param {string} baseColor - Base background color
     */
    function drawPattern(ctx, width, height, baseColor) {
        // Save the current context state
        ctx.save();
        
        // Create a lighter color for the pattern
        const patternColor = adjustColor(baseColor, 20);
        ctx.fillStyle = patternColor;
        
        // Create a grid pattern
        const gridSize = 40;
        const dotSize = 3;
        
        // Draw dots
        for (let x = gridSize; x < width; x += gridSize) {
            for (let y = gridSize; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.arc(x, y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Restore the context
        ctx.restore();
    }

    /**
     * Adjust a hex color by the given amount
     * @param {string} color - Hex color
     * @param {number} amount - Amount to adjust (-255 to 255)
     * @returns {string} - Adjusted hex color
     */
  function adjustColor(color, amount) {
        // Remove # if present
        color = color.replace('#', '');
        
        // Parse the color
        let r = parseInt(color.substring(0, 2), 16);
        let g = parseInt(color.substring(2, 4), 16);
        let b = parseInt(color.substring(4, 6), 16);
        
        // Adjust the values
    r = Math.max(0, Math.min(255, r + amount));
    g = Math.max(0, Math.min(255, g + amount));
    b = Math.max(0, Math.min(255, b + amount));
    
    // Convert back to hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
})(); 
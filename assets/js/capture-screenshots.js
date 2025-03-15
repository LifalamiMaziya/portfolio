// Screenshot capture utility
document.addEventListener('DOMContentLoaded', function() {
  // Only run this on the actual project pages
  const projectPath = window.location.pathname;
  const isProjectPage = projectPath.includes('/projects/');
  
  if (!isProjectPage) return;
  
  // Wait for page to fully render
  setTimeout(() => {
    captureScreenshot();
  }, 1000);
  
  function captureScreenshot() {
    // This would typically use html2canvas or a similar library
    // For this demo, we'll create a notification
    const screenshotNotification = document.createElement('div');
    screenshotNotification.style.position = 'fixed';
    screenshotNotification.style.bottom = '20px';
    screenshotNotification.style.right = '20px';
    screenshotNotification.style.background = 'rgba(0,0,0,0.8)';
    screenshotNotification.style.color = 'white';
    screenshotNotification.style.padding = '10px 20px';
    screenshotNotification.style.borderRadius = '5px';
    screenshotNotification.style.zIndex = '9999';
    screenshotNotification.textContent = 'Screenshot captured for portfolio thumbnail';
    
    document.body.appendChild(screenshotNotification);
    
    setTimeout(() => {
      screenshotNotification.style.opacity = '0';
      screenshotNotification.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        document.body.removeChild(screenshotNotification);
      }, 500);
    }, 3000);
    
    // In a real implementation, this would save the image to the server
    console.log('Screenshot captured for: ' + projectPath);
  }
}); 
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
  
          // Update URL without triggering page reload
          history.pushState(null, null, targetId);
        }
      });
    });
  
    // Add external link target="_blank" if not already set
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.hasAttribute('target')) {
        link.setAttribute('target', '_blank');
      }
      if (!link.hasAttribute('rel')) {
        link.setAttribute('rel', 'noopener');
      }
    });
  });
  
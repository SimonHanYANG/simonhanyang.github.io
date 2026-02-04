document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  
  // Mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', function() {
      mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });

        // Update URL without page reload
        history.pushState(null, null, targetId);
      }
    });
  });

  // Publications pagination - wait a bit for everything to load
  setTimeout(initPublicationsPagination, 100);
});

function initPublicationsPagination() {
  console.log('Initializing publications pagination...');
  
  const publicationsPerPage = 5;
  let currentPage = 1;
  
  const publicationsContainer = document.querySelector('.publications-container');
  
  if (!publicationsContainer) {
    console.error('ERROR: .publications-container not found!');
    console.log('Available elements:', document.querySelectorAll('*[class*="publication"]'));
    return;
  }
  
  console.log('Container found:', publicationsContainer);

  const publicationCards = publicationsContainer.querySelectorAll('.publication-card');
  const totalPublications = publicationCards.length;
  
  console.log('Total publications found:', totalPublications);
  
  if (totalPublications === 0) {
    console.error('ERROR: No .publication-card elements found inside .publications-container');
    return;
  }
  
  const totalPages = Math.ceil(totalPublications / publicationsPerPage);
  console.log('Total pages:', totalPages);

  // Create pagination controls
  const paginationDiv = document.createElement('div');
  paginationDiv.className = 'pagination-controls';
  paginationDiv.innerHTML = `
    <button class="pagination-button" id="prevPage">Previous</button>
    <span class="pagination-info">
      Page <span id="currentPageNum">1</span> of <span id="totalPagesNum">${totalPages}</span>
    </span>
    <button class="pagination-button" id="nextPage">Next</button>
  `;
  publicationsContainer.appendChild(paginationDiv);
  console.log('Pagination controls added');

  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  const currentPageNum = document.getElementById('currentPageNum');

  function showPage(page) {
    console.log('Showing page:', page);
    currentPage = page;
    currentPageNum.textContent = page;

    // Hide all publications
    publicationCards.forEach((card, index) => {
      card.classList.add('hidden');
      card.style.display = 'none'; // Force hide
    });

    // Show publications for current page
    const startIndex = (page - 1) * publicationsPerPage;
    const endIndex = Math.min(startIndex + publicationsPerPage, totalPublications);

    console.log(`Showing cards from ${startIndex} to ${endIndex - 1}`);
    
    for (let i = startIndex; i < endIndex; i++) {
      publicationCards[i].classList.remove('hidden');
      publicationCards[i].style.display = ''; // Remove inline display
    }

    // Update button states
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;

    // Scroll to publications section
    if (page !== 1) {
      const publicationsSection = document.getElementById('publications');
      if (publicationsSection) {
        setTimeout(() => {
          publicationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  prevButton.addEventListener('click', function() {
    console.log('Previous button clicked');
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextButton.addEventListener('click', function() {
    console.log('Next button clicked');
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  // Show first page initially
  console.log('Showing initial page...');
  showPage(1);
}
document.addEventListener('DOMContentLoaded', function() {
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

  // Publications pagination
  initPublicationsPagination();
});

function initPublicationsPagination() {
  const publicationsPerPage = 5;
  let currentPage = 1;
  
  const publicationsContainer = document.querySelector('.publications-container');
  if (!publicationsContainer) {
    console.warn('Publications container not found');
    return;
  }

  const publicationCards = publicationsContainer.querySelectorAll('.publication-card');
  const totalPublications = publicationCards.length;
  const totalPages = Math.ceil(totalPublications / publicationsPerPage);

  if (totalPublications === 0) {
    console.warn('No publication cards found');
    return;
  }

  console.log(`Found ${totalPublications} publications, creating ${totalPages} pages`);

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

  const prevButton = document.getElementById('prevPage');
  const nextButton = document.getElementById('nextPage');
  const currentPageNum = document.getElementById('currentPageNum');

  function showPage(page) {
    currentPage = page;
    currentPageNum.textContent = page;

    // Hide all publications
    publicationCards.forEach(card => {
      card.classList.add('hidden');
    });

    // Show publications for current page
    const startIndex = (page - 1) * publicationsPerPage;
    const endIndex = Math.min(startIndex + publicationsPerPage, totalPublications);

    for (let i = startIndex; i < endIndex; i++) {
      publicationCards[i].classList.remove('hidden');
    }

    // Update button states
    prevButton.disabled = page === 1;
    nextButton.disabled = page === totalPages;

    // Scroll to publications section
    const publicationsSection = document.getElementById('publications');
    if (publicationsSection && page !== 1) {
      setTimeout(() => {
        publicationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  prevButton.addEventListener('click', function() {
    if (currentPage > 1) {
      showPage(currentPage - 1);
    }
  });

  nextButton.addEventListener('click', function() {
    if (currentPage < totalPages) {
      showPage(currentPage + 1);
    }
  });

  // Show first page initially
  showPage(1);
}
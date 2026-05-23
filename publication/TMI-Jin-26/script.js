document.addEventListener('DOMContentLoaded', function() {
    // Handle citation copy button
    const copyButton = document.getElementById('copy-citation');
    if (copyButton) {
      copyButton.addEventListener('click', function() {
        const citationText = document.querySelector('.citation-box pre').innerText;
        navigator.clipboard.writeText(citationText)
          .then(() => {
            const originalText = copyButton.innerText;
            copyButton.innerText = 'Copied!';
            setTimeout(() => {
              copyButton.innerText = originalText;
            }, 2000);
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
            alert('Failed to copy citation. Please select and copy manually.');
          });
      });
    }
  });

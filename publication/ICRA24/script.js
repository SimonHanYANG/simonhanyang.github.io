/*
 * @Author: SimonHanYANG SimonCK666@mail.163.com
 * @Date: 2025-03-18 11:36:39
 * @LastEditors: SimonHanYANG SimonCK666@mail.163.com
 * @LastEditTime: 2025-03-18 11:36:47
 * @FilePath: \yifei-basic-clone\publication\diffavatar\script.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
document.addEventListener('DOMContentLoaded', function() {
    // Handle citation copy button
    const copyButton = document.getElementById('copy-citation');
    if (copyButton) {
      copyButton.addEventListener('click', function() {
        const citationText = document.querySelector('.citation-box pre').innerText;
        navigator.clipboard.writeText(citationText)
          .then(() => {
            // Change button text temporarily to indicate success
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
  
    // Add mobile menu toggle functionality if needed in the future
    // For now the mobile menu is just hidden on smaller screens
  });
  
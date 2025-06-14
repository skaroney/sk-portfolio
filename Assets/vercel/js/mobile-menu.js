    document.addEventListener('DOMContentLoaded', function() {
      const menuToggler = document.getElementById('menuToggler');
      const mobileMenu = document.getElementById('mobileMenu');
      const menuBackdrop = document.getElementById('menuBackdrop');
      
      menuToggler.addEventListener('click', function() {
        // Toggle menu visibility
        mobileMenu.classList.toggle('show');
        menuBackdrop.classList.toggle('show');
        menuToggler.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (mobileMenu.classList.contains('show')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });
      
      // Close menu when clicking on backdrop
      menuBackdrop.addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        menuBackdrop.classList.remove('show');
        menuToggler.classList.remove('active');
        document.body.style.overflow = '';
      });
      
      // Close menu when clicking on a link (optional)
      const menuLinks = document.querySelectorAll('.mobile-menu a');
      menuLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('show');
          menuBackdrop.classList.remove('show');
          menuToggler.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    });
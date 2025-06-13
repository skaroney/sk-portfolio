document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle elements
    const lightBtn = document.getElementById('light-btn');
    const darkBtn = document.getElementById('dark-btn');
    const body = document.body;

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            darkBtn.classList.add('active-theme'); // Changed to match your later function
            lightBtn.classList.remove('active-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            lightBtn.classList.add('active-theme');
            darkBtn.classList.remove('active-theme');
            localStorage.setItem('theme', 'light');
        }
    }

    // Event listeners for theme buttons
    lightBtn.addEventListener('click', () => {
        setTheme('light');
        switchActiveTheme(lightBtn); // Sync UI button states
    });
    
    darkBtn.addEventListener('click', () => {
        setTheme('dark');
        switchActiveTheme(darkBtn); // Sync UI button states
    });

    // Initialize theme from localStorage (or default to light)
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Set initial active button (important for visual feedback)
    if (savedTheme === 'dark') {
        darkBtn.classList.add('active-theme');
    } else {
        lightBtn.classList.add('active-theme');
    }

    // Your existing function to handle button active states
    function switchActiveTheme(clickedBtn) {
        lightBtn.classList.remove('active-theme');
        darkBtn.classList.remove('active-theme');
        clickedBtn.classList.add('active-theme');
    }



    // Sidebar & mobile nav active link highlight + smooth scroll
    function handleNavLinks(selector) {
      document.querySelectorAll(selector).forEach(link => {
        link.addEventListener('click', function(e) {
          // For anchor links
          if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            // Highlight active
            document.querySelectorAll(selector).forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            // Smooth scroll
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            // Collapse mobile nav
            if (selector === '#mobileNav .nav-link') {
              const navbar = document.getElementById('mobileNavbar');
              if (navbar.classList.contains('show')) {
                new bootstrap.Collapse(navbar).hide();
              }
            }
          }
        });
      });
    }
    handleNavLinks('#sidebarMenu .nav-link');

// Mobile Nav

  const menuToggler = document.getElementById('menuToggler');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuItems = document.querySelectorAll('.mobile-menu li');
  let currentActiveIndex = 0;

  // Set first item as active by default
  setActiveItem(0);

  // Toggle menu
  menuToggler.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking overlay
  menuOverlay.addEventListener('click', () => {
    closeMenu();
  });

  // Handle menu item clicks
  menuItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      setActiveItem(index);
      closeMenu();
      
      // For demo purposes - simulate navigation
      console.log(`Navigating to: ${item.textContent.trim()}`);
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && e.target !== menuToggler) {
      closeMenu();
    }
  });

  // Close menu on scroll
  window.addEventListener('scroll', () => {
    closeMenu();
  }, { passive: true });

  function toggleMenu() {
    menuToggler.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
  }

  function closeMenu() {
    menuToggler.classList.remove('active');
    mobileMenu.classList.remove('active');
    menuOverlay.classList.remove('active');
  }

  function setActiveItem(index) {
    // Remove active class from all items
    menuItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to selected item
    menuItems[index].classList.add('active');
    currentActiveIndex = index;
  }

  // Optional: Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (mobileMenu.classList.contains('active')) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentActiveIndex + 1) % menuItems.length;
        setActiveItem(nextIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentActiveIndex - 1 + menuItems.length) % menuItems.length;
        setActiveItem(prevIndex);
      } else if (e.key === 'Enter' && currentActiveIndex >= 0) {
        menuItems[currentActiveIndex].click();
      }
    }
  });



      // Sidebar navigation functionality
      const navLinks = document.querySelectorAll('#sidebar .nav-link');
      const sections = document.querySelectorAll('section');

      // Function to update active navigation link
      function updateActiveNav() {
        let currentSection = '';
        
        // Find which section is currently in view
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (window.pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
          }
        });

        // Update active state in navigation
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
          }
        });
      }

      // Handle click events on nav links
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Remove active class from all links
          navLinks.forEach(l => l.classList.remove('active'));
          
          // Add active class to clicked link
          this.classList.add('active');
          
          // Smooth scroll to target
          const targetId = this.getAttribute('href');
          if (targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth'
              });
            }
          }
        });
      });

      // Update active nav on scroll with debounce
      let scrollTimeout;
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 100);
      });

      // Initialize active nav on load
      updateActiveNav();


      // Function to switch active theme
      function switchActiveTheme(clickedBtn) {
        // Remove active class from both buttons first
        lightBtn.classList.remove('active-theme');
        darkBtn.classList.remove('active-theme');
        
        // Add active class to the clicked button
        clickedBtn.classList.add('active-theme');
      }
      
      // Add click event listeners
      lightBtn.addEventListener('click', function() {
        switchActiveTheme(lightBtn);
        // Add your light theme logic here
      });
      
      darkBtn.addEventListener('click', function() {
        switchActiveTheme(darkBtn);
        // Add your dark theme logic here
      });

      
    });
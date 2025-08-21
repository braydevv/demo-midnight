/**
 * Sidebar functionality for Midnight Portal
 * Handles sidebar interactions, active states, and position toggling
 */
class MidnightSidebar {
  constructor() {
    this.sidebarPosition = localStorage.getItem('sidebar-position') || 'left';
    this.accentColor = localStorage.getItem('accent-color') || 'blue';
    this.bgColor = localStorage.getItem('bg-color') || '#0a0a0a';
    this.particleType = localStorage.getItem('particle-type') || 'rain';
    this.particleCount = localStorage.getItem('particle-count') || 150;
    this.animationSpeed = localStorage.getItem('animation-speed') || 1;
    
    // Apply saved settings
    this.applySidebarPosition();
    this.applyAccentColor();
    this.applyBackgroundColor();
    
    // Set active nav item based on current page
    this.setActiveNavItem();
    
    // Add event listeners
    document.addEventListener('DOMContentLoaded', () => {
      this.addEventListeners();
    });
  }
  
  applySidebarPosition() {
    if (this.sidebarPosition === 'right') {
      document.body.classList.add('sidebar-right');
    } else {
      document.body.classList.remove('sidebar-right');
    }
  }
  
  applyAccentColor() {
    document.documentElement.style.setProperty('--midnight-blue', this.getColorValue(this.accentColor));
    
    // Update particle color if particles are initialized
    if (window.midnightParticles) {
      window.midnightParticles.setColor(this.getColorValue(this.accentColor));
    }
  }
  
  applyBackgroundColor() {
    document.body.style.backgroundColor = this.bgColor;
    
    // Update background gradient
    const gradientColor = this.accentColor === 'blue' ? 'rgba(0, 102, 255, 0.1)' : 
                         this.accentColor === 'purple' ? 'rgba(102, 0, 255, 0.1)' : 
                         'rgba(0, 204, 102, 0.1)';
    document.body.style.backgroundImage = `radial-gradient(circle at top right, ${gradientColor}, transparent 70%)`;
  }
  
  getColorValue(color) {
    const colors = {
      'blue': '#0066ff',
      'purple': '#6600ff',
      'green': '#00cc66'
    };
    
    return colors[color] || colors.blue;
  }
  
  setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove all active classes
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Map pages to nav items
    const pageMap = {
      'index.html': 'nav-home',
      'g.html': 'nav-games',
      'a.html': 'nav-apps',
      'p.html': 'nav-proxy',
      's.html': 'nav-settings'
    };
    
    // Set active class
    const activeNavId = pageMap[currentPage];
    if (activeNavId) {
      const activeNav = document.getElementById(activeNavId);
      if (activeNav) {
        activeNav.classList.add('active');
      }
    }
  }
  
  addEventListeners() {
    // Toggle sidebar position
    const sidebarToggle = document.getElementById('sidebar-position-toggle');
    if (sidebarToggle) {
      sidebarToggle.addEventListener('change', (e) => {
        this.sidebarPosition = e.target.checked ? 'right' : 'left';
        localStorage.setItem('sidebar-position', this.sidebarPosition);
        this.applySidebarPosition();
      });
      
      // Set initial state
      sidebarToggle.checked = this.sidebarPosition === 'right';
    }
    
    // Accent color switcher
    document.querySelectorAll('.color-option').forEach(option => {
      option.addEventListener('click', (e) => {
        const color = e.currentTarget.dataset.color;
        const bgColor = e.currentTarget.dataset.bg;
        this.accentColor = color;
        this.bgColor = bgColor;
        localStorage.setItem('accent-color', color);
        localStorage.setItem('bg-color', bgColor);
        this.applyAccentColor();
        this.applyBackgroundColor();
        
        // Update active state
        document.querySelectorAll('.color-option').forEach(opt => {
          opt.classList.remove('active');
        });
        e.currentTarget.classList.add('active');
      });
      
      // Set initial active state
      if (option.dataset.color === this.accentColor) {
        option.classList.add('active');
      }
    });
    
    // Particle type
    document.querySelectorAll('.particle-type').forEach(type => {
      type.addEventListener('click', () => {
        const particleType = type.getAttribute('data-type');
        this.particleType = particleType;
        localStorage.setItem('particle-type', particleType);
        
        if (window.midnightParticles) {
          window.midnightParticles.setType(particleType);
        }
        
        // Update active state
        document.querySelectorAll('.particle-type').forEach(t => {
          t.classList.remove('active');
        });
        type.classList.add('active');
      });
      
      // Set initial active state
      if (type.getAttribute('data-type') === this.particleType) {
        type.classList.add('active');
      }
    });
    
    // Particle count
    const particleCount = document.getElementById('particle-count');
    if (particleCount) {
      particleCount.addEventListener('input', (e) => {
        const count = parseInt(e.target.value);
        this.particleCount = count;
        localStorage.setItem('particle-count', count);
        
        if (window.midnightParticles) {
          window.midnightParticles.setCount(count);
        }
      });
      
      // Set initial value
      particleCount.value = this.particleCount;
    }
    
    // Animation speed
    const animationSpeed = document.getElementById('animation-speed');
    if (animationSpeed) {
      animationSpeed.addEventListener('input', (e) => {
        const speed = e.target.value;
        this.animationSpeed = speed;
        localStorage.setItem('animation-speed', speed);
        
        document.documentElement.style.setProperty('--transition-speed', speed * 0.3 + 's');
        
        if (window.midnightParticles) {
          window.midnightParticles.setSpeed(parseFloat(speed));
        }
      });
      
      // Set initial value
      animationSpeed.value = this.animationSpeed;
      document.documentElement.style.setProperty('--transition-speed', this.animationSpeed * 0.3 + 's');
    }
    
    // Panic button
    const panicButton = document.getElementById('panic-button');
    if (panicButton) {
      panicButton.addEventListener('click', () => {
        window.location.href = 'https://google.com';
      });
    }
  }
  
  // Method to handle page transitions
  static transitionToPage(href) {
    document.querySelector('.container').style.opacity = 0;
    
    setTimeout(() => {
      window.location.href = href;
    }, 300);
    
    return false;
  }
}

// Initialize sidebar
const midnightSidebar = new MidnightSidebar();

// Add page transition effect
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.container').style.opacity = 0;
  
  setTimeout(() => {
    document.querySelector('.container').style.opacity = 1;
  }, 100);
  
  // Add click handlers to navigation links
  document.querySelectorAll('.nav-item').forEach(item => {
    const link = item.getAttribute('href');
    if (link && !link.startsWith('#')) {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        MidnightSidebar.transitionToPage(link);
      });
    }
  });
  
  // Initialize particles with saved settings
  if (window.midnightParticles) {
    const particleType = localStorage.getItem('particle-type') || 'rain';
    const particleCount = localStorage.getItem('particle-count') || 150;
    const animationSpeed = localStorage.getItem('animation-speed') || 1;
    const accentColor = localStorage.getItem('accent-color') || 'blue';
    
    // Get color value
    const colors = {
      'blue': '#0066ff',
      'purple': '#6600ff',
      'green': '#00cc66'
    };
    const colorValue = colors[accentColor] || colors.blue;
    
    window.midnightParticles.setType(particleType);
    window.midnightParticles.setCount(parseInt(particleCount));
    window.midnightParticles.setSpeed(parseFloat(animationSpeed));
    window.midnightParticles.setColor(colorValue);
  }
});

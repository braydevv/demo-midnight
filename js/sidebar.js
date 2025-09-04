/**
 * Midnight - Sidebar Management
 */

class SidebarManager {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.content = document.querySelector('.content');
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Set active nav item based on current page
    this.setActiveNavItem();
    
    // Initialize popups
    this.initPopups();
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Keyboard shortcut ([ ] or Ctrl+B)
    document.addEventListener('keydown', (e) => {
      if (e.key === ']' || (e.ctrlKey && e.key === 'b')) {
        this.sidebar.classList.toggle('force-expanded');
        e.preventDefault();
      }
    });
    
    // Hover effect for sidebar
    this.sidebar.addEventListener('mouseenter', () => {
      this.content.classList.add('blurred');
    });
    
    this.sidebar.addEventListener('mouseleave', () => {
      this.content.classList.remove('blurred');
    });
  }
  
  /**
   * Set active nav item based on current page
   */
  setActiveNavItem() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.sidebar-nav-item');
    
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link && (link.getAttribute('href') === currentPage || 
          (currentPage === 'index.html' && link.getAttribute('href') === '/'))) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
  
  /**
   * Initialize popups
   */
  initPopups() {
    // Get popup elements
    const extraBtn = document.getElementById('extra-btn');
    const linksBtn = document.getElementById('links-btn');
    const discordBtn = document.getElementById('discord-btn');
    
    const extraPopup = document.getElementById('extra-popup');
    const linksPopup = document.getElementById('links-popup');
    const discordPopup = document.getElementById('discord-popup');
    
    const popupOverlay = document.getElementById('popup-overlay');
    const closeButtons = document.querySelectorAll('.popup-close');
    
    // Show popup function
    const showPopup = (popup) => {
      popup.classList.add('active');
      popupOverlay.classList.add('active');
    };
    
    // Hide all popups function
    const hideAllPopups = () => {
      document.querySelectorAll('.popup').forEach(popup => {
        popup.classList.remove('active');
      });
      popupOverlay.classList.remove('active');
    };
    
    // Add event listeners
    if (extraBtn) {
      extraBtn.addEventListener('click', () => showPopup(extraPopup));
    }
    
    if (linksBtn) {
      linksBtn.addEventListener('click', () => showPopup(linksPopup));
    }
    
    if (discordBtn) {
      discordBtn.addEventListener('click', () => showPopup(discordPopup));
    }
    
    // Close buttons
    closeButtons.forEach(button => {
      button.addEventListener('click', hideAllPopups);
    });
    
    // Overlay click
    if (popupOverlay) {
      popupOverlay.addEventListener('click', hideAllPopups);
    }
    
    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideAllPopups();
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sidebarManager = new SidebarManager();
});

/**
 * Midnight - Sidebar Management
 */

class SidebarManager {
  constructor() {
    this.sidebar = document.querySelector('.sidebar');
    this.content = document.querySelector('.content');
    this.toggle = document.querySelector('.sidebar-toggle');
    
    // Load saved state
    this.expanded = this.loadState();
    
    // Initialize sidebar state
    this.updateSidebarState();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Set active nav item based on current page
    this.setActiveNavItem();
  }
  
  /**
   * Load sidebar state from localStorage
   */
  loadState() {
    return localStorage.getItem('midnight_sidebar_expanded') === 'true';
  }
  
  /**
   * Save sidebar state to localStorage
   */
  saveState() {
    localStorage.setItem('midnight_sidebar_expanded', this.expanded);
  }
  
  /**
   * Update sidebar visual state
   */
  updateSidebarState() {
    if (this.expanded) {
      this.sidebar.classList.add('expanded');
      this.content.classList.add('sidebar-expanded');
      this.content.classList.add('blurred');
    } else {
      this.sidebar.classList.remove('expanded');
      this.content.classList.remove('sidebar-expanded');
      this.content.classList.remove('blurred');
    }
  }
  
  /**
   * Toggle sidebar expanded state
   */
  toggleSidebar() {
    this.expanded = !this.expanded;
    this.updateSidebarState();
    this.saveState();
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Toggle button click
    if (this.toggle) {
      this.toggle.addEventListener('click', () => this.toggleSidebar());
    }
    
    // Keyboard shortcut ([ ] or Ctrl+B)
    document.addEventListener('keydown', (e) => {
      if (e.key === ']' || (e.ctrlKey && e.key === 'b')) {
        this.toggleSidebar();
        e.preventDefault();
      }
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.sidebarManager = new SidebarManager();
});

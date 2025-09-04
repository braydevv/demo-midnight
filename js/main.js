/**
 * Midnight - Main JavaScript
 */

class MidnightApp {
  constructor() {
    // Initialize components
    this.initComponents();
    
    // Initialize event listeners
    this.setupEventListeners();
    
    // Initialize recent items tracking
    this.initRecentItems();
  }
  
  /**
   * Initialize components by loading HTML fragments
   */
  async initComponents() {
    // Load sidebar
    await this.loadComponent('.sidebar-container', 'components/sidebar.html');
    
    // Load header
    await this.loadComponent('.header-container', 'components/header.html');
    
    // Initialize managers after components are loaded
    this.initManagers();
  }
  
  /**
   * Load HTML component into container
   */
  async loadComponent(containerSelector, componentPath) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    try {
      const response = await fetch(componentPath);
      const html = await response.text();
      container.innerHTML = html;
    } catch (error) {
      console.error(`Error loading component ${componentPath}:`, error);
    }
  }
  
  /**
   * Initialize managers after components are loaded
   */
  initManagers() {
    // Theme manager is initialized in theme.js
    // Wallpaper manager is initialized in wallpaper.js
    
    // Initialize sidebar manager
    if (typeof SidebarManager !== 'undefined') {
      window.sidebarManager = new SidebarManager();
    }
    
    // Initialize header manager
    if (typeof HeaderManager !== 'undefined') {
      window.headerManager = new HeaderManager();
    }
  }
  
  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Track page visits for recent items
    this.trackPageVisit();
  }
  
  /**
   * Initialize recent items tracking
   */
  initRecentItems() {
    // Load recent items from localStorage
    this.recentItems = this.loadRecentItems();
  }
  
  /**
   * Load recent items from localStorage
   */
  loadRecentItems() {
    const saved = localStorage.getItem('midnight_recent_items');
    return saved ? JSON.parse(saved) : [];
  }
  
  /**
   * Save recent items to localStorage
   */
  saveRecentItems() {
    localStorage.setItem('midnight_recent_items', JSON.stringify(this.recentItems));
  }
  
  /**
   * Track page visit for recent items
   */
  trackPageVisit() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Skip tracking for index page
    if (currentPage === 'index.html' || currentPage === '') return;
    
    // Get page info
    const pageInfo = this.getPageInfo(currentPage);
    if (!pageInfo) return;
    
    // Remove if already exists
    this.recentItems = this.recentItems.filter(item => item.url !== currentPage);
    
    // Add to beginning of array
    this.recentItems.unshift(pageInfo);
    
    // Limit to 6 items
    if (this.recentItems.length > 6) {
      this.recentItems = this.recentItems.slice(0, 6);
    }
    
    // Save to localStorage
    this.saveRecentItems();
  }
  
  /**
   * Get page info based on URL
   */
  getPageInfo(url) {
    let title = '';
    let icon = '';
    
    switch (url) {
      case 'g.html':
        title = 'games';
        icon = 'fa-gamepad';
        break;
      case 'a.html':
        title = 'apps';
        icon = 'fa-th-large';
        break;
      case 'p.html':
        title = 'proxy';
        icon = 'fa-globe';
        break;
      case 'ai.html':
        title = 'cloudai';
        icon = 'fa-robot';
        break;
      case 'vm.html':
        title = 'browser vm';
        icon = 'fa-desktop';
        break;
      case 'm.html':
        title = 'movies';
        icon = 'fa-film';
        break;
      case 's.html':
        title = 'settings';
        icon = 'fa-gear';
        break;
      default:
        return null;
    }
    
    return {
      title,
      icon,
      url,
      timestamp: Date.now()
    };
  }
  
  /**
   * Get recent items
   */
  getRecentItems() {
    return this.recentItems;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.midnightApp = new MidnightApp();
});

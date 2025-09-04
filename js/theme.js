/**
 * Midnight - Theme Management
 */

class ThemeManager {
  constructor() {
    this.themes = [
      'deep-blue',
      'midnight-neon',
      'slate',
      'aqua-haze'
    ];
    
    this.defaultTheme = 'deep-blue';
    this.currentTheme = this.loadTheme();
    
    // Page-specific themes
    this.pageThemes = this.loadPageThemes();
    
    // Theme transition overlay
    this.createTransitionOverlay();
    
    // Apply theme on load
    this.applyTheme(this.getCurrentPageTheme());
  }
  
  /**
   * Create transition overlay for smooth theme changes
   */
  createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
    document.body.appendChild(overlay);
    this.overlay = overlay;
  }
  
  /**
   * Get current page identifier
   */
  getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
  }
  
  /**
   * Get theme for current page
   */
  getCurrentPageTheme() {
    const page = this.getCurrentPage();
    return this.pageThemes[page] || this.currentTheme;
  }
  
  /**
   * Load global theme from localStorage
   */
  loadTheme() {
    return localStorage.getItem('midnight_theme') || this.defaultTheme;
  }
  
  /**
   * Load page-specific themes from localStorage
   */
  loadPageThemes() {
    const saved = localStorage.getItem('midnight_page_themes');
    return saved ? JSON.parse(saved) : {};
  }
  
  /**
   * Save global theme to localStorage
   */
  saveTheme(theme) {
    localStorage.setItem('midnight_theme', theme);
    this.currentTheme = theme;
  }
  
  /**
   * Save page-specific theme
   */
  savePageTheme(page, theme) {
    this.pageThemes[page] = theme;
    localStorage.setItem('midnight_page_themes', JSON.stringify(this.pageThemes));
  }
  
  /**
   * Apply theme with transition effect
   */
  applyTheme(theme) {
    // Show transition overlay
    this.overlay.classList.add('active');
    
    // Remove all theme classes
    document.body.classList.remove(...this.themes.map(t => `theme-${t}`));
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Hide overlay after transition
    setTimeout(() => {
      this.overlay.classList.remove('active');
    }, 200);
  }
  
  /**
   * Set global theme
   */
  setTheme(theme) {
    if (!this.themes.includes(theme)) {
      console.error(`Theme "${theme}" not found`);
      return;
    }
    
    this.saveTheme(theme);
    this.applyTheme(theme);
  }
  
  /**
   * Set theme for specific page
   */
  setPageTheme(page, theme) {
    if (!this.themes.includes(theme)) {
      console.error(`Theme "${theme}" not found`);
      return;
    }
    
    this.savePageTheme(page, theme);
    
    // If setting theme for current page, apply it immediately
    if (page === this.getCurrentPage()) {
      this.applyTheme(theme);
    }
  }
  
  /**
   * Reset page-specific theme
   */
  resetPageTheme(page) {
    delete this.pageThemes[page];
    localStorage.setItem('midnight_page_themes', JSON.stringify(this.pageThemes));
    
    // If resetting current page, apply global theme
    if (page === this.getCurrentPage()) {
      this.applyTheme(this.currentTheme);
    }
  }
  
  /**
   * Create theme selector UI
   */
  createThemeSelector(container, callback) {
    const wrapper = document.createElement('div');
    wrapper.className = 'theme-selector';
    
    this.themes.forEach(theme => {
      const preview = document.createElement('div');
      preview.className = `theme-preview theme-${theme}`;
      
      const inner = document.createElement('div');
      inner.className = 'theme-preview-inner';
      inner.textContent = theme.replace('-', ' ');
      
      const indicator = document.createElement('div');
      indicator.className = 'accent-indicator';
      
      preview.appendChild(inner);
      preview.appendChild(indicator);
      
      preview.addEventListener('click', () => {
        if (typeof callback === 'function') {
          callback(theme);
        }
      });
      
      wrapper.appendChild(preview);
    });
    
    container.appendChild(wrapper);
    return wrapper;
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Export for use in other scripts
window.themeManager = themeManager;

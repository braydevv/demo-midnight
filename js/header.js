/**
 * Midnight - Header Management
 */

class HeaderManager {
  constructor() {
    this.header = document.querySelector('.header');
    this.pageTitle = document.querySelector('.page-title');
    this.quickSettings = document.querySelector('.quick-settings');
    this.quickSettingsToggle = document.querySelector('.quick-settings-toggle');
    this.quickThemeSelector = document.querySelector('.quick-theme-selector');
    this.quickWallpaperSelector = document.querySelector('.quick-wallpaper-selector');
    
    // Set page title
    this.setPageTitle();
    
    // Initialize quick settings
    this.initQuickSettings();
    
    // Set up event listeners
    this.setupEventListeners();
  }
  
  /**
   * Set page title based on current page
   */
  setPageTitle() {
    if (!this.pageTitle) return;
    
    const currentPage = window.location.pathname.split('/').pop().split('.')[0] || 'index';
    let title = '';
    
    switch (currentPage) {
      case 'index':
        title = 'home';
        break;
      case 'g':
        title = 'games';
        break;
      case 'a':
        title = 'apps';
        break;
      case 'p':
        title = 'proxy';
        break;
      case 'ai':
        title = 'cloudai';
        break;
      case 'vm':
        title = 'browser vm';
        break;
      case 'm':
        title = 'movies';
        break;
      case 's':
        title = 'settings';
        break;
      default:
        title = currentPage;
    }
    
    this.pageTitle.textContent = title;
  }
  
  /**
   * Initialize quick settings
   */
  initQuickSettings() {
    // Initialize theme selector
    if (this.quickThemeSelector && window.themeManager) {
      const themes = ['deep-blue', 'midnight-neon', 'slate', 'aqua-haze'];
      
      themes.forEach(theme => {
        const item = document.createElement('div');
        item.className = `quick-theme-item theme-${theme}`;
        item.dataset.theme = theme;
        
        if (theme === window.themeManager.getCurrentPageTheme()) {
          item.classList.add('active');
        }
        
        item.addEventListener('click', () => {
          // Update active state
          document.querySelectorAll('.quick-theme-item').forEach(el => {
            el.classList.remove('active');
          });
          item.classList.add('active');
          
          // Apply theme
          const currentPage = window.themeManager.getCurrentPage();
          window.themeManager.setPageTheme(currentPage, theme);
        });
        
        this.quickThemeSelector.appendChild(item);
      });
    }
    
    // Initialize wallpaper selector
    if (this.quickWallpaperSelector && window.wallpaperManager) {
      window.wallpaperManager.wallpapers.forEach(wallpaper => {
        const item = document.createElement('div');
        item.className = 'quick-wallpaper-item';
        item.dataset.id = wallpaper.id;
        
        if (wallpaper.type === 'image' && wallpaper.url) {
          item.style.backgroundImage = `url(${wallpaper.url})`;
        } else {
          item.classList.add('gradient');
          item.style.background = 'var(--bg-gradient)';
        }
        
        if (wallpaper.id === window.wallpaperManager.getCurrentPageWallpaper()) {
          item.classList.add('active');
        }
        
        item.addEventListener('click', () => {
          // Update active state
          document.querySelectorAll('.quick-wallpaper-item').forEach(el => {
            el.classList.remove('active');
          });
          item.classList.add('active');
          
          // Apply wallpaper
          const currentPage = window.wallpaperManager.getCurrentPage();
          window.wallpaperManager.setPageWallpaper(currentPage, wallpaper.id);
        });
        
        this.quickWallpaperSelector.appendChild(item);
      });
    }
  }
  
  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Quick settings toggle
    if (this.quickSettingsToggle && this.quickSettings) {
      this.quickSettingsToggle.addEventListener('click', (e) => {
        this.quickSettings.classList.toggle('active');
        e.stopPropagation();
      });
      
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.quickSettings.contains(e.target)) {
          this.quickSettings.classList.remove('active');
        }
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.headerManager = new HeaderManager();
});

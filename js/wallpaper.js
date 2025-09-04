/**
 * Midnight - Wallpaper Management
 */

class WallpaperManager {
  constructor() {
    // Default wallpapers
    this.wallpapers = [
      {
        id: 'default',
        name: 'default gradient',
        url: null,
        type: 'gradient'
      },
      {
        id: 'abstract-blue',
        name: 'abstract blue',
        url: 'img/wallpapers/abstract-blue.jpg',
        type: 'image'
      },
      {
        id: 'neon-city',
        name: 'neon city',
        url: 'img/wallpapers/neon-city.jpg',
        type: 'image'
      },
      {
        id: 'digital-grid',
        name: 'digital grid',
        url: 'img/wallpapers/digital-grid.jpg',
        type: 'image'
      },
      {
        id: 'space',
        name: 'space',
        url: 'img/wallpapers/space.jpg',
        type: 'image'
      }
    ];
    
    // Load saved wallpapers
    this.loadWallpapers();
    
    // Page-specific wallpapers
    this.pageWallpapers = this.loadPageWallpapers();
    
    // Current global wallpaper
    this.currentWallpaper = this.loadCurrentWallpaper();
    
    // Create wallpaper elements
    this.createWallpaperElements();
    
    // Apply wallpaper on load
    this.applyWallpaper(this.getCurrentPageWallpaper());
  }
  
  /**
   * Load wallpapers from data file if available
   */
  loadWallpapers() {
    fetch('data/wallpapers.json')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          this.wallpapers = data;
        }
      })
      .catch(err => {
        console.log('Using default wallpapers');
      });
  }
  
  /**
   * Load current wallpaper from localStorage
   */
  loadCurrentWallpaper() {
    return localStorage.getItem('midnight_wallpaper') || 'default';
  }
  
  /**
   * Load page-specific wallpapers from localStorage
   */
  loadPageWallpapers() {
    const saved = localStorage.getItem('midnight_page_wallpapers');
    return saved ? JSON.parse(saved) : {};
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
   * Get wallpaper for current page
   */
  getCurrentPageWallpaper() {
    const page = this.getCurrentPage();
    return this.pageWallpapers[page] || this.currentWallpaper;
  }
  
  /**
   * Create wallpaper DOM elements
   */
  createWallpaperElements() {
    // Create wallpaper container
    const wallpaper = document.createElement('div');
    wallpaper.className = 'wallpaper';
    document.body.appendChild(wallpaper);
    this.wallpaperElement = wallpaper;
    
    // Create gradient overlay
    const overlay = document.createElement('div');
    overlay.className = 'gradient-overlay';
    document.body.appendChild(overlay);
    this.overlayElement = overlay;
  }
  
  /**
   * Apply wallpaper by ID
   */
  applyWallpaper(id) {
    const wallpaper = this.wallpapers.find(w => w.id === id) || this.wallpapers[0];
    
    if (wallpaper.type === 'image' && wallpaper.url) {
      this.wallpaperElement.style.backgroundImage = `url(${wallpaper.url})`;
      this.wallpaperElement.style.opacity = '0.2';
    } else {
      this.wallpaperElement.style.backgroundImage = 'none';
      this.wallpaperElement.style.opacity = '0';
    }
  }
  
  /**
   * Set global wallpaper
   */
  setWallpaper(id) {
    const wallpaper = this.wallpapers.find(w => w.id === id);
    if (!wallpaper) {
      console.error(`Wallpaper "${id}" not found`);
      return;
    }
    
    localStorage.setItem('midnight_wallpaper', id);
    this.currentWallpaper = id;
    this.applyWallpaper(id);
  }
  
  /**
   * Set page-specific wallpaper
   */
  setPageWallpaper(page, id) {
    const wallpaper = this.wallpapers.find(w => w.id === id);
    if (!wallpaper) {
      console.error(`Wallpaper "${id}" not found`);
      return;
    }
    
    this.pageWallpapers[page] = id;
    localStorage.setItem('midnight_page_wallpapers', JSON.stringify(this.pageWallpapers));
    
    // If setting wallpaper for current page, apply it immediately
    if (page === this.getCurrentPage()) {
      this.applyWallpaper(id);
    }
  }
  
  /**
   * Reset page-specific wallpaper
   */
  resetPageWallpaper(page) {
    delete this.pageWallpapers[page];
    localStorage.setItem('midnight_page_wallpapers', JSON.stringify(this.pageWallpapers));
    
    // If resetting current page, apply global wallpaper
    if (page === this.getCurrentPage()) {
      this.applyWallpaper(this.currentWallpaper);
    }
  }
  
  /**
   * Create wallpaper selector UI
   */
  createWallpaperSelector(container, callback) {
    const wrapper = document.createElement('div');
    wrapper.className = 'wallpaper-selector';
    
    this.wallpapers.forEach(wallpaper => {
      const preview = document.createElement('div');
      preview.className = 'wallpaper-preview';
      preview.dataset.id = wallpaper.id;
      
      if (wallpaper.type === 'image' && wallpaper.url) {
        preview.style.backgroundImage = `url(${wallpaper.url})`;
      } else {
        preview.classList.add('gradient');
      }
      
      const name = document.createElement('div');
      name.className = 'wallpaper-name';
      name.textContent = wallpaper.name;
      
      preview.appendChild(name);
      
      preview.addEventListener('click', () => {
        if (typeof callback === 'function') {
          callback(wallpaper.id);
        }
      });
      
      wrapper.appendChild(preview);
    });
    
    container.appendChild(wrapper);
    return wrapper;
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.wallpaperManager = new WallpaperManager();
});

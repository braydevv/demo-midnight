
/**
 * Midnight - Snow Particles Effect
 */

class SnowEffect {
  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'snow-container';
    document.body.appendChild(this.container);
    
    this.snowflakes = [];
    this.snowflakeCount = 50; // Number of snowflakes
    this.minSize = 1;         // Minimum snowflake size
    this.maxSize = 3;         // Maximum snowflake size
    this.minDuration = 10;    // Minimum fall duration (seconds)
    this.maxDuration = 30;    // Maximum fall duration (seconds)
    
    this.createSnowflakes();
    this.startAnimation();
  }
  
  /**
   * Create snowflake elements
   */
  createSnowflakes() {
    for (let i = 0; i < this.snowflakeCount; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snow';
      
      // Random size
      const size = this.random(this.minSize, this.maxSize);
      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      
      // Random position
      snowflake.style.left = `${this.random(0, 100)}%`;
      snowflake.style.top = `${this.random(-20, 0)}%`;
      
      // Random fall duration
      const duration = this.random(this.minDuration, this.maxDuration);
      snowflake.style.animationDuration = `${duration}s, 1s`;
      
      // Random delay
      const delay = this.random(0, 5);
      snowflake.style.animationDelay = `${delay}s, 0s`;
      
      this.container.appendChild(snowflake);
      this.snowflakes.push({
        element: snowflake,
        size,
        duration,
        delay
      });
    }
  }
  
  /**
   * Start animation loop
   */
  startAnimation() {
    // Reset positions when snowflakes reach bottom
    setInterval(() => {
      this.snowflakes.forEach(snowflake => {
        const computedStyle = window.getComputedStyle(snowflake.element);
        const top = parseFloat(computedStyle.top);
        
        if (top > window.innerHeight) {
          snowflake.element.style.left = `${this.random(0, 100)}%`;
          snowflake.element.style.top = `${this.random(-20, 0)}%`;
        }
      });
    }, 1000);
  }
  
  /**
   * Generate random number between min and max
   */
  random(min, max) {
    return min + Math.random() * (max - min);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.snowEffect = new SnowEffect();
});

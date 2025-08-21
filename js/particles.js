/**
 * Particles Effect for Midnight Portal
 * Creates dynamic background animations
 */
class MidnightParticles {
  constructor(options = {}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.className = 'midnight-particles';
    
    // Set canvas styles
    Object.assign(this.canvas.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      pointerEvents: 'none'
    });
    
    // Configuration
    this.config = {
      type: options.type || 'rain',
      particleCount: options.particleCount || 150,
      color: options.color || '#0066ff',
      opacity: options.opacity || 0.6,
      speed: options.speed || 1.2,
      size: options.size || { min: 1, max: 4 }
    };
    
    this.particles = [];
    document.body.appendChild(this.canvas);
    
    this.resizeCanvas();
    this.createParticles();
    
    // Event listeners
    window.addEventListener('resize', () => this.resizeCanvas());
    
    // Start animation
    this.animate();
  }
  
  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Recreate particles when canvas is resized
    if (this.particles.length > 0) {
      this.createParticles();
    }
  }
  
  createParticles() {
    this.particles = [];
    
    for (let i = 0; i < this.config.particleCount; i++) {
      let particle = {};
      
      // Common properties
      particle.opacity = Math.random() * this.config.opacity;
      
      // Type-specific properties
      switch (this.config.type) {
        case 'rain':
          particle = this.createRainParticle(particle);
          break;
        case 'snow':
          particle = this.createSnowParticle(particle);
          break;
        case 'stars':
          particle = this.createStarParticle(particle);
          break;
        default:
          particle = this.createRainParticle(particle);
      }
      
      this.particles.push(particle);
    }
  }
  
  createRainParticle(particle) {
    particle.x = Math.random() * this.canvas.width;
    particle.y = Math.random() * this.canvas.height;
    particle.size = this.randomBetween(this.config.size.min, this.config.size.max);
    particle.speed = (Math.random() + 0.2) * this.config.speed;
    return particle;
  }
  
  createSnowParticle(particle) {
    particle.x = Math.random() * this.canvas.width;
    particle.y = Math.random() * this.canvas.height;
    particle.size = this.randomBetween(this.config.size.min, this.config.size.max);
    particle.speed = (Math.random() + 0.2) * (this.config.speed * 0.7); // Snow falls slower
    particle.swing = Math.random() * 3; // How much the snow swings
    particle.swingCount = Math.random() * Math.PI * 2; // Current position in swing
    return particle;
  }
  
  createStarParticle(particle) {
    particle.x = Math.random() * this.canvas.width;
    particle.y = Math.random() * this.canvas.height;
    particle.size = this.randomBetween(this.config.size.min, this.config.size.max);
    particle.twinkleSpeed = 0.03 + Math.random() * 0.05;
    particle.twinklePos = Math.random() * Math.PI * 2;
    return particle;
  }
  
  randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach(particle => {
      switch (this.config.type) {
        case 'rain':
          this.updateRainParticle(particle);
          this.drawRainParticle(particle);
          break;
        case 'snow':
          this.updateSnowParticle(particle);
          this.drawSnowParticle(particle);
          break;
        case 'stars':
          this.updateStarParticle(particle);
          this.drawStarParticle(particle);
          break;
        default:
          this.updateRainParticle(particle);
          this.drawRainParticle(particle);
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
  
  updateRainParticle(particle) {
    // Update position
    particle.y += particle.speed;
    
    // Reset if particle goes off screen
    if (particle.y > this.canvas.height) {
      particle.y = -10;
      particle.x = Math.random() * this.canvas.width;
    }
  }
  
  drawRainParticle(particle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.config.color;
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.rect(particle.x, particle.y, particle.size / 3, particle.size);
    this.ctx.fill();
  }
  
  updateSnowParticle(particle) {
    // Update position
    particle.y += particle.speed;
    particle.swingCount += 0.02;
    particle.x += Math.sin(particle.swingCount) * particle.swing * 0.1;
    
    // Reset if particle goes off screen
    if (particle.y > this.canvas.height) {
      particle.y = -10;
      particle.x = Math.random() * this.canvas.width;
    }
  }
  
  drawSnowParticle(particle) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.config.color;
    this.ctx.globalAlpha = particle.opacity;
    this.ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  updateStarParticle(particle) {
    // Stars don't move, they just twinkle
    particle.twinklePos += particle.twinkleSpeed;
    if (particle.twinklePos > Math.PI * 2) {
      particle.twinklePos = 0;
    }
  }
  
  drawStarParticle(particle) {
    // Calculate twinkle effect
    const twinkle = (Math.sin(particle.twinklePos) + 1) / 2; // 0 to 1
    
    this.ctx.beginPath();
    this.ctx.fillStyle = this.config.color;
    this.ctx.globalAlpha = particle.opacity * (0.5 + twinkle * 0.5);
    this.ctx.arc(particle.x, particle.y, particle.size / 2 * (0.7 + twinkle * 0.3), 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // Public methods to control particles
  setType(type) {
    if (['rain', 'snow', 'stars'].includes(type)) {
      this.config.type = type;
      this.createParticles();
    }
  }
  
  setColor(color) {
    this.config.color = color;
  }
  
  setOpacity(opacity) {
    this.config.opacity = opacity;
    this.particles.forEach(p => {
      p.opacity = Math.random() * opacity;
    });
  }
  
  setSpeed(speed) {
    this.config.speed = speed;
    this.createParticles(); // Recreate particles with new speed
  }
  
  setCount(count) {
    this.config.particleCount = count;
    this.createParticles();
  }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.midnightParticles = new MidnightParticles();
});

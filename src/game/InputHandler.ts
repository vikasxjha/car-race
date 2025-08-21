export default class InputHandler {
  private keys: Set<string> = new Set();
  private touchStartX: number | null = null;
  private touchStartY: number | null = null;
  
  constructor() {
    this.setupEventListeners();
  }
  
  private setupEventListeners() {
    // Keyboard events
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    
    // Touch events for mobile
    window.addEventListener('touchstart', this.handleTouchStart);
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleTouchEnd);
  }
  
  private handleKeyDown = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
      e.preventDefault();
      this.keys.add(key);
    }
  };
  
  private handleKeyUp = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    this.keys.delete(key);
  };
  
  private handleTouchStart = (e: TouchEvent) => {
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  };
  
  private handleTouchMove = (e: TouchEvent) => {
    if (!this.touchStartX || !this.touchStartY) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    
    // Clear previous touch directions
    this.keys.delete('arrowleft');
    this.keys.delete('arrowright');
    this.keys.delete('arrowup');
    this.keys.delete('arrowdown');
    
    // Horizontal movement
    if (Math.abs(deltaX) > 10) {
      if (deltaX > 0) {
        this.keys.add('arrowright');
      } else {
        this.keys.add('arrowleft');
      }
    }
    
    // Vertical movement
    if (Math.abs(deltaY) > 10) {
      if (deltaY > 0) {
        this.keys.add('arrowdown');
      } else {
        this.keys.add('arrowup');
      }
    }
  };
  
  private handleTouchEnd = () => {
    this.touchStartX = null;
    this.touchStartY = null;
    this.keys.clear();
  };
  
  getInput() {
    return {
      up: this.keys.has('arrowup') || this.keys.has('w'),
      down: this.keys.has('arrowdown') || this.keys.has('s'),
      left: this.keys.has('arrowleft') || this.keys.has('a'),
      right: this.keys.has('arrowright') || this.keys.has('d'),
    };
  }
  
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchmove', this.handleTouchMove);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }
}
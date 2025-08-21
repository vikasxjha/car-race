import { Obstacle, Collectible } from '../types/game';

export default class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private isDayMode: boolean;
  
  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, isDayMode: boolean) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.isDayMode = isDayMode;
  }
  
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  
  drawBackground(offset: number) {
    // Sky gradient
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    if (this.isDayMode) {
      gradient.addColorStop(0, '#87CEEB');
      gradient.addColorStop(1, '#98D8E8');
    } else {
      gradient.addColorStop(0, '#0F172A');
      gradient.addColorStop(1, '#1E293B');
    }
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw mountains/buildings silhouette
    this.ctx.fillStyle = this.isDayMode ? '#4A5568' : '#1A202C';
    const mountainY = this.canvas.height * 0.3;
    this.ctx.beginPath();
    this.ctx.moveTo(0, mountainY);
    
    for (let x = 0; x <= this.canvas.width; x += 50) {
      const height = Math.sin((x + offset) * 0.01) * 50 + mountainY;
      this.ctx.lineTo(x, height);
    }
    
    this.ctx.lineTo(this.canvas.width, this.canvas.height);
    this.ctx.lineTo(0, this.canvas.height);
    this.ctx.fill();
  }
  
  drawRoad(offset: number, roadWidth: number) {
    const roadX = this.canvas.width / 2 - roadWidth / 2;
    
    // Road surface
    this.ctx.fillStyle = '#2C2C2C';
    this.ctx.fillRect(roadX, 0, roadWidth, this.canvas.height);
    
    // Road edges
    this.ctx.strokeStyle = '#FFFFFF';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.moveTo(roadX, 0);
    this.ctx.lineTo(roadX, this.canvas.height);
    this.ctx.moveTo(roadX + roadWidth, 0);
    this.ctx.lineTo(roadX + roadWidth, this.canvas.height);
    this.ctx.stroke();
    
    // Lane dividers (dashed lines)
    const laneCount = 3;
    const laneWidth = roadWidth / laneCount;
    this.ctx.strokeStyle = '#FFFF00';
    this.ctx.lineWidth = 3;
    this.ctx.setLineDash([20, 20]);
    this.ctx.lineDashOffset = -offset;
    
    for (let i = 1; i < laneCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(roadX + i * laneWidth, 0);
      this.ctx.lineTo(roadX + i * laneWidth, this.canvas.height);
      this.ctx.stroke();
    }
    
    this.ctx.setLineDash([]);
  }
  
  drawCar(x: number, y: number, color: string) {
    this.ctx.save();
    this.ctx.translate(x, y);
    
    // Car shadow
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.beginPath();
    this.ctx.ellipse(0, 10, 25, 15, 0, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Car body
    this.ctx.fillStyle = color;
    this.ctx.fillRect(-20, -40, 40, 70);
    
    // Car roof
    this.ctx.fillStyle = this.adjustColor(color, -30);
    this.ctx.fillRect(-15, -25, 30, 35);
    
    // Windows
    this.ctx.fillStyle = '#4A90E2';
    this.ctx.fillRect(-12, -22, 24, 15);
    this.ctx.fillRect(-12, -5, 24, 10);
    
    // Headlights
    this.ctx.fillStyle = '#FFFF00';
    this.ctx.fillRect(-15, -40, 10, 5);
    this.ctx.fillRect(5, -40, 10, 5);
    
    // Tail lights
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(-15, 30, 10, 5);
    this.ctx.fillRect(5, 30, 10, 5);
    
    this.ctx.restore();
  }
  
  drawObstacle(obstacle: Obstacle) {
    this.ctx.save();
    this.ctx.translate(obstacle.x, obstacle.y);
    
    switch (obstacle.type) {
      case 'car':
        // Enemy car
        this.ctx.fillStyle = '#666666';
        this.ctx.fillRect(-20, -40, 40, 80);
        this.ctx.fillStyle = '#444444';
        this.ctx.fillRect(-15, -25, 30, 35);
        this.ctx.fillStyle = '#222222';
        this.ctx.fillRect(-12, -22, 24, 15);
        break;
        
      case 'oil':
        // Oil spill
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, obstacle.width / 2, obstacle.height / 2, 0, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Oil shine effect
        this.ctx.strokeStyle = 'rgba(100, 100, 100, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        break;
        
      case 'broken':
        // Broken car/debris
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(-20, -30, 40, 60);
        this.ctx.fillStyle = '#654321';
        this.ctx.fillRect(-15, -20, 30, 25);
        
        // Damage effect
        this.ctx.strokeStyle = '#FF4500';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -10);
        this.ctx.lineTo(10, 10);
        this.ctx.moveTo(10, -10);
        this.ctx.lineTo(-10, 10);
        this.ctx.stroke();
        break;
    }
    
    this.ctx.restore();
  }
  
  drawCollectible(collectible: Collectible) {
    this.ctx.save();
    this.ctx.translate(collectible.x, collectible.y);
    
    // Glow effect
    const glow = this.ctx.createRadialGradient(0, 0, 0, 0, 0, 20);
    
    switch (collectible.type) {
      case 'fuel':
        // Fuel can
        glow.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
        glow.addColorStop(1, 'rgba(255, 0, 0, 0)');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(-25, -25, 50, 50);
        
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(-10, -12, 20, 24);
        this.ctx.fillStyle = '#FFFFFF';
        this.ctx.font = 'bold 10px Arial';
        this.ctx.fillText('F', -5, 3);
        break;
        
      case 'boost':
        // Boost arrow
        glow.addColorStop(0, 'rgba(0, 255, 0, 0.5)');
        glow.addColorStop(1, 'rgba(0, 255, 0, 0)');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(-25, -25, 50, 50);
        
        this.ctx.fillStyle = '#00FF00';
        this.ctx.beginPath();
        this.ctx.moveTo(0, -15);
        this.ctx.lineTo(-10, 5);
        this.ctx.lineTo(-3, 5);
        this.ctx.lineTo(-3, 15);
        this.ctx.lineTo(3, 15);
        this.ctx.lineTo(3, 5);
        this.ctx.lineTo(10, 5);
        this.ctx.closePath();
        this.ctx.fill();
        break;
        
      case 'coin':
        // Coin
        glow.addColorStop(0, 'rgba(255, 215, 0, 0.5)');
        glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
        this.ctx.fillStyle = glow;
        this.ctx.fillRect(-25, -25, 50, 50);
        
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 12, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = '#FFA500';
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillText('$', -4, 4);
        break;
    }
    
    this.ctx.restore();
  }
  
  drawSpeedLines(intensity: number) {
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${intensity * 0.3})`;
    this.ctx.lineWidth = 2;
    
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const length = 20 + Math.random() * 40 * intensity;
      
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x, y + length);
      this.ctx.stroke();
    }
  }
  
  private adjustColor(color: string, amount: number): string {
    const num = parseInt(color.slice(1), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  }
}
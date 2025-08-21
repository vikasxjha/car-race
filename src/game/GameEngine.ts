import { Car, Obstacle, Collectible, GameConfig } from '../types/game';
import { cars } from '../data/cars';
import InputHandler from './InputHandler';
import CollisionDetector from './CollisionDetector';
import Renderer from './Renderer';

interface GameCallbacks {
  onScoreUpdate: (score: number) => void;
  onLivesUpdate: (lives: number) => void;
  onLevelUpdate: (level: number) => void;
  onGameOver: () => void;
  playSound: (sound: string) => void;
  updateStats: (stats: any) => void;
}

export default class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private config: GameConfig;
  private inputHandler: InputHandler;
  private collisionDetector: CollisionDetector;
  private renderer: Renderer;
  private callbacks: GameCallbacks;
  
  private playerCar: Car & { x: number; y: number; velocity: number };
  private obstacles: Obstacle[] = [];
  private collectibles: Collectible[] = [];
  
  private score = 0;
  private lives = 3;
  private level = 1;
  private distance = 0;
  private fuelCollected = 0;
  private boostsUsed = 0;
  private currentNoCrashDistance = 0;
  
  private isPaused = false;
  private isGameOver = false;
  private animationId: number | null = null;
  private lastTime = 0;
  
  private roadOffset = 0;
  private roadSpeed = 5;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    selectedCarId: string,
    isDayMode: boolean,
    callbacks: GameCallbacks
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.callbacks = callbacks;
    
    this.config = {
      canvasWidth: canvas.width,
      canvasHeight: canvas.height,
      roadWidth: 400,
      laneCount: 3,
      baseSpeed: 5,
      maxSpeed: 15,
      acceleration: 0.2,
      deceleration: 0.1,
    };
    
    const carData = cars.find(c => c.id === selectedCarId) || cars[0];
    this.playerCar = {
      ...carData,
      x: canvas.width / 2,
      y: canvas.height - 150,
      velocity: 0,
    };
    
    this.inputHandler = new InputHandler();
    this.collisionDetector = new CollisionDetector();
    this.renderer = new Renderer(canvas, ctx, isDayMode);
    
    this.init();
  }
  
  private init() {
    this.generateObstacles();
    this.generateCollectibles();
  }
  
  start() {
    this.lastTime = performance.now();
    this.gameLoop();
  }
  
  private gameLoop = (currentTime: number = 0) => {
    if (this.isGameOver) return;
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    if (!this.isPaused) {
      this.update(deltaTime);
      this.render();
    }
    
    this.animationId = requestAnimationFrame(this.gameLoop);
  };
  
  private update(deltaTime: number) {
    // Update player position based on input
    const input = this.inputHandler.getInput();
    
    if (input.left && this.playerCar.x > this.config.canvasWidth / 2 - this.config.roadWidth / 2 + 40) {
      this.playerCar.x -= this.playerCar.handling * deltaTime * 0.3;
    }
    if (input.right && this.playerCar.x < this.config.canvasWidth / 2 + this.config.roadWidth / 2 - 40) {
      this.playerCar.x += this.playerCar.handling * deltaTime * 0.3;
    }
    if (input.up) {
      this.playerCar.velocity = Math.min(
        this.playerCar.velocity + this.playerCar.acceleration * deltaTime * 0.01,
        this.config.maxSpeed
      );
    }
    if (input.down) {
      this.playerCar.velocity = Math.max(
        this.playerCar.velocity - this.config.deceleration * deltaTime * 0.02,
        0
      );
    }
    
    // Update road and distance
    this.roadOffset += (this.roadSpeed + this.playerCar.velocity) * deltaTime * 0.1;
    if (this.roadOffset > 100) this.roadOffset = 0;
    
    this.distance += this.playerCar.velocity * deltaTime * 0.001;
    this.currentNoCrashDistance += this.playerCar.velocity * deltaTime * 0.001;
    
    // Update score
    this.score = Math.floor(this.distance * 10) + this.fuelCollected * 50 + this.boostsUsed * 100;
    this.callbacks.onScoreUpdate(this.score);
    
    // Update level based on distance
    const newLevel = Math.floor(this.distance / 100) + 1;
    if (newLevel !== this.level) {
      this.level = newLevel;
      this.callbacks.onLevelUpdate(this.level);
      this.callbacks.playSound('levelUp');
      this.roadSpeed += 0.5; // Increase difficulty
    }
    
    // Update obstacles
    this.updateObstacles(deltaTime);
    this.updateCollectibles(deltaTime);
    
    // Check collisions
    this.checkCollisions();
  }
  
  private updateObstacles(deltaTime: number) {
    // Move obstacles
    this.obstacles.forEach(obstacle => {
      obstacle.y += (this.roadSpeed + this.playerCar.velocity) * deltaTime * 0.1;
      
      // Traffic cars move slightly
      if (obstacle.type === 'car' && obstacle.speed) {
        obstacle.y += obstacle.speed * deltaTime * 0.05;
      }
    });
    
    // Remove off-screen obstacles
    this.obstacles = this.obstacles.filter(o => o.y < this.canvas.height + 100);
    
    // Generate new obstacles
    if (Math.random() < 0.01 * this.level) {
      this.generateObstacle();
    }
  }
  
  private updateCollectibles(deltaTime: number) {
    // Move collectibles
    this.collectibles.forEach(collectible => {
      if (!collectible.collected) {
        collectible.y += (this.roadSpeed + this.playerCar.velocity) * deltaTime * 0.1;
      }
    });
    
    // Remove off-screen or collected items
    this.collectibles = this.collectibles.filter(c => !c.collected && c.y < this.canvas.height + 100);
    
    // Generate new collectibles
    if (Math.random() < 0.005) {
      this.generateCollectible();
    }
  }
  
  private checkCollisions() {
    // Check obstacle collisions
    for (const obstacle of this.obstacles) {
      if (this.collisionDetector.checkCollision(
        { x: this.playerCar.x - 20, y: this.playerCar.y - 40, width: 40, height: 80 },
        obstacle
      )) {
        this.handleCrash();
        break;
      }
    }
    
    // Check collectible collisions
    for (const collectible of this.collectibles) {
      if (!collectible.collected && this.collisionDetector.checkCollision(
        { x: this.playerCar.x - 20, y: this.playerCar.y - 40, width: 40, height: 80 },
        collectible
      )) {
        this.handleCollect(collectible);
      }
    }
  }
  
  private handleCrash() {
    this.lives--;
    this.callbacks.onLivesUpdate(this.lives);
    this.callbacks.playSound('crash');
    this.currentNoCrashDistance = 0;
    
    // Reset car position
    this.playerCar.x = this.canvas.width / 2;
    this.playerCar.velocity = 0;
    
    // Clear nearby obstacles for fairness
    this.obstacles = this.obstacles.filter(o => o.y < this.canvas.height - 200);
    
    if (this.lives <= 0) {
      this.gameOver();
    }
    
    // Update stats
    this.callbacks.updateStats({
      crashCount: 1,
      longestNoCrashDistance: this.currentNoCrashDistance,
    });
  }
  
  private handleCollect(collectible: Collectible) {
    collectible.collected = true;
    this.callbacks.playSound('collect');
    
    switch (collectible.type) {
      case 'fuel':
        this.fuelCollected++;
        this.score += 50;
        break;
      case 'boost':
        this.boostsUsed++;
        this.playerCar.velocity = this.config.maxSpeed;
        this.callbacks.playSound('boost');
        break;
      case 'coin':
        this.score += 100;
        break;
    }
    
    this.callbacks.onScoreUpdate(this.score);
    this.callbacks.updateStats({
      totalFuelCollected: this.fuelCollected,
      totalBoostsUsed: this.boostsUsed,
    });
  }
  
  private generateObstacle() {
    const lane = Math.floor(Math.random() * this.config.laneCount);
    const laneWidth = this.config.roadWidth / this.config.laneCount;
    const roadLeft = this.canvas.width / 2 - this.config.roadWidth / 2;
    
    const types: Obstacle['type'][] = ['car', 'oil', 'broken'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    this.obstacles.push({
      x: roadLeft + lane * laneWidth + laneWidth / 2,
      y: -100,
      width: type === 'oil' ? 60 : 40,
      height: type === 'oil' ? 40 : 80,
      type,
      speed: type === 'car' ? Math.random() * 2 - 1 : 0,
      lane,
    });
  }
  
  private generateObstacles() {
    for (let i = 0; i < 3; i++) {
      this.generateObstacle();
    }
  }
  
  private generateCollectible() {
    const lane = Math.floor(Math.random() * this.config.laneCount);
    const laneWidth = this.config.roadWidth / this.config.laneCount;
    const roadLeft = this.canvas.width / 2 - this.config.roadWidth / 2;
    
    const types: Collectible['type'][] = ['fuel', 'boost', 'coin'];
    const weights = [0.5, 0.2, 0.3];
    const random = Math.random();
    let type: Collectible['type'] = 'fuel';
    let sum = 0;
    
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (random < sum) {
        type = types[i];
        break;
      }
    }
    
    this.collectibles.push({
      x: roadLeft + lane * laneWidth + laneWidth / 2,
      y: -50,
      width: 30,
      height: 30,
      type,
      collected: false,
    });
  }
  
  private generateCollectibles() {
    for (let i = 0; i < 2; i++) {
      this.generateCollectible();
    }
  }
  
  private render() {
    this.renderer.clear();
    this.renderer.drawBackground(this.roadOffset);
    this.renderer.drawRoad(this.roadOffset, this.config.roadWidth);
    
    // Draw collectibles
    this.collectibles.forEach(collectible => {
      if (!collectible.collected) {
        this.renderer.drawCollectible(collectible);
      }
    });
    
    // Draw obstacles
    this.obstacles.forEach(obstacle => {
      this.renderer.drawObstacle(obstacle);
    });
    
    // Draw player car
    this.renderer.drawCar(this.playerCar.x, this.playerCar.y, this.playerCar.color);
    
    // Draw effects
    if (this.playerCar.velocity > this.config.maxSpeed * 0.8) {
      this.renderer.drawSpeedLines(this.playerCar.velocity / this.config.maxSpeed);
    }
  }
  
  setPaused(paused: boolean) {
    this.isPaused = paused;
  }
  
  private gameOver() {
    this.isGameOver = true;
    this.callbacks.playSound('gameOver');
    this.callbacks.updateStats({
      totalDistance: this.distance,
      highestLevel: this.level,
    });
    this.callbacks.onGameOver();
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    this.inputHandler.destroy();
  }
}
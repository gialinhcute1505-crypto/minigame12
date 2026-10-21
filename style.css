// --- ÂM THANH (WEB AUDIO API) ---
class SoundEffects {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playJump() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playScore() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'square';
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.setValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playHit() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(30, this.ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.25);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }
}

const sound = new SoundEffects();

// --- THIẾT LẬP CANVAS & GAME ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const highScoreEl = document.getElementById('highScore');
const currentScoreEl = document.getElementById('currentScore');

const GAME_SPEED_START = 6;
const GRAVITY = 0.6;
const GROUND_Y = 210;

let gameSpeed = GAME_SPEED_START;
let score = 0;
let highScore = localStorage.getItem('dinoHighScore') || 0;
let isGameOver = false;
let gameFrame = 0;
let isNight = false;

highScoreEl.innerText = String(highScore).padStart(5, '0');

// --- KHỦNG LONG (DINO) ---
const dino = {
  x: 50,
  y: GROUND_Y - 44,
  width: 40,
  height: 44,
  vy: 0,
  isJumping: false,
  isDucking: false,
  legFrame: 0,

  jump() {
    if (!this.isJumping) {
      this.vy = -12;
      this.isJumping = true;
      this.isDucking = false;
      sound.playJump();
      createParticles(this.x + 10, GROUND_Y, 8);
    }
  },

  duck(ducking) {
    if (this.isJumping) return;
    this.isDucking = ducking;
    if (ducking) {
      this.height = 26;
      this.y = GROUND_Y - 26;
    } else {
      this.height = 44;
      this.y = GROUND_Y - 44;
    }
  },

  update() {
    if (this.isJumping) {
      this.y += this.vy;
      this.vy += GRAVITY;

      if (this.y >= GROUND_Y - this.height) {
        this.y = GROUND_Y - this.height;
        this.isJumping = false;
        this.vy = 0;
        createParticles(this.x + 10, GROUND_Y, 5);
      }
    }

    if (gameFrame % 6 === 0) {
      this.legFrame = (this.legFrame + 1) % 2;
    }

    if (!this.isJumping && gameFrame % 8 === 0) {
      createParticles(this.x + 5, GROUND_Y - 2, 1);
    }
  },

  draw() {
    ctx.fillStyle = isNight ? '#e0e0e0' : '#535353';

    if (this.isDucking) {
      ctx.fillRect(this.x, this.y + 8, 52, 18);
      ctx.fillRect(this.x + 36, this.y, 18, 14);
      ctx.fillStyle = isNight ? '#222' : '#fff';
      ctx.fillRect(this.x + 48, this.y + 3, 3, 3);
      ctx.fillStyle = isNight ? '#e0e0e0' : '#535353';
      
      if (this.legFrame === 0) {
        ctx.fillRect(this.x + 10, this.y + 24, 6, 6);
        ctx.fillRect(this.x + 32, this.y + 24, 6, 4);
      } else {
        ctx.fillRect(this.x + 10, this.y + 24, 6, 4);
        ctx.fillRect(this.x + 32, this.y + 24, 6, 6);
      }
    } else {
      ctx.fillRect(this.x + 12, this.y + 14, 22, 20);
      ctx.fillRect(this.x + 20, this.y, 22, 18);
      ctx.fillStyle = isNight ? '#222' : '#fff';
      ctx.fillRect(this.x + 34, this.y + 4, 3, 3);
      ctx.fillStyle = isNight ? '#e0e0e0' : '#535353';
      ctx.fillRect(this.x + 32, this.y + 18, 6, 3);
      ctx.fillRect(this.x, this.y + 16, 12, 10);

      if (this.isJumping) {
        ctx.fillRect(this.x + 14, this.y + 34, 6, 6);
        ctx.fillRect(this.x + 26, this.y + 34, 6, 6);
      } else {
        if (this.legFrame === 0) {
          ctx.fillRect(this.x + 14, this.y + 34, 6, 10);
          ctx.fillRect(this.x + 26, this.y + 34, 6, 4);
        } else {
          ctx.fillRect(this.x + 14, this.y + 34, 6, 4);
          ctx.fillRect(this.x + 26, this.y + 34, 6, 10);
        }
      }
    }
  }
};

// --- CHƯỚNG NGẠI VẬT (XƯƠNG RỒNG & CHIM) ---
let obstacles = [];

class Obstacle {
  constructor() {
    this.x = canvas.width + 50;
    const canSpawnBird = score > 150 && Math.random() < 0.35;

    if (canSpawnBird) {
      this.type = 'bird';
      this.width = 38;
      this.height = 26;
      const birdHeights = [GROUND_Y - 25, GROUND_Y - 48, GROUND_Y - 70];
      this.y = birdHeights[Math.floor(Math.random() * birdHeights.length)];
      this.wingFrame = 0;
    } else {
      this.type = 'cactus';
      const cactusTypes = [
        { w: 18, h: 38 },
        { w: 26, h: 48 },
        { w: 45, h: 40 }
      ];
      const choice = cactusTypes[Math.floor(Math.random() * cactusTypes.length)];
      this.width = choice.w;
      this.height = choice.h;
      this.y = GROUND_Y - this.height;
    }
  }

  update() {
    this.x -= gameSpeed;
    if (this.type === 'bird' && gameFrame % 10 === 0) {
      this.wingFrame = (this.wingFrame + 1) % 2;
    }
  }

  draw() {
    ctx.fillStyle = isNight ? '#ff5252' : '#2e7d32';

    if (this.type === 'cactus') {
      ctx.fillRect(this.x + 4, this.y, this.width - 8, this.height);
      ctx.fillRect(this.x, this.y + 10, this.width, 6);
      ctx.fillRect(this.x, this.y + 4, 4, 12);
      ctx.fillRect(this.x + this.width - 4, this.y + 4, 4, 12);
    } else if (this.type === 'bird') {
      ctx.fillStyle = isNight ? '#ff7043' : '#d84315';
      ctx.fillRect(this.x + 10, this.y + 8, 20, 10);
      ctx.fillRect(this.x, this.y + 4, 12, 8);
      ctx.fillRect(this.x - 6, this.y + 8, 6, 3);
      ctx.fillRect(this.x + 30, this.y + 10, 8, 4);

      if (this.wingFrame === 0) {
        ctx.fillRect(this.x + 12, this.y - 8, 8, 16);
      } else {
        ctx.fillRect(this.x + 12, this.y + 14, 8, 14);
      }
    }
  }
}

// --- HIỆU ỨNG BỤI ĐẤT ---
let particles = [];

function createParticles(x, y, count) {
  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 2 - 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      life: 1
    });
  }
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.05;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  ctx.fillStyle = isNight ? '#888' : '#aaa';
  particles.forEach(p => {
    ctx.globalAlpha = p.life;
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });
  ctx.globalAlpha = 1.0;
}

// --- MÂY, MẶT TRĂNG & SAO ---
let clouds = [
  { x: 200, y: 50, speed: 0.5 },
  { x: 500, y: 80, speed: 0.7 },
  { x: 750, y: 40, speed: 0.4 }
];

let stars = Array.from({ length: 15 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * 120,
  size: Math.random() * 2 + 1
}));

function drawBackground() {
  if (isNight) {
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.arc(720, 50, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    stars.forEach(s => {
      if (Math.random() > 0.1) {
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }
    });
  }

  ctx.fillStyle = isNight ? '#444444' : '#d0d0d0';
  clouds.forEach(c => {
    c.x -= c.speed;
    if (c.x < -60) c.x = canvas.width + 50;

    ctx.fillRect(c.x, c.y, 40, 12);
    ctx.fillRect(c.x + 10, c.y - 6, 20, 8);
  });

  ctx.fillStyle = isNight ? '#666666' : '#535353';
  ctx.fillRect(0, GROUND_Y, canvas.width, 2);

  for (let i = 0; i < canvas.width; i += 20) {
    if ((i + Math.floor(gameFrame * gameSpeed)) % 40 < 20) {
      ctx.fillRect(i, GROUND_Y + 6, 10, 2);
    }
  }
}

// --- KIỂM TRA VA CHẠM ---
function checkCollision(dino, obs) {
  const padding = 4;
  const dinoBox = {
    x: dino.x + padding,
    y: dino.y + padding,
    w: (dino.isDucking ? 52 : dino.width) - padding * 2,
    h: dino.height - padding * 2
  };

  const obsBox = {
    x: obs.x + padding,
    y: obs.y + padding,
    w: obs.width - padding * 2,
    h: obs.height - padding * 2
  };

  return (
    dinoBox.x < obsBox.x + obsBox.w &&
    dinoBox.x + dinoBox.w > obsBox.x &&
    dinoBox.y < obsBox.y + obsBox.h &&
    dinoBox.y + dinoBox.h > obsBox.y
  );
}

// --- VÒNG LẶP GAME (GAME LOOP) ---
function spawnObstacles() {
  if (obstacles.length === 0) {
    obstacles.push(new Obstacle());
  } else {
    const lastObs = obstacles[obstacles.length - 1];
    const minGap = 220 + gameSpeed * 12;
    if (canvas.width + 50 - lastObs.x > minGap && Math.random() < 0.03) {
      obstacles.push(new Obstacle());
    }
  }
}

function gameLoop() {
  if (isGameOver) return;

  gameFrame++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameFrame % 5 === 0) {
    score++;
    currentScoreEl.innerText = String(score).padStart(5, '0');

    if (score % 100 === 0 && score > 0) {
      sound.playScore();
    }

    if (score % 250 === 0 && score > 0) {
      isNight = !isNight;
      document.body.classList.toggle('night-mode', isNight);
    }

    if (score % 100 === 0 && gameSpeed < 14) {
      gameSpeed += 0.5;
    }
  }

  drawBackground();

  dino.update();
  dino.draw();

  updateParticles();
  drawParticles();

  spawnObstacles();

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    obs.update();
    obs.draw();

    if (checkCollision(dino, obs)) {
      triggerGameOver();
      return;
    }

    if (obs.x < -60) {
      obstacles.splice(i, 1);
    }
  }

  requestAnimationFrame(gameLoop);
}

// --- GAME OVER & RESET ---
function triggerGameOver() {
  isGameOver = true;
  sound.playHit();

  const container = document.getElementById('canvasContainer');
  container.style.transform = 'translate(4px, -4px)';
  setTimeout(() => container.style.transform = 'translate(-4px, 4px)', 50);
  setTimeout(() => container.style.transform = 'translate(0, 0)', 100);

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('dinoHighScore', highScore);
    highScoreEl.innerText = String(highScore).padStart(5, '0');
  }

  ctx.fillStyle = isNight ? '#ffffff' : '#535353';
  ctx.font = 'bold 26px Courier New';
  ctx.textAlign = 'center';
  ctx.fillText('G A M E   O V E R', canvas.width / 2, canvas.height / 2 - 10);

  ctx.font = '14px Courier New';
  ctx.fillText('Nhấn Space / R / Chạm để chơi lại', canvas.width / 2, canvas.height / 2 + 25);
}

function resetGame() {
  score = 0;
  gameSpeed = GAME_SPEED_START;
  isGameOver = false;
  gameFrame = 0;
  obstacles = [];
  particles = [];
  isNight = false;
  document.body.classList.remove('night-mode');
  currentScoreEl.innerText = '00000';
  dino.y = GROUND_Y - 44;
  dino.isJumping = false;
  dino.duck(false);

  gameLoop();
}

// --- SỰ KIỆN ĐIỀU KHIỂN ---
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    if (isGameOver) resetGame();
    else dino.jump();
  }

  if (e.code === 'ArrowDown') {
    e.preventDefault();
    if (!isGameOver) dino.duck(true);
  }

  if (e.code === 'KeyR' && isGameOver) {
    resetGame();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown') {
    dino.duck(false);
  }
});

const btnJump = document.getElementById('btnJump');
const btnDuck = document.getElementById('btnDuck');

btnJump.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (isGameOver) resetGame();
  else dino.jump();
});

btnDuck.addEventListener('touchstart', (e) => {
  e.preventDefault();
  if (!isGameOver) dino.duck(true);
});

btnDuck.addEventListener('touchend', (e) => {
  e.preventDefault();
  dino.duck(false);
});

canvas.addEventListener('click', () => {
  if (isGameOver) resetGame();
  else dino.jump();
});

// Chạy game
resetGame();

const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const currentScoreDisplay = document.getElementById('currentScore');
const highScoreDisplay = document.getElementById('highScore');
const gameOverText = document.getElementById('gameOverText');
const gameContainer = document.getElementById('gameContainer');

const soundJump = document.getElementById('soundJump');
const soundHit = document.getElementById('soundHit');
const soundScore = document.getElementById('soundScore');

let score = 0;
let highScore = localStorage.getItem('dinoHighScore') || 0;
let isGameOver = false;
let scoreInterval = null;

// Hiển thị kỷ lục ban đầu
highScoreDisplay.innerText = String(highScore).padStart(5, '0');

// Bắt đầu game
function startGame() {
  isGameOver = false;
  score = 0;
  currentScoreDisplay.innerText = '00000';
  gameOverText.style.display = 'none';
  gameContainer.classList.remove('night');
  cactus.classList.add('move');

  // Tính điểm theo thời gian
  clearInterval(scoreInterval);
  scoreInterval = setInterval(() => {
    if (!isGameOver) {
      score++;
      currentScoreDisplay.innerText = String(score).padStart(5, '0');

      // Phát âm thanh mỗi 100 điểm
      if (score % 100 === 0 && score > 0) {
        playSound(soundScore);
      }

      // Đổi giao diện Ngày / Đêm mỗi 300 điểm
      if (score % 300 === 0 && score > 0) {
        gameContainer.classList.toggle('night');
      }
    }
  }, 100);
}

// Nhảy
function jump() {
  if (isGameOver) {
    startGame();
    return;
  }

  if (!dino.classList.contains('jump')) {
    dino.classList.add('jump');
    playSound(soundJump);

    setTimeout(() => {
      dino.classList.remove('jump');
    }, 500);
  }
}

// Phát âm thanh
function playSound(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {}); // Tránh bị chặn bởi chính sách Autoplay của trình duyệt
}

// Kiểm tra va chạm (Collision Detection)
const checkCollision = setInterval(() => {
  if (isGameOver) return;

  const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue('bottom'));
  const cactusRight = parseInt(window.getComputedStyle(cactus).getPropertyValue('right'));

  // Khoảng cách va chạm giữa Khủng long và Xương rồng
  if (cactusRight > 510 && cactusRight < 540 && dinoBottom < 55) {
    endGame();
  }
}, 10);

// Kết thúc trò chơi
function endGame() {
  isGameOver = true;
  cactus.classList.remove('move');
  clearInterval(scoreInterval);
  playSound(soundHit);

  // Hiệu ứng rung khung game
  gameContainer.classList.add('shake');
  setTimeout(() => gameContainer.classList.remove('shake'), 250);

  // Cập nhật kỷ lục điểm (High Score)
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('dinoHighScore', highScore);
    highScoreDisplay.innerText = String(highScore).padStart(5, '0');
  }

  gameOverText.style.display = 'block';
}

// Sự kiện điều khiển (Phím bấm & Cảm ứng di động)
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    jump();
  }
});

document.addEventListener('touchstart', (e) => {
  e.preventDefault();
  jump();
}, { passive: false });

// Tự động chạy khi tải trang
startGame();

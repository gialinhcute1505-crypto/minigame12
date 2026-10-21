* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  user-select: none;
  -webkit-user-select: none;
}

body {
  background-color: #f7f7f7;
  font-family: 'Courier New', Courier, monospace;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow: hidden;
  transition: background-color 1s ease, color 1s ease;
}

/* Chế độ đêm */
body.night-mode {
  background-color: #1a1a1a;
  color: #f7f7f7;
}

.game-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  width: 100%;
  max-width: 800px;
  padding: 10px;
}

.header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

.title {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
}

.score-board {
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 2px;
}

.canvas-container {
  position: relative;
  width: 100%;
  background-color: #ffffff;
  border: 2px solid #535353;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  transition: background-color 1s ease, border-color 1s ease;
}

body.night-mode .canvas-container {
  background-color: #222222;
  border-color: #888888;
  box-shadow: 0 10px 20px rgba(255,255,255,0.05);
}

canvas {
  display: block;
  width: 100%;
  height: 250px;
}

.controls-hint {
  display: flex;
  gap: 15px;
  font-size: 13px;
  opacity: 0.8;
  flex-wrap: wrap;
  justify-content: center;
}

.key {
  background: #e0e0e0;
  color: #333;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  border: 1px solid #ccc;
}

body.night-mode .key {
  background: #444;
  color: #fff;
  border-color: #666;
}

/* Nút điều khiển mobile */
.mobile-controls {
  display: none;
  width: 100%;
  gap: 10px;
  margin-top: 5px;
}

@media (max-width: 768px) {
  .mobile-controls {
    display: flex;
  }
}

.btn-action {
  flex: 1;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  background: #535353;
  color: white;
  border: none;
  border-radius: 6px;
  touch-action: manipulation;
}

.btn-action:active {
  background: #333;
}

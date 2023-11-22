const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lives: document.querySelector("#live"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: null,
    result: 0,
    currentTime: 60,
    nivel: 1,
    life: 3,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;
  state.view.lives.textContent = state.values.life;
  state.view.score.textContent = state.values.result;

  if(state.values.result < 0){
    if(state.values.life > 0){
      state.values.life--;
      state.values.currentTime = 60;
      alert("Você pedeu 1 vida 😢");  
      state.values.result = 0;
    } else if( state.values.life == 0){
      alert("Game Over");
      playSound("gameover");
      resetGame();
    }
  }

  if (state.values.currentTime == 0 && state.values.life > 0) {
    let nextLevel = state.values.nivel++;
    alert("Nível " + nextLevel + "\n" + "YOUR SCORE: " + state.values.result);
    state.values.gameVelocity += 500;    
    state.values.currentTime = 60;
  } else if (state.values.currentTime === 0 || state.view.lives == 0) {
    alert("Game Over" + "\n" + "YOUR SCORE: " + state.values.result);
    playSound("gameover");
    resetGame();
  }
}

function resetGame() {
  state.values.currentTime = 60;
  state.view.score.innerHTML = 0;
  state.view.lives.innerHTML = 3;
  state.values.life = 3;
  state.values.result = 0;
}

function playSound(audioName) {
  let audio = new Audio(`./src/sounds/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  })

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      state.view.score.textContent = state.values.result;
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        //para limpar a posição do inimigo
        state.values.hitPosition = null;
        playSound("hit");
      } else {
        playSound("error");
        state.values.result--;
      }
    });
  });
}

function main() {
  addListenerHitBox();
};

main();
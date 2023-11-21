const state = {
  view: {
    square: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
  },
  values: {
    timerId: null,
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
  }
};

function main(){
  moveEnemy();
  addListenerHitBox();
};

function randomSquare() {
  state.view.square.forEach((square) => {
    square.classList.remove("enemy");
  })

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.square[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.square.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result ++;
        state.view.score.textContent = state.values.result;
        //para limpar a posição do inimigo
        state.values.hitPosition = null;
      }
    });
  });
}

main();
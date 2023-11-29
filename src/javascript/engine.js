const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
      timerId: null,
      countDownTimerId: setInterval(countDown, 1000),
      gameVelocity: 1000,
      hitPosition: 0,
      result: 0,
      curretTime: 60,
    },
};

function gameOver(){
    let audio2 = new Audio("./src/audio/GameOver.mp3");
    audio2.play();
}

function countDown(){
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if(state.values.curretTime == 0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
        gameOver();
    }
}

function playSound(){
    let audio = new Audio("./src/audio/efeitosonoro.mp3");
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
};

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
               state.values.result++
               state.view.score.textContent = state.values.result;
               state.values.hitPosition = null; 
               playSound();
            }
        });
    });
}

function initialize(){
    moveEnemy();
    addListenHitBox();
}

initialize();
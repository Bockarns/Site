"use strict";

//Selecting Elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//Starting condition

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//Rolling dice functions
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./images/dices-img/dice-${dice}.png`;

    //3. Check for rolled 1: if true ,
    if (dice != 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active players score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
    //Finish game
    //switch to next player
  }
});
btnNew.addEventListener("click", init);
// {

// scores[0] = 0;
// scores[1] = 0;
// document.getElementById(`current--${activePlayer}`).textContent = 0;
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.remove('player--winner');
// document
//   .querySelector(`.player--${activePlayer}`)
//   .classList.remove('player--active');
// document.querySelector(`.player--1`).classList.add('player--active');
// document.getElementById(`score--0`).textContent = 0;
// document.getElementById(`score--1`).textContent = 0;
// diceEl.classList.add('hidden');
// if ((activePlayer = 1)) {
//   switchPlayer();
// }
// playing = true;
// });

const startButton = document.querySelector("#start-btn");
const timer = document.querySelector("#timer");
const timeDisplay = document.querySelector(".time-display");
const timeLeft = document.querySelector("#time-left");
const cardsHolder = document.querySelector(".cards");
const cards = document.querySelectorAll(".card");
const flipCounter = document.querySelector("#flip-number");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const buttonClosePopup = document.querySelector(".close-popup");

//Deklarering av variablar som används i olika funkktioner.
let firstCardPick = null;
let secondCardPick = null;
let pairedCards = 0;
const totalPaires = cards.length / 2;
let disablePairdCards = true;
let time = 0;
let timerInterval;
let flips = 0;

//Array med bildernas src, för att de ska kunna loopas in i DOMen i shuffle funktionen
const imageArray = [
  "./images/memory-img/img7.jpg",
  "./images/memory-img/img8.jpg",
  "./images/memory-img/img9.jpg",
  "./images/memory-img/img10.jpg",
  "./images/memory-img/img11.jpg",
  "./images/memory-img/img12.jpg",
];

//Funktionen som knappen starta kallar på för att starta spelet,
function startGame() {
  newGame();
  timerCounter();
  InitiateCards();
}

//hämta korten från arrayn och koppla dom till DOMen
function InitiateCards() {
  const backImages = [...imageArray, ...imageArray]; //läs in arrayn i en variabel
  shuffleCards(backImages); //Blanda korten
  //Loopa igenom och ersätt dom hårdkodade src, med indexen från arrayn
  cards.forEach((card, index) => {
    const img = card.querySelector(".back-view img");
    img.src = backImages[index];
  });
}

//Blanda kort funktion
function shuffleCards(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//Funktion för att starta en ny omgång.
function newGame() {
  clearInterval(timerInterval);
  pairedCards = 0;
  flips = 0;
  flipCounter.textContent = flips;
  resetTurns();
  cards.forEach((card) => {
    card.classList.remove("shake", "flip");
  });
}

//Flip funktionen
function filpCards(e) {
  const card = e.target.closest(".card");
  if (disablePairdCards) return;
  if (card.classList.contains("flip")) return;
  card.classList.add("flip");
  if (!firstCardPick) {
    firstCardPick = card;
    return;
  }
  secondCardPick = card;
  flips++;
  flipCounter.textContent = flips;
  checkIfPair();
}

//Funktion för att kontrollera flippat kort 1 och flippat kort 2 matchar
function checkIfPair() {
  const cardFliped1 = firstCardPick.querySelector(".back-view img").src;
  const cardFliped2 = secondCardPick.querySelector(".back-view img").src;
  if (cardFliped1 === cardFliped2) {
    pairedCards++;
    if (pairedCards === totalPaires) {
      openPopup(
        `Grattis 🥳!!! Du vann med ${time} sekunder kvar, du behövde bara ${flips} vändor för att hitta alla par.`,
      );
      clearInterval(timerInterval);
    } else {
      resetTurns();
    }
  } else {
    unFlipCards();
  }
}

// Funktion för att vända tillbaka korten, lägg till skakfuntion.
function unFlipCards() {
  disablePairdCards = true;
  firstCardPick.classList.add("shake");
  secondCardPick.classList.add("shake");
  setTimeout(() => {
    firstCardPick.classList.remove("shake", "flip");
    secondCardPick.classList.remove("shake", "flip");
    resetTurns();
  }, 1000);
}

//Funktion för att räkna ner tid.
function timerCounter() {
  time = timer.value;
  timeDisplay.classList.remove("hidden");
  timerInterval = setInterval(() => {
    time--;
    timeLeft.textContent = time;
    if (time === 0) {
      openPopup(
        `Tiden är slut 😢, du hade ${
          totalPaires - pairedCards
        } par kvar att hitta. Försök igen`,
      );
      disablePairdCards = true;
      clearInterval(timerInterval);
    }
  }, 1000);
}

//Funktion som resetar turen efter två vända kort.
function resetTurns() {
  firstCardPick = null;
  secondCardPick = null;
  disablePairdCards = false;
}

//popup rutan (Modal)
function openPopup(won) {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
  const popupText = popup.querySelector(".popup-text");
  popupText.textContent = won;
}

//stäng popuprutan (Modal)
function closePopup() {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
}

//EventListeners
startButton.addEventListener("click", startGame);
cardsHolder.addEventListener("click", filpCards);
overlay.addEventListener("click", closePopup);
buttonClosePopup.addEventListener("click", closePopup);

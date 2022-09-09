const playBtn = document.getElementById("play-btn");
const game = document.getElementById("game");
const home = document.getElementById("home-container");
const playAgainBtn = document.querySelector("#play-again-btn");

playBtn.addEventListener("click", displayGame);

function displayGame() {
  game.style.display = "block";
  home.style.display = "none";
}

// Word
const words = [
  "apple",
  "potato",
  "chicken",
  "game",
  "window",
  "butterfly",
  "orange",
  "keyboard",
  "laptop",
  "cupcake",
];

const wordContainer = document.querySelector("#word");

let randomWord = "";
let wordParagraph;

function generateWord() {
  wordParagraph = document.createElement("p");
  wordContainer.className = "word";
  randomWord = words[Math.floor(Math.random() * words.length)];

  for (let letter of randomWord) {
    wordParagraph.innerText += "_";
    wordContainer.appendChild(wordParagraph);
  }
}
generateWord();

const wrongLettersHtml = document.getElementById("wrong-letters");
const imagesContainer = document.querySelector("#images");
const finalMessage = document.querySelector("#final-message");
const wordReveal = document.querySelector("#final-word");

// Keyboard
const letters = [
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
];

const keyboard = document.querySelector("#keyboard");
const keysRows = document.querySelectorAll(".key-row");
const [keysRow1, keysRow2, keysRow3] = [...keysRows];

let lettersMoreThan1;

function generateMap() {
  lettersMoreThan1 = [];
  const map = new Map();
  for (let letter of randomWord) {
    if (!map.has(letter)) {
      map.set(letter, 1);
    } else {
      map.set(letter, map.get(letter) + 1);
    }
  }

  for (let [key, value] of map.entries()) {
    if (value > 1) {
      lettersMoreThan1.push(key);
    }
  }
}

generateMap();

let wrongKeysPressed = [];

for (let i = 0; i < letters.length; i++) {
  const keyBtn = document.createElement("button");
  keyBtn.innerText = letters[i];
  keyBtn.className = "keyBtn";

  if (i <= 9) {
    keysRow1.appendChild(keyBtn);
  } else if (i > 9 && i <= 18) {
    keysRow2.appendChild(keyBtn);
  } else {
    keysRow3.appendChild(keyBtn);
  }

  keyBtn.addEventListener("click", (event) => {
    const keyPressed = event.target.innerText;

    let index;
    const indexes = [];

    if (!lettersMoreThan1.includes(keyPressed)) {
      index = randomWord.indexOf(keyPressed).toString();
    } else {
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === keyPressed) {
          indexes.push(i);
        }
      }
    }

    let wordText = wordParagraph.innerText;

    if (randomWord.includes(keyPressed)) {
      if (index) {
        wordText =
          wordText.slice(0, +index) + keyPressed + wordText.slice(+index + 1);
        wordParagraph.innerText = wordText;
      } else {
        for (let i = 0; i < indexes.length; i++) {
          wordText =
            wordText.slice(0, indexes[i]) +
            keyPressed +
            wordText.slice(indexes[i] + 1);
          wordParagraph.innerText = wordText;
        }
      }
    }

    if (!randomWord.includes(keyPressed)) {
      if (!wrongKeysPressed.includes(keyPressed)) {
        wrongKeysPressed.push(keyPressed);
      }

      wrongLettersHtml.innerText = `Wrong letters used: ${wrongKeysPressed}`;

      imagesContainer.innerHTML = `<img src="/media/images/img${
        wrongKeysPressed.length + 1
      }.jpg" alt="" class="img">`;
    }

    if (wrongKeysPressed.length === 7) {
      wrongLettersHtml.classList.add("hidden");
      keyboard.classList.add("hidden");
      finalMessage.innerHTML = "You lost!";
      finalMessage.style.color = "red";
      wordReveal.innerHTML = `The word was <em>${randomWord}</em>.`;
      playAgainBtn.classList.remove("hidden");
    }

    if (!wordParagraph.innerText.includes("_")) {
      wrongLettersHtml.classList.add("hidden");
      keyboard.classList.add("hidden");
      finalMessage.innerHTML = "You won!";
      finalMessage.style.color = "green";
      playAgainBtn.classList.remove("hidden");
    }

    console.log(wordParagraph.innerText);
  });
}

function resetGame() {
  wordParagraph.innerHTML = "";
  generateWord();
  generateMap();
  wrongKeysPressed = [];
  imagesContainer.innerHTML = `<img src="/media/images/img1.jpg" alt="" class="img">`;
  wrongLettersHtml.innerText = "";
  wrongLettersHtml.classList.remove("hidden");
  keyboard.classList.remove("hidden");
  finalMessage.innerHTML = "";
  wordReveal.innerHTML = "";
  playAgainBtn.classList.add("hidden");
}

playAgainBtn.addEventListener("click", resetGame);

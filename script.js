"use strict";

const timerEl = document.querySelector(".time-counter");
const getKeyboard = document.querySelector(".keyboard");
const highlightedKey = document.querySelector(".selected");
const sliderValue = document.querySelector(".slider");
const topSpeedEl = document.querySelector("#top-speed");
const avgSpeedEl = document.querySelector("#avg-speed");

const timeStamp = [];
const avgTimeArr = [];
// const soundVolume = function () {
//   console.log(sliderValue.value);
//   addEventListener('change', ())
//   sliderValue.value = audio.volume;
// };

//TIMER
// let count = 0;
// const timer = setInterval(() => {
//   console.log(count);
//   count++;
// }, 1000);

// select keys
const keys = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

//scores
let score = 0;
const scoreEl = document.getElementById("score");
//best score
let bestScore = score;
const bestScoreEl = document.getElementById("best-score");
//top speed
let topSpeed = 10000;

// random number function
const getRandomNumber = function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

// assign random number to key
function getRandomKey() {
  return keys[getRandomNumber(0, keys.length - 1)];
}

// use function to getrandomkey and set class to choosen key
function printRandomKey() {
  const key = document.getElementById(getRandomKey());
  key.classList.add("selected");
}

// MAIN FUNCTION
document.addEventListener("keydown", (e) => {
  const typedKey = String.fromCharCode(e.keyCode);

  // console.log(typedKey);
  const keyEl = document.getElementById(typedKey);
  const highlightedKey = document.querySelector(".selected");

  //pressing key effected
  keyEl.classList.add("pressed");
  setTimeout(function () {
    keyEl.classList.remove("pressed");
  }, 10);

  // KEYBOARD SOUND ON/OFF

  if (isSoundOn === true) {
    myPlay();
  }

  // KEYBOARD SOUNDS

  function myPlay() {
    const audioSelect = getRandomNumber(0, 2);
    var audio = new Audio("keysound.wav");
    var audio1 = new Audio("keysound2.wav");
    audio.play();

    audio.volume = sliderValue.value / 100;

    // audio.volume = setVolume();

    // random sound function
    if (audioSelect === 1) {
      audio1.play();
    } else {
      audio.play();
    }
  }
  // WRONG ANSWER SOUND FUNCTION
  function playWrong() {
    var audioWrongKey = new Audio("wrong.wav");

    audioWrongKey.volume = sliderValue.value / 100;
    audioWrongKey.play();
  }

  // SCORES AND BESTSCORES

  // IF CORRECT

  if (typedKey === highlightedKey.innerHTML) {
    highlightedKey.classList.remove("selected");
    score++;
    printRandomKey();
    scoreEl.innerHTML = `Score: ${score}`;

    // TIMER FUNCTION

    const date = new Date();
    const startTime = date.getTime();
    timeStamp.push(startTime);

    if (timeStamp.length > 10) {
      timeStamp.shift();
    }
    // CALCULATE CURRENT SPEED
    const timeStampStart = timeStamp[timeStamp.length - 1];
    const timeStampStop = timeStamp[timeStamp.length - 2];
    const currentTime = timeStampStart - timeStampStop;

    avgTimeArr.push(currentTime);

    if (avgTimeArr.length > 11) {
      avgTimeArr.shift();
      const avgTimeArrSum = avgTimeArr.reduce(function (a, b) {
        return a + b;
      }, 0);
      const avgTime = Math.floor(avgTimeArrSum / avgTimeArr.length);
      avgSpeedEl.innerHTML = `Avg Speed: ${avgTime}`;
    } else avgSpeedEl.innerHTML = `Avg Speed: ...`;
    //PRINT CURRENT SPEED
    console.log(currentTime);
    if (isNaN(currentTime)) {
      timerEl.innerHTML = `0`;
    } else timerEl.innerHTML = `${currentTime} ms`;

    //STYLE CURRENT SPEED
    if (currentTime > 1000) {
      timerEl.style.backgroundColor = "rgba(255, 0, 0, 0.486)";
    } else if ((currentTime < 1000) & (currentTime > 650)) {
      timerEl.style.backgroundColor = "rgba(255, 217, 0, 0.5)";
    } else if (currentTime <= 650) {
      timerEl.style.backgroundColor = "rgba(0, 128, 0, 0.5)";
    }

    //PRINT TOP SPEED
    if (topSpeed > currentTime) {
      topSpeed = currentTime;
      topSpeedEl.innerHTML = `Top Speed: ${topSpeed}`;
    }

    //PRINT AVG SPEED

    //PRINT BEST SCORE

    if (bestScore < score) {
      bestScore = score;
      bestScoreEl.innerHTML = `Best Score: ${bestScore}`;
    }

    // IF NOT CORRECT
  } else if (typedKey !== highlightedKey.innerHTM) {
    //wrong sound
    if (isSoundOn === true) {
      playWrong();
    }
    // RESET SCORE
    score = 0;
    scoreEl.innerHTML = `Score: ${score}`;
    getKeyboard.style.boxShadow = "var(--lvl-0-boxshadow";

    //RESET SPEED
    timerEl.innerHTML = 0;
    timerEl.style.backgroundColor = "";
  }

  // SCORE EFFECTS
  if (score > 9 && score <= 29) {
    const highlightedKey = document.querySelector(".selected");
    getKeyboard.style.boxShadow = "var(--lvl-1-boxshadow)";
  } else if (score >= 30 && score < 49) {
    const highlightedKey = document.querySelector(".selected");
    getKeyboard.style.boxShadow = "var(--lvl-2-boxshadow)";
  } else if (score >= 50 && score < 69) {
    const highlightedKey = document.querySelector(".selected");
    getKeyboard.style.boxShadow = "var(--lvl-3-boxshadow)";
  } else if (score >= 70 && score < 99) {
    const highlightedKey = document.querySelector(".selected");
    getKeyboard.style.boxShadow = "var(--lvl-4-boxshadow)";
  } else if (score >= 100) {
    const highlightedKey = document.querySelector(".selected");
    getKeyboard.style.boxShadow = "var(--lvl-5-boxshadow)";
  }
});

printRandomKey();

// sounds function
const soundSwitch = document.getElementById("sound");
let isSoundOn = true;

//mute / unmute
const checkSoundOn = soundSwitch.addEventListener("change", (e) => {
  if (e.target.checked) {
    isSoundOn = true;
  } else {
    isSoundOn = false;
  }
});

// volume slider
const setVolume = sliderValue.addEventListener("change", () => {
  console.log(sliderValue.value);
});

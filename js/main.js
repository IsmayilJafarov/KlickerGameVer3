//global variables
let stopwatch = document.getElementById('stopwatch');
let mainButton = document.getElementById('main-btn');
let stopButton = document.getElementById('stop-btn');
let startTime = 0;
let elapsedTime = 0;
let timeoutId = null;


const colors = ['#009b48', '#b71234', '#ffd500', '#0046ad', '#000000',];
const btn = document.querySelectorAll('.square');
let allArea = document.querySelector('.grid-area');
let finalColor = colors[Math.floor(Math.random() * colors.length)];
let lastColor = null; // to keep track of the last color applied

function mainStop() {
  clearTimeout(timeoutId);
}

function reset() {
  elapsedTime = 0;
  startTime = Date.now();
  clearTimeout(timeoutId);
  mainButton.innerHTML = 'Start';
  displayTime(0, 0, 0, 0);
}

function startStopwatch() {
  timeoutId = setTimeout(function () {
    const time = Date.now() - startTime + elapsedTime;

    const milliseconds = parseInt((time % 1000) / 10);
    const seconds = parseInt((time / 1000) % 60);
    const minutes = parseInt((time / (1000 * 60)) % 60);
    const hour = parseInt((time / (1000 * 60 * 60)) % 24);

    displayTime(hour, minutes, seconds, milliseconds);

    startStopwatch();
  }, 100);
}

function displayTime(hour, minutes, seconds, milliseconds) {
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
  stopwatch.innerHTML = hour + ':' + minutes + ':' + seconds + ':' + milliseconds;
}

let isFirstButtonClick = true;



const btnColors = [];

btn.forEach((btn) => {
  btnColors.push('#fcfcfc');
  
  btn.onclick = function () {
    if (isFirstButtonClick) {
      startTime = Date.now();
      startStopwatch();
      isFirstButtonClick = false;
    }

    function randomColor() {
      do {
        finalColor = colors[Math.floor(Math.random() * colors.length)];
      } while (finalColor === lastColor);
      lastColor = finalColor;
      btnColors[btnColors.indexOf(prevColor)] = newColor;
      btn.style.backgroundColor = newColor;
      checkAndReactToButtonColors();
    }
    randomColor();
  };
});


// Функция для проверки цветов кнопок и остановки таймера при необходимости
function checkAndReactToButtonColors() {
  const firstButtonColor = btn[0].style.backgroundColor;

  const areAllSameColor = [...btn].every(btn => {
    return btn.style.backgroundColor === firstButtonColor;
  });

  if (areAllSameColor) {
    mainStop();
  }
}

// Функция для установки случайного цвета на кнопку и вызов проверки
function setRandomColorAndCheck(btn) {
  const prevColor = btn.style.backgroundColor;
  let newColor;

  do {
    newColor = colors[Math.floor(Math.random() * colors.length)];
  } while (newColor === prevColor);

  btn.style.backgroundColor = newColor;
  checkAndReactToButtonColors();
}

btn.forEach((btn) => {
  btn.onclick = function () {
    if (isFirstButtonClick) {
      startTime = Date.now();
      startStopwatch();
      isFirstButtonClick = false;
    }

    setRandomColorAndCheck(btn); // Установить цвет и проверить
  };
});



function checkAndReactToButtonColors() {
  if (btn.length === 0) {
    console.log("На странице нет кнопок");
    return;
  }

  function areAllButtonsSameColor() {
    const firstButtonColor = window.getComputedStyle(btn[0]).getPropertyValue('background-color');
  
    const areAllSameColor = [...btn].every(btn => {
      const computedColor = window.getComputedStyle(btn).getPropertyValue('background-color');
      return computedColor === firstButtonColor;
    });
  
    console.log(areAllSameColor);
    if (areAllSameColor){
      mainStop()
    }
  }
  
  if (areAllButtonsSameColor()) {
    mainStop() // Остановка таймера, так как игра завершена
  }
}
checkAndReactToButtonColors();

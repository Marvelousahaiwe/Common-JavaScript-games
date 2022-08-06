const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const play = document.querySelector('#play');
const reset = document.querySelector('#reset')
const pause = document.querySelector('#pause')


let result = 0;
let hitPosition;
let timerId = null;
let currentTime = 60;




function randomSquare() {
  squares.forEach(square => {
    square.classList.remove('mole');
  })

  let randomSquare = squares[Math.floor(Math.random() * 9)]
  randomSquare.classList.add('mole');
  hitPosition = randomSquare.id
}

squares.forEach(square => {
  square.addEventListener('mousedown', () => {
    if (square.id == hitPosition) {
      result++;
      score.textContent = result;
      hitPosition = null;
    }
  })
})
function countdown() {
  currentTime--;
  timeLeft.textContent = currentTime
  if (currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId);
    alert('GAME OVER! your finally score is ' + result)
  }
}


let countDownTimerId = setInterval(countdown, 1000);


// play.setAttribute('disabled', 'true')
// var go = 0

// function waitforme() {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve('')
//     })
//   })
// }
// function eventt() {
//   return new Promise(resolve => {
//     let playbuttonclick = function () {
//       pause.removeAttribute('disabled')
//       play.setAttribute('disabled', 'true')
//       play.removeEventListener('click', playbuttonclick);
//       go = 1;
//       resolve('resolved');
//     }; play.addEventListener('click', playbuttonclick)
//   });
// }
// pause.addEventListener('click', function () {
//   go = 1;
//   pause.setAttribute('disabled', 'true');
//   play.removeAttribute('disabled')
// })
// async function startGame() {
//   timerId = setInterval(randomSquare, 500);
// let countDownTimerId = setInterval(countdown, 1000);


//   await waitforme(1000);
//   if (go == 1) await eventt()
// }


function startGame() {
  timerId = setInterval(randomSquare, 500);
  // let countDownTimerId = setInterval(countdown, 1000);
}

startGame()
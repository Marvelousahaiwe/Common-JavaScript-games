const gridDisplay = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score')
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300
const ballDiameter = 15
let score = 0

const userStart = [230, 10];
let currentPosition = userStart;

const ballStart = [270, 40];
let ballCurrentPosition = ballStart;

let timeId
let xDirection = -2;
let yDirection = 2

// creating a block class
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth,
    yAxis + blockHeight]
  }

}
// all my blocks
const blocks = [
  new Block(10, 270),
  new Block(120, 270),
  new Block(230, 270),
  new Block(340, 270),
  new Block(450, 270),
  new Block(10, 240),
  new Block(120, 240),
  new Block(230, 240),
  new Block(340, 240),
  new Block(450, 240),
  new Block(10, 210),
  new Block(120, 210),
  new Block(230, 210),
  new Block(340, 210),
  new Block(450, 210),
  // new Block(10, 180),
  // new Block(120, 180),
  // new Block(230, 180),
  // new Block(340, 180),
  // new Block(450, 180),
];


// drawing all my blocks
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    gridDisplay.appendChild(block);
  }
}
addBlocks()
// create user
const user = document.createElement('div');
user.classList.add('user');
drawUser()
gridDisplay.appendChild(user);

// draw user
function drawUser() {
  user.style.left = currentPosition[0] + 'px';
  user.style.bottom = currentPosition[1] + 'px'
}

// move user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10
        drawUser()
      }
      break;
    case 'ArrowRight':
      if (currentPosition[0] < boardWidth) {
        currentPosition[0] += 10
        drawUser()
      }
      break;
  }
}
document.addEventListener('keydown', moveUser);

// create ball
const balls = document.createElement('div')
balls.classList.add('ball')
ballDraw()
gridDisplay.appendChild(balls)



function ballDraw() {
  balls.style.left = ballCurrentPosition[0] + 'px'
  balls.style.bottom = ballCurrentPosition[1] + 'px'
}

// move the ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  ballDraw()
  checkForCollusions()
}

timeId = setInterval(moveBall, 30);

// check  for collusion
function checkForCollusions() {
  // check for block collutons 
  for (let i = 0; i < blocks.length; i++) {
    if (
      (ballCurrentPosition[0] > blocks[i].bottomLeft[0]
        && ballCurrentPosition[0] < blocks[i].bottomRight[0])
      && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1]
        && ballCurrentPosition[1] < blocks[i].topLeft[1])) {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      console.log(allBlocks);
      allBlocks[i].classList.remove('block')
      blocks.splice(i, 1)
      changeDirection()
      score++;
      scoreDisplay.innerHTML = score;

      //check for win
      if (blocks === 0) {
        scoreDisplay.innerHTML = 'You Win';
        clearInterval(timeId)
        document.removeEventListener('keydown', moveBall)
      }

    }


  }
  if ((ballCurrentPosition[0] >= (boardWidth - ballDiameter))
    || ballCurrentPosition[1] >= (boardHeight - ballDiameter)
    || ballCurrentPosition[0] <= 0) {
    changeDirection()
  }

  // Game over
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timeId)
    // alert('GAme Over')
    scoreDisplay.textContent = 'You Lose';
    document.removeEventListener('keydown', moveUser)

  }
  //  check for user collution with the ball
  if (
    (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
  ) {
    changeDirection()
  }
}



function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
  }

} 
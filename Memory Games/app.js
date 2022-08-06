const cardArray = [
   {
      name: 'fries',
      img: 'images/fries.png'
   },
   {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
   },
   {
      name: 'hotdog',
      img: 'images/hotdog.png'
   },
   {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
   },
   {
      name: 'milkshake',
      img: 'images/milkshake.png'
   },
   {
      name: 'pizza',
      img: 'images/pizza.png'
   },
   {
      name: 'fries',
      img: 'images/fries.png'
   },
   {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
   },
   {
      name: 'hotdog',
      img: 'images/hotdog.png'
   },
   {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
   },
   {
      name: 'milkshake',
      img: 'images/milkshake.png'
   },
   {
      name: 'pizza',
      img: 'images/pizza.png'
   },
]
cardArray.sort(() => 0.5 - Math.random());
let cardsChoosen = [];
let cardChoosenIds = [];
const cardsWon = [];

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');

function createBorad() {
   for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'images/blank.png');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      gridDisplay.appendChild(card);
   }
}
createBorad();

function checkMatch() {
   const cards = document.querySelectorAll('img');
   const optionOneId = cardChoosenIds[0];
   const optionTwoId = cardChoosenIds[1];
   if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', 'images/blank.png');
      cards[optionTwoId].setAttribute('src', 'images/blank.png');
      alert(' you sellect same cards!');
   }

   console.log(cards);
   if (cardsChoosen[0] == cardsChoosen[1]) {
      alert('is a match');
      cards[cardChoosenIds[0]].setAttribute('src', 'images/white.png');
      cards[cardChoosenIds[1]].setAttribute('src', 'images/white.png');
      cards[cardChoosenIds[0]].removeEventListener('click', flipCard);
      cards[cardChoosenIds[1]].removeEventListener('click', flipCard);
      cardsWon.push(cardsChoosen)
   } else {
      cards[optionOneId].setAttribute('src', 'images/blank.png')
      cards[optionTwoId].setAttribute('src', 'images/blank.png')
      alert('Sorry try again!')
      cardArray.sort(() => 0.5 - Math.random());

   }
   resultDisplay.textContent = cardsWon.length;
   cardsChoosen = [];
   cardChoosenIds = [];

   if (cardsWon.length == cardArray.length / 2) {
      resultDisplay.textContent = 'Congrate, You have found them all!';
   }
}


function flipCard() {
   const cardId = this.getAttribute('data-id');
   cardsChoosen.push(cardArray[cardId].name);
   cardChoosenIds.push(cardId);

   this.setAttribute('src', cardArray[cardId].img);
   if (cardsChoosen.length === 2) {
      setTimeout(checkMatch, 500)
   }
} 
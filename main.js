let firstCard,
   secondCard,
   lockBoard = true,
   hasFlippedCard = false,
   numberFlippedCards = 0,
   gameWinned = false;

const gameStatus = document.querySelector('.status');

window.onload = function()
{

}


window.addEventListener('DOMContentLoaded', () => {

   const startBtn = document.querySelector('.start-game');

   startBtn.addEventListener('click', () => {
      lockBoard = false;
      shuffle();
      setTimer();
      gameStatusChange('Game Started.Hurry up!');
      cards.forEach(elem => elem.classList.remove('flip'));
   });

   const cards = document.querySelectorAll('.memory-card');

   cards.forEach(elem => elem.addEventListener('click', flip));


   function flip() {
      if (lockBoard) return;

      this.classList.add('flip');

      if (this === firstCard) return;


      if (!hasFlippedCard) {
         hasFlippedCard = true;
         firstCard = this;

         return;
      }

      secondCard = this;

      checkForMatch();
      checkForWin();
   }

   function checkForMatch() {

      let isMatch = firstCard.dataset.number === secondCard.dataset.number;

      isMatch ? blockCards() : unflipCards();

   }

   function blockCards() {
      firstCard.removeEventListener('click', flip);
      secondCard.removeEventListener('click', flip);

      numberFlippedCards += 2;

      resetBoard();
   }

   function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
         firstCard.classList.remove('flip');
         secondCard.classList.remove('flip');

         resetBoard();
      }, 1000);
   }

   function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];

      //a = b = false;
   }

   function shuffle() {
      cards.forEach(elem => {
         let number = Math.floor(Math.random() * 12);
         elem.style.order = number;
      });
   }

   function setTimer() {
      let a = 30;
      let timer = document.querySelector('.timer');


      let interval = setInterval(() => {
         --a;
         timer.innerHTML = a;
         if (a <= 0) {
            clearInterval(interval);
            lockBoard = true;
            gameStatusChange('You lost!(Try one more time!');
         } else if (gameStatus.textContent == 'You won!Congrats!') {
            clearInterval(interval);
         }
      }, 1000);
   } 

   function gameStatusChange(message) {
      gameStatus.textContent = message;
      gameStatus.classList.remove('jump');
   }

   function checkForWin() {
      if (numberFlippedCards == 12) {
         gameStatusChange('You won!Congrats!');
      }
   }





});
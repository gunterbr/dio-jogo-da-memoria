const cards = document.querySelectorAll('.card');
const congrats = document.getElementById('congrats');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard () {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    hasFlippedCard = false;

    checkMath();
}

function checkMath() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    resetflipCard();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function resetflipCard() {
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
}

(function reOrder() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

function fimDeJogo() {
    let nodeElement = [...cards].filter((item) => {
        return item.matches(".flip");
    });
    if(nodeElement.length == cards.length) {
        cards.forEach(elementos => {
            elementos.classList.add('dissolver');
            elementos.children[0].classList.add('dissolver');
            elementos.children[1].style.display = 'none';

            setTimeout(function(){
                elementos.classList.remove('dissolver');
                elementos.children[0].classList.remove('dissolver');
                elementos.style.display = 'none';
                setTimeout(function(){
                    congrats.style.display = 'flex';
                },500);
            },2000);
        });
    };
}

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
    card.addEventListener('click', fimDeJogo);
})


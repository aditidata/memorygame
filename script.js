const emojis = ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😇', '😈', '😉' ];

let cards = [];
let score = 0;

function resetGame() {
    score = 0;
    updateScore();
    cards = createCards();
    renderCards();
}

function createCards() {
    const pairs = emojis.concat(emojis); // Duplicate emojis to create pairs
    return pairs.map(emoji => ({ emoji, flipped: false, matched: false }));
}

function renderCards() {
    const gameGrid = document.getElementById('game-grid');
    gameGrid.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        if (card.flipped || card.matched) {
            cardElement.textContent = card.emoji;
        }
        cardElement.addEventListener('click', () => flipCard(index));
        gameGrid.appendChild(cardElement);
    });
}

function flipCard(index) {
    if (cards[index].flipped || cards[index].matched) {
        return;
    }
    cards[index].flipped = true;
    renderCards();
    const flippedCards = cards.filter(card => card.flipped && !card.matched);
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        if (firstCard.emoji === secondCard.emoji) {
            firstCard.matched = true;
            secondCard.matched = true;
            score++;
            updateScore();
        } else {
            setTimeout(() => {
                firstCard.flipped = false;
                secondCard.flipped = false;
                renderCards();
            }, 1000);
        }
    }
    checkGameEnd();
}

function updateScore() {
    document.getElementById('score').textContent = score;
}

function checkGameEnd() {
    if (cards.every(card => card.matched)) {
        setTimeout(() => {
            alert('Congratulations! You won!');
        }, 500);
    }
}

resetGame(); // Initialize the game when the page loads


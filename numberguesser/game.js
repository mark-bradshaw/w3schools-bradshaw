const questionParagraph = document.getElementById('question');
const guessInput = document.getElementById('guess');
const responseHeader = document.getElementById('response');
const gameScreen = document.getElementById('gamescreen');
const introScreen = document.getElementById('introscreen');

let randomNumber;

// Start up the game.
newNumber();

function checkGuess() {
    const guess = guessInput.value;
    guessInput.value = '';

    if (guess == randomNumber) {
        responseHeader.innerText = 'You win!  Try a new number.';
        newNumber();
    } else {
        responseHeader.innerText = 'Wrong.  Try again.';
    }

    guessInput.focus();

    setTimeout(() => {
        responseHeader.innerText = '';
    }, 1500)
}

function newNumber() {
    randomNumber = gimmeRandomNumber(1, 15);
    questionParagraph.innerText =
        'What is this number in decimal: ' + randomNumber.toString(2) + '?' + ' good luck';
}

function gimmeRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function noWords() {
    responseHeader.innerText = '';
}

function startGame() {
    introScreen.style.display = 'none';
    gameScreen.style.display = 'block';
}
function showIntro() {
    introScreen.style.display = 'block';
    gameScreen.style.display = 'none';
}
function startHardGame () {
    introScreen.style.display = 'none';
    gameScreen.style.display = 'block';
}
// Create array of possible word choices
var wordChoices = ["CAT", "DOG", "MOUSE"];
var word = "";
var wordArray = [];
var userWord = "";
var userWordArray = [];
// Create array for letters guessed -> will want to display this but only display the letters not in the word array
var lettersGuessed = [];
// Start counting guesses remaining
var guessesRemaining = 3;
// Tracking Wins/Loses
var win = 0;
var lose = 0;

// Reset for next game
function reset () {
    word = "";
    wordArray = [];
    userWord = "";
    userWordArray = [];
    lettersGuessed = [];
    guessesRemaining = 3;
}
// Pick a random word from the array and assign it as the one trying to be guessed
function newWord() {
    reset ();
    word = wordChoices[Math.floor(Math.random() * wordChoices.length)];

    // //Turn this word into an array of letters
    wordArray = word.split("");
    console.log(wordArray);
    //Display the # of blanks in the word
    for (var i = 0; i < wordArray.length; i++) {
        userWordArray.push(" _ ");
    }
    $("#userWord").html(userWordArray);
    //Display guesses remaining
    console.log("guessesRemaining" + guessesRemaining);
    //Display letters guessed
    console.log("letterGuessed:" + lettersGuessed)
}

// Check to see if letter guessed has been guessed before
function checkGuessedBefore(userGuess) {
    guessed = false;
    for (i = 0; i < lettersGuessed.length; i++) {
        if (userGuess === lettersGuessed[i]) {
            alert("Letter " + lettersGuessed[i] + " has already been guessed. Guess another letter.");
            guessed = true;
            return;
        }
    }

    for (i = 0; i < userWordArray.length; i++) {
        if (userGuess === userWordArray[i]) {
            alert("Letter " + userWordArray[i] + " has already been guessed correctly.");
            guessed = true;
            return;
        }
    }
}

// Check to see if the letter is correct or incorrect
function checkGuess(userGuess) {
    var gotOne = false;
    for (i = 0; i < wordArray.length; i++) {
        // If correct, display where that letter appears
        if (userGuess === wordArray[i]) {
            userWordArray.splice(i, 1, userGuess);
            $("#userWord").html(userWordArray);
            console.log(userWordArray);
            gotOne = true;
        }
    }
    // If wrong, -1 for guesses remaining and add the letter to letters guessed
    if (gotOne === false) {
        guessesRemaining -= 1;
        console.log(guessesRemaining);
        lettersGuessed.push(userGuess);
        console.log(lettersGuessed);
    }
}
// }

//check to see if user has won or lost and track win/loss
function checkStatus() {
    userWord = userWordArray.join("");
    console.log(userWord);
    if (userWord === word) {
        setTimeout(function () {
            alert("You win, Liberacorpus!");
            win += 1;
            console.log("wins:" + win);
            newWord();
        }, 50);
    }
    else if (guessesRemaining === 0) {
        alert("You lose, Levicorpus! The word was " + word + ".");
        lose -= 1;
        console.log("loses:" + lose);
        newWord()
    }
}


$(document).ready(function() {
newWord();
});

//User will press a key to guess a letter
document.onkeyup = function (event) {
    // Capture the key typed and convert to upper case
    var userGuess = event.key.toUpperCase();
    checkGuessedBefore(userGuess);
    if (guessed === false) {
        checkGuess(userGuess);
        checkStatus();
    }
}



